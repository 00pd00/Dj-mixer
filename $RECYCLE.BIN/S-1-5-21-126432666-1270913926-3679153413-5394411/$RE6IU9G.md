# Introduction

> ℹ️ Supported in TcX version 2506.0002 and above

Teamcenter AI Chat (and Visual Part Search) Product ID    - TC030406-XT

Dispatcher Client Product ID     - TC7030-XT

## Teamcenter AI Chat

When working in a product lifecycle environment, users frequently need to quickly access safety, compliance, regulation, or other specific information. You can ask questions to Teamcenter Artificial Intelligence (AI) Chat and receive summarized answers with source materials immediately. Teamcenter AI Chat searches the indexed and embedded file contents to provide the required information.

You must configure Teamcenter AI Chat by creating saved advanced search queries that function as knowledge sources, adding the knowledge sources to the preference, and embedding the file contents with TcFTSIndexer.

Your users can search the knowledge sources to find specific, summarized answers and access the relevant source material.

## Visual Part Search (TcX Azure only)

TcX Part Search allows your users to search using an image. Results for similar parts are retrieved based on indexed and embedded UGMASTER datasets, which are CAD model datasets created by the Teamcenter-NXintegration. As an administrator, you can configure part search for your users.

## TcX Azure Architecture

![TcX Azure Architecture Diagram](Architecture_TC_AI_Azure.png)

### Onboarding Overview

The diagram below provides a high level overview of the manual and automated steps that are required to onboard new cells and tenants on TcX Azure with the AI Chat and Visual Part Search capabilities. Each step is described in detail in each of the subsections of the Teamcenter AI Chat folder in this cookbook:

1. Prerequisites
2. Cell Onboarding
3. Tenant Onboarding + Tenant Pipeline

![TcX AI Azure Onboarding Overview](Onboarding_Overview_TC_AI_Azure.png)

After completing the onboarding steps, the capability can be tested to ensure everything works as expected, using the following instructions:

4. Tenant Post-Deployment Steps

## TcX AWS Architecture

> ℹ️ OpenSearch Serverless does not support the replication of indexed data for 'replica' or 'clone' use cases. When a new OpenSearch Serverless collection is set up via a clone or replica operation, it will not inherit any indexed data from the original collection.

![TcX AWS Architecture Diagram](Architecture_TC_AI_AWS.png)