# Setup Classification AI
Classification AI can only be used in an environment which already contains Classification data, as that data is needed to run Classification AI Training. 
Included in this page are details on when & how to get Classification AI up and running.

## 1. **When** To Run Training
Because Classification AI Training can be run arbitrarily often, it should be run only on-demand from a customer. A customer might request training be run once they've met its minimum requirements, after they've created additional classification data on which to train, or after some time has passed since their last training run.

### 1.1 Minimum Requirements
Classification AI Training should only be run after an environment has been in use for some time. As a prerequisite to Training, 100 classified objects must be present in the user's environment, and multiple different classes should be in use. Classification AI Training can be re-run later when an environment contains more classified objects, thereby changing what suggestions a user will receive when classifying.

Environments with fewer than 100 Classified objects, or which use fewer than 2 classes will be unable to have Training run on that data.

## 2. **Where** to run Training?
The Classification AI Training utility is located in the AdminUtils container. Running training will require command-line access to that container.

## 3. **How** To Run Training
To run training, use the following commands in order:

- `export TC_ROOT=/apps/tc/TR`
- `export TC_DATA=/apps/tc/TD`
- `. $TC_DATA/tc_profilevars`
- `/apps/tc/TR/classification/ai/bin/runClsAiTraining.sh`

If the following Training step is logged without errors, then Training has completed successfully:

> [5/6] Uploading saved model to file repo...

## 4. Troubleshooting
After running training, the customer should immediately start seeing AI suggestions when Classifying objects, given they've set the `CLS_AI_Enable_AI_Engine` preference is set to true in that customer's environemnt. If this is not the case, the following steps can be used for troubleshooting.

### 4.1 Check Training output
Training will log any encountered errors to the command line. If an error is encountered, details may be present there.

### 4.2 Customer's Teamcenter Preferences
If the user has set the `CLS_is_presentation_hierarchy_active` preference to false, then only "Basic Classification" data will be used for training. Otherwise, only "Presentation Layer" / "Advanced Classification" data will be used for training, e.g. "Nodes". Users will typically have this preference set to the same value for all users.

Should different users in the same environments have a different value for this preference, Training can be run by inputting the username/password/group of the user whose preference settings & access control visibility will be used. Such a user should be an administrator.

usage: `runClsAiTraining.sh -u=username -p=password -g=group`

### 4.3 Validate Serving is Running And Accessible
From a command line interface which can see the Classification AI Serving container, such as the admin utils container, run the following command:

`curl http://service-dispatcher:9090/cais/`

This should return `Connected to Classification AI Serving.`, validating that Classification AI Serving is running and accessible.
