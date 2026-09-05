import { gitlabWebhookHandler } from "../controller/gitLabWebhook.controllers.js";
import { connectDB } from "../db/db.js";
import mongoose from "mongoose";
import Environment from "../modules/environment.module.js";
import axios from "axios";
import configs from "../data/configs.json" with { type: "json" };
import dotenv from "dotenv";
dotenv.config();

// Your actual webhook payload
const testPayload1 = {
  "object_kind": "issue",
  "event_type": "issue",
  "user": {
    "id": 3652,
    "name": "Kadam (EXT), Parshuram",
    "username": "hw8ven",
    "avatar_url": "https://gitlab.industrysoftware.automation.siemens.com/uploads/-/system/user/avatar/3652/avatar.png",
    "email": "[REDACTED]"
  },
  "project": {
    "id": 49317,
    "name": "TCX Onboarding Portal",
    "description": null,
    "web_url": "https://gitlab.industrysoftware.automation.siemens.com/tcx-internships/tcx-onboarding-portal",
    "avatar_url": null,
    "git_ssh_url": "git@gitlab.industrysoftware.automation.siemens.com:tcx-internships/tcx-onboarding-portal.git",
    "git_http_url": "https://gitlab.industrysoftware.automation.siemens.com/tcx-internships/tcx-onboarding-portal.git",
    "namespace": "tcx-internships",
    "visibility_level": 0,
    "path_with_namespace": "tcx-internships/tcx-onboarding-portal",
    "default_branch": "main",
    "ci_config_path": "",
    "homepage": "https://gitlab.industrysoftware.automation.siemens.com/tcx-internships/tcx-onboarding-portal",
    "url": "git@gitlab.industrysoftware.automation.siemens.com:tcx-internships/tcx-onboarding-portal.git",
    "ssh_url": "git@gitlab.industrysoftware.automation.siemens.com:tcx-internships/tcx-onboarding-portal.git",
    "http_url": "https://gitlab.industrysoftware.automation.siemens.com/tcx-internships/tcx-onboarding-portal.git"
  },
  "object_attributes": {
    "author_id": 35665,
    "closed_at": null,
    "confidential": false,
    "created_at": "2025-08-26 06:49:04 UTC",
    "description": "### Environment Information\n- **Tenant ID:** 7qvcg4hd\n- **Environment Type:** prd\n- **Requested By:** shruti.rajawat.ext@siemens.com\n\n### Selected Products\n\n#### Product 1: TC030302-XT",
    "discussion_locked": null,
    "due_date": null,
    "id": 76535,
    "iid": 357,
    "last_edited_at": null,
    "last_edited_by_id": null,
    "milestone_id": null,
    "moved_to_id": null,
    "duplicated_to_id": null,
    "project_id": 49317,
    "relative_position": 268812,
    "state_id": 1,
    "time_estimate": 0,
    "title": "Environment requested for Program Planning",
    "updated_at": "2025-08-26 06:50:36 UTC",
    "updated_by_id": 3652,
    "weight": null,
    "health_status": null,
    "type": "Issue",
    "url": "https://gitlab.industrysoftware.automation.siemens.com/tcx-internships/tcx-onboarding-portal/-/issues/645",
    "total_time_spent": 0,
    "time_change": 0,
    "human_total_time_spent": null,
    "human_time_change": null,
    "human_time_estimate": null,
    "assignee_ids": [
      3652
    ],
    "assignee_id": 3652,
    "labels": [
      {
        "id": 12012,
        "title": "environment::approved",
        "color": "#6699cc",
        "project_id": 49317,
        "created_at": "2025-06-04 14:09:41 UTC",
        "updated_at": "2025-06-04 14:11:11 UTC",
        "template": false,
        "description": "",
        "type": "ProjectLabel",
        "group_id": null
      }
    ],
    "state": "opened",
    "severity": "unknown",
    "customer_relations_contacts": [],
    "action": "update"
  },
  "labels": [
    {
      "id": 12012,
      "title": "environment::approved",
      "color": "#6699cc",
      "project_id": 49317,
      "created_at": "2025-06-04 14:09:41 UTC",
      "updated_at": "2025-06-04 14:11:11 UTC",
      "template": false,
      "description": "",
      "type": "ProjectLabel",
      "group_id": null
    }
  ],
  "changes": {
    "updated_at": {
      "previous": "2025-08-26 06:49:04 UTC",
      "current": "2025-08-26 06:50:36 UTC"
    },
    "updated_by_id": {
      "previous": null,
      "current": 3652
    },
    "labels": {
      "previous": [
        {
          "id": 12011,
          "title": "environment::requested",
          "color": "#808080",
          "project_id": 49317,
          "created_at": "2025-06-04 14:09:16 UTC",
          "updated_at": "2025-06-04 14:11:57 UTC",
          "template": false,
          "description": "",
          "type": "ProjectLabel",
          "group_id": null
        }
      ],
      "current": [
        {
          "id": 12012,
          "title": "environment::approved",
          "color": "#6699cc",
          "project_id": 49317,
          "created_at": "2025-06-04 14:09:41 UTC",
          "updated_at": "2025-06-04 14:11:11 UTC",
          "template": false,
          "description": "",
          "type": "ProjectLabel",
          "group_id": null
        }
      ]
    }
  },
  "repository": {
    "name": "TCX Onboarding Portal",
    "url": "git@gitlab.industrysoftware.automation.siemens.com:tcx-internships/tcx-onboarding-portal.git",
    "description": null,
    "homepage": "https://gitlab.industrysoftware.automation.siemens.com/tcx-internships/tcx-onboarding-portal"
  },
  "assignees": [
    {
      "id": 3652,
      "name": "Kadam (EXT), Parshuram",
      "username": "hw8ven",
      "avatar_url": "https://gitlab.industrysoftware.automation.siemens.com/uploads/-/system/user/avatar/3652/avatar.png",
      "email": "[REDACTED]"
    }
  ]
 
};
// Your actual webhook payload
const testPayload2 = {
  "object_kind": "issue",
  "event_type": "issue",
  "user": {
    "id": 3652,
    "name": "Kadam (EXT), Parshuram",
    "username": "hw8ven",
    "avatar_url": "https://gitlab.industrysoftware.automation.siemens.com/uploads/-/system/user/avatar/3652/avatar.png",
    "email": "[REDACTED]"
  },
  "project": {
    "id": 49317,
    "name": "TCX Onboarding Portal",
    "description": null,
    "web_url": "https://gitlab.industrysoftware.automation.siemens.com/tcx-internships/tcx-onboarding-portal",
    "avatar_url": null,
    "git_ssh_url": "git@gitlab.industrysoftware.automation.siemens.com:tcx-internships/tcx-onboarding-portal.git",
    "git_http_url": "https://gitlab.industrysoftware.automation.siemens.com/tcx-internships/tcx-onboarding-portal.git",
    "namespace": "tcx-internships",
    "visibility_level": 0,
    "path_with_namespace": "tcx-internships/tcx-onboarding-portal",
    "default_branch": "main",
    "ci_config_path": "",
    "homepage": "https://gitlab.industrysoftware.automation.siemens.com/tcx-internships/tcx-onboarding-portal",
    "url": "git@gitlab.industrysoftware.automation.siemens.com:tcx-internships/tcx-onboarding-portal.git",
    "ssh_url": "git@gitlab.industrysoftware.automation.siemens.com:tcx-internships/tcx-onboarding-portal.git",
    "http_url": "https://gitlab.industrysoftware.automation.siemens.com/tcx-internships/tcx-onboarding-portal.git"
  },
  "object_attributes": {
    "author_id": 35665,
    "closed_at": null,
    "confidential": false,
    "created_at": "2025-08-26 06:49:04 UTC",
    "description": "### Environment Information\n- **Tenant ID:** 7qvcg4hd\n- **Environment Type:** prd\n- **Requested By:** shruti.rajawat.ext@siemens.com\n\n### Selected Products\n\n#### Product 1: TC030302-XT",
    "discussion_locked": null,
    "due_date": null,
    "id": 76535,
    "iid": 352,
    "last_edited_at": null,
    "last_edited_by_id": null,
    "milestone_id": null,
    "moved_to_id": null,
    "duplicated_to_id": null,
    "project_id": 49317,
    "relative_position": 268812,
    "state_id": 1,
    "time_estimate": 0,
    "title": "Environment requested for Program Planning",
    "updated_at": "2025-08-26 06:50:36 UTC",
    "updated_by_id": 3652,
    "weight": null,
    "health_status": null,
    "type": "Issue",
    "url": "https://gitlab.industrysoftware.automation.siemens.com/tcx-internships/tcx-onboarding-portal/-/issues/645",
    "total_time_spent": 0,
    "time_change": 0,
    "human_total_time_spent": null,
    "human_time_change": null,
    "human_time_estimate": null,
    "assignee_ids": [
      3652
    ],
    "assignee_id": 3652,
    "labels": [
      {
        "id": 12012,
        "title": "environment::approved",
        "color": "#6699cc",
        "project_id": 49317,
        "created_at": "2025-06-04 14:09:41 UTC",
        "updated_at": "2025-06-04 14:11:11 UTC",
        "template": false,
        "description": "",
        "type": "ProjectLabel",
        "group_id": null
      }
    ],
    "state": "opened",
    "severity": "unknown",
    "customer_relations_contacts": [],
    "action": "update"
  },
  "labels": [
    {
      "id": 12012,
      "title": "environment::approved",
      "color": "#6699cc",
      "project_id": 49317,
      "created_at": "2025-06-04 14:09:41 UTC",
      "updated_at": "2025-06-04 14:11:11 UTC",
      "template": false,
      "description": "",
      "type": "ProjectLabel",
      "group_id": null
    }
  ],
  "changes": {
    "updated_at": {
      "previous": "2025-08-26 06:49:04 UTC",
      "current": "2025-08-26 06:50:36 UTC"
    },
    "updated_by_id": {
      "previous": null,
      "current": 3652
    },
    "labels": {
      "previous": [
        {
          "id": 12011,
          "title": "environment::requested",
          "color": "#808080",
          "project_id": 49317,
          "created_at": "2025-06-04 14:09:16 UTC",
          "updated_at": "2025-06-04 14:11:57 UTC",
          "template": false,
          "description": "",
          "type": "ProjectLabel",
          "group_id": null
        }
      ],
      "current": [
        {
          "id": 12012,
          "title": "environment::approved",
          "color": "#6699cc",
          "project_id": 49317,
          "created_at": "2025-06-04 14:09:41 UTC",
          "updated_at": "2025-06-04 14:11:11 UTC",
          "template": false,
          "description": "",
          "type": "ProjectLabel",
          "group_id": null
        }
      ]
    }
  },
  "repository": {
    "name": "TCX Onboarding Portal",
    "url": "git@gitlab.industrysoftware.automation.siemens.com:tcx-internships/tcx-onboarding-portal.git",
    "description": null,
    "homepage": "https://gitlab.industrysoftware.automation.siemens.com/tcx-internships/tcx-onboarding-portal"
  },
  "assignees": [
    {
      "id": 3652,
      "name": "Kadam (EXT), Parshuram",
      "username": "hw8ven",
      "avatar_url": "https://gitlab.industrysoftware.automation.siemens.com/uploads/-/system/user/avatar/3652/avatar.png",
      "email": "[REDACTED]"
    }
  ]
};
dotenv.config();

await mongoose.connect("mongodb://localhost:27017/TCX_OnboardingPortal")
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err.message));

// Helper to mock Express req/res
function mockExpress(payload) {
  return {
    req: { body: payload },
    res: {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        console.log(`Response [${this.statusCode || 200}]:`, data);
      }
    }
  };
}

async function run() {
  // Call handler for each payload
  for (const payload of [testPayload1, testPayload2]) {
    const { req, res } = mockExpress(payload);
    await gitlabWebhookHandler(req, res);
  }
  console.log("✅ All test payloads processed by gitlabWebhookHandler.");
  process.exit(0);
}

run();
