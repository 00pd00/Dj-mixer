import AnsibleTrigger from "../modules/ansibletrigger.module.js";
import Environment from "../modules/environment.module.js";
import axios from "axios";
import dotenv from "dotenv";
import { buildAnsibleTowerJobJson } from "../utils/ansibleTowerJobTrigger.js";
import configs from "../data/configs.json" with { type: "json" };

dotenv.config();

/**
 * Worker function to process pending Ansible jobs
 * This runs periodically (e.g., every minute via cron)
 * It finds all pending jobs that are NOT paused and triggers them
 */
export const processAnsibleJobs = async () => {
  try {
    console.log('\n========================================');
    console.log('[ANSIBLE WORKER] Starting job processing cycle...');
    console.log('========================================\n');

    // Find all pending jobs that are NOT paused
    const pendingJobs = await AnsibleTrigger.find({
      status: 'pending',
      isPaused: { $ne: true } // Skip paused jobs
    }).populate('envId');

    console.log(`[ANSIBLE WORKER] Found ${pendingJobs.length} pending jobs to process`);

    if (pendingJobs.length === 0) {
      console.log('[ANSIBLE WORKER] No pending jobs to process');
      return;
    }

    // Process each pending job
    for (const job of pendingJobs) {
      try {
        console.log(`\n[ANSIBLE WORKER] Processing job ${job._id} for tenant ${job.tenantId}`);
        
        // Double-check if job is paused (safety check)
        if (job.isPaused) {
          console.log(`[ANSIBLE WORKER] ⏸️  Job ${job._id} is PAUSED - SKIPPING`);
          console.log(`[ANSIBLE WORKER] Paused at: ${job.pausedAt}`);
          console.log(`[ANSIBLE WORKER] Paused by: ${job.pausedBy}`);
          continue; // Skip this job
        }

        // Get environment details
        const env = await Environment.findById(job.envId);
        
        if (!env) {
          console.error(`[ANSIBLE WORKER] Environment not found for job ${job._id}`);
          job.status = 'failed';
          job.error = 'Environment not found';
          await job.save();
          continue;
        }

        console.log(`[ANSIBLE WORKER] Environment found: ${env.tenantId}`);

        // Prepare job body based on job type
        let templateId;
        let body;

        if (job.jobType === 'shutdownrestart') {
          templateId = process.env.SHUTDOWN_RESTART_TEMPLATE;
          body = {
            extra_vars: {
              tenant_id: env.tenantId,
              action: job.ansibleRequestBody?.action || 'Restart'
            }
          };
        } else {
          // Regular deploy/destroy job
          templateId = process.env.DEPLOY_TEMPLATE;
          
          const allProductIdStrings = env.productIds || [];
          const pipelineStage = job.ansibleRequestBody?.pipelineStage || 'deploy';

          body = buildAnsibleTowerJobJson({
            tenantId: env.tenantId,
            tcxVersion: env.tcxVersion,
            tcxManifestVersion: env.tcxManifestVersion,
            tcxPipelineRolesVersion: env.tcxPipelineRolesVersion,
            pipelineStage,
            environment: env.environmentType,
            productIds: allProductIdStrings,
            ansibleInputVars: env.ansibleInputVars,
            productIdsList: env.productIdsList,
            cloudProvider: env.cloudProvider,
          });
        }

        console.log(`[ANSIBLE WORKER] Triggering Ansible Tower job with template ${templateId}`);

        // Trigger Ansible Tower job
        const url = `${configs.ANSIBLE_TOWER.BASE_URL}${configs.ANSIBLE_TOWER.API_VERSION}/job_templates/${templateId}/launch/`;
        const bearerToken = process.env.ANSIBLE_TOWER_TOKEN;

        const response = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
          }
        });

        // Update job status to triggered
        job.status = 'triggered';
        job.jobId = response.data.id;
        job.triggeredAt = new Date();
        await job.save();

        console.log(`[ANSIBLE WORKER] ✓ Job ${job._id} triggered successfully`);
        console.log(`[ANSIBLE WORKER] Ansible Tower Job ID: ${response.data.id}`);

        // Update environment with job ID
        if (job.jobType === 'shutdownrestart') {
          console.log(`[ANSIBLE WORKER] Shutdown/Restart job triggered for ${env.tenantId}`);
        } else {
          const pipelineStage = job.ansibleRequestBody?.pipelineStage || 'deploy';
          if (pipelineStage === 'destroy') {
            env.destroyAnsibleTowerJobId = response.data.id;
          } else {
            if (env.ansibleTowerJobId) {
              if (!env.oldAnsibleTowerJobId) {
                env.oldAnsibleTowerJobId = [];
              }
              env.oldAnsibleTowerJobId.push(env.ansibleTowerJobId);
            }
            env.ansibleTowerJobId = response.data.id;
          }
          await env.save();
          console.log(`[ANSIBLE WORKER] Environment ${env._id} updated with job ID`);
        }

      } catch (error) {
        console.error(`[ANSIBLE WORKER] ❌ Error processing job ${job._id}:`, error.message);
        
        // Update job status to failed
        job.status = 'failed';
        job.error = error.response?.data?.detail || error.message;
        job.failedAt = new Date();
        await job.save();
      }
    }

    console.log('\n========================================');
    console.log('[ANSIBLE WORKER] Job processing cycle completed');
    console.log('========================================\n');

  } catch (error) {
    console.error('[ANSIBLE WORKER] Fatal error in job processor:', error);
  }
};

/**
 * Function to get statistics about paused jobs
 * Useful for monitoring
 */
export const getPausedJobsStats = async () => {
  try {
    const pausedJobs = await AnsibleTrigger.find({
      status: 'pending',
      isPaused: true
    }).populate('envId', 'tenantId');

    return {
      count: pausedJobs.length,
      jobs: pausedJobs.map(job => ({
        jobId: job._id.toString(),
        tenantId: job.tenantId,
        pausedAt: job.pausedAt,
        pausedBy: job.pausedBy
      }))
    };
  } catch (error) {
    console.error('[ANSIBLE STATS] Error getting paused jobs stats:', error);
    return { count: 0, jobs: [] };
  }
};