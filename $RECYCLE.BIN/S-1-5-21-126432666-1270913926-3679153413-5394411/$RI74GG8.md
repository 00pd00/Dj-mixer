# Teamcenter Integration with Microsoft Office via SharePoint Embedded: Introduction

- Available in TcX version 2606 and above (Incubation feature in 2606)
- Name: Teamcenter Integration with Microsoft Office via SharePoint Embedded (TcOOSPE)
- Product ID: TCOOSPEVIEWER-XT


Overview:
Teamcenter Integration with Microsoft Office via SharePoint Embedded (TcOOSPE) enables seamless integration between Teamcenter X and Microsoft SharePoint Embedded services, providing users with the ability to view, edit, and collaborate on Microsoft Office documents (Word, Excel, PowerPoint) directly within the Teamcenter environment using Office Online capabilities. This integration leverages SharePoint Embedded's document management and collaboration features while maintaining Teamcenter's robust access control and lifecycle management.


Key Features & Benefits:

- In-Browser Document Editing:
View and edit Microsoft Office documents directly in the browser without requiring local Office installations.
- Security Compliance:
Enforces TcX access control policies based on the current logged-in user's permissions, ensuring secure document access.
- SharePoint Embedded Storage:
Utilizes Microsoft SharePoint Embedded infrastructure for scalable and reliable document storage.


## TcOOSPE Architecture

The Teamcenter Integration with Microsoft Office via SharePoint Embedded consists of the following key components:

- **TcX Server**: Manages authentication, authorization, and document metadata
- **SharePoint Embedded Container**: Provides secure document storage 
- **Teamcenter Integration with Microsoft Office via SharePoint Embedded Microservice**: Enables in-browser viewing and editing of Office documents
- **Entra**: Handles user authentication and application permissions

The integration workflow ensures that all document operations respect Teamcenter access controls while leveraging SharePoint Embedded's storage capabilities.
