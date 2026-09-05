# Teamcenter Office Online: Introduction

- Available in TcX version 2506.0003
- Name: Teamcenter Office Online (TcOOWeb)
- Product ID: TCOOVIEWER-XT


Overview:
Teamcenter Office Online (TcOOWeb) enables seamless integration between Teamcenter X and Microsoft Office Online Server services, providing users with the ability to view, edit, and collaborate on Microsoft Office documents (Word, Excel, PowerPoint) directly within the Teamcenter environment using Microsoft Office Online Service capabilities. This integration leverages Microsoft Office Online Server document editing and collaboration features while maintaining Teamcenter's robust access control and lifecycle management.


Key Features & Benefits:

- In-Browser Document Editing:
View and edit Microsoft Office documents directly in the browser without requiring local Office installations.
- Security Compliance:
Enforces TcX access control policies based on the current logged-in user's permissions, ensuring secure document access.


## TcOOWeb Architecture

The Teamcenter Office Online consists of the following key components:

- **TcX Server**: Manages authentication, authorization, and document metadata
- **Microsoft Office Online Server**: Provides browser based access to Microsoft Office documents (Word, Excel, PowerPoint) 
- **Teamcenter Office Online Microservice**: Enables in-browser, embedded viewing and editing of Microsoft Office documents in Active Workspace

The integration workflow ensures that all document operations respect Teamcenter access controls while leveraging Microsoft Office Online Server's editing capabilities.
