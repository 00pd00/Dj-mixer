# TcX Resource Management (MRL)  

**Product ID:** TCM055011-XT  

---

## Test Case 1: Check Item Types  

Ensure the required business objects and item types are in the database.  
1. Login to the TcX environment through AW.  
2. Select workspace **Author**.  
3. Launch **Explorer** tool in **Home**  
4. Click **Add** in the upper left corner:  
   ![Screenshot](ItemTypes1NEW.png)  
5. Check that in the **Type** Pull-Down the following Item Types are available:  
- Additive Printer  
- CMM Probe Assembly  
- NC Machine  
- NC Tool  
6. Select Type **NC Tool**:  
   ![Screenshot](ItemTypes2.png)  
7. Create **NC Tool** Item:  
   ![Screenshot](ItemTypes3.png)  

---

## Test Case 2: Check Manufacturing Workspace & MRL Dashboard  

1. Create a User in the **Manufacturing.MyOrg** Group  
2. Start Teamcenter X Active Workspace  
3. Login with this new User  
4. Group should be **Manufacturing.MyOrg**  
5. If not, change Group to **Manufacturing.MyOrg**:  
   ![Screenshot](Workspace1NEW.png)  
6. The **Manufacturing** Workspace should be displayed:  
   ![Screenshot](Workspace2NEW.png)  
7. Launch **Manufacturing Resource Library** tool with navigation bar  
8. The following UI should be displayed:  
   ![Screenshot](Workspace4NEW.png)  

---

## Test Case 3: Check Resource View Mode  

1. Create a **NC Tool** ttem with name **Milling Tool**:  
2. Open the newly created **NC Tool** item with name **Milling Tool**  
3. Switch view mode to **Resource**:  
   ![Screenshot](ViewMode3NEW.png)  
4. The system displays the **Resource** view mode with the NC Tool item **Milling Tool** surrounded by a box:  
   ![Screenshot](ViewMode4NEW.png)  

---

## Test Case 4: Check Classification Hierarchy  

1. Launch **Classification** tool with navigation bar  
2. The system shows the Classification **Class Navigator**
3. Expand the tree hierarchy, to verify that the **Manufacturing Resource Library** Classes are there:  
   ![Screenshot](MRL3NEW.png)  
4. Check that the System shows the nice, colorful Icons for the **Manufacturing Resource Library** Classes.  
5. Switch **Class Navigator** from **Tree** to **Images**  
6. Doubleclick **Manufacturing Resource Library**
7. Check that the version **2512** is displayed in the class icons.  
   ![Screenshot](MRL4NEW.png)  
