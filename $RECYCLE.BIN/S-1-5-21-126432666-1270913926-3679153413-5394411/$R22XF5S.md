# Offboarding a TCX Customer (Do Not Use)

This guide provides easy-to-follow instructions for offboarding a TCX customer by exporting assemblies and structures using the Briefcase Utility. You can choose between a command-line method or a graphical interface, depending on your access and preferences.

---

## Overview

- **Primary Tool:** Briefcase Utility
- **Goal:** Export relevant assemblies and structures from TCX for customer offboarding
- **Methods Supported:** Command-Line Utility or AW Client Interface

---

## Method 1: Using the Command-Line Utility

If you have the necessary  details (such as assembly or structure identifiers) from the customer, you can extract data using the command-line utility.

### Understanding Data Export Requirements

**Customer Responsibility:**
Customers have the responsibility of identifying and communicating which data needs to be exported. This information is critical for preparing the input file.

**Types of Data to Export:**
- **Structured Data:** Teamcenter Bill of Materials (BOM) and assembly structures
- **Unstructured Data:** Individual Items and standalone objects

**Export Format:**
All exported data will be in **Teamcenter Briefcase format** (`.bcz` files).

### Steps

1. **Gather Details**
   - Receive a list of assemblies or structures to export from the customer.

2. **Prepare the Input File**
   - Create an `input.txt` file listing the assembly or structure identifiers (UIDs or item IDs) provided by the customer.
   - Each line should contain one identifier for the data object to be exported.
   - Sample input file format:
     
     ```
     item_id=Car
     item_id=Engine
     ```

3. **Run the Export Command**
   - Use the following syntax in your corp server:
     - First, switch to the `tcx_user` account and set context.  
     
     ```bash
     sudo su - tcx_user
     . tcc set_context <tenant-id> <env-type>
     ```
     
   - After setting context, you will be in the `/administration/admin_work` directory.
   - Create the `input.txt` file in this directory and paste the content (assembly/structure identifiers) from the earlier prepared input file.
     
     ```bash
     vi input.txt
     ```
   
   - Now run the export command:
     
     ```bash
     tcxml_export -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -inputfile=input.txt -bulk_extract -file=/administration/admin_work/output.bcz
     ```
     
     - `input.txt`: File listing the assembly or structure identifiers to be exported.
     - `output.bcz`: The Briefcase file generated with the extracted data.

---

## Method 2: Using the AW Client

The AW Client allows you to export Briefcase files through its user-friendly graphical interface. Ensure all required components are installed and configured before proceeding.

### Prerequisites

- **Dispatcher**: Must be installed (enables bulk extract feature).
- **TCX Tier**: Ensure it is set up properly to work with the Async Translator.
- **Applications**: Install `tie0aw` (server) and `tie` applications to enable bulk extract capabilities.

### Steps to Install Briefcase Applications

1. **Select Applications**
   - Navigate to "Available Applications."
   - Choose `Briefcase Export and Import` and `Dispatcher`.
     
     ![alt text](image.png)

     ![alt text](image-1.png)

2. **Validate Selections**
   - Ensure “Briefcase Export and Import” automatically selects “Active Workspace Base” as shown in the interface.
     
     ![alt text](image-2.png)

### Steps to Export Briefcase (Bulk Extract)

   ![alt text](image-3.png)

   ![alt text](image-4.png)

## Support and Assistance

>  **Note:** For any technical assistance or questions regarding the offboarding process, CApS can reach out to **Platform Services** (Contact: **Selvam Swaminathan**, Email: selvam.swaminathan@siemens.com) for further support and guidance.
