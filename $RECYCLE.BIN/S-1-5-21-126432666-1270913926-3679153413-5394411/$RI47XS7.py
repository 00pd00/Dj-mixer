import os
import pandas as pd

def get_document_title(file_path):
    """Extract title from markdown file (first heading or filename)"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith('# '):
                    return line[2:].strip()
                elif line.startswith('## '):
                    return line[3:].strip()
        # If no heading found, return filename without extension
        return os.path.splitext(os.path.basename(file_path))[0]
    except:
        return os.path.splitext(os.path.basename(file_path))[0]

def create_cookbook_inventory():
    files = []
    base = './docs'
    
    # Team members
    team = ['Prathamesh', 'Bobby', 'Riddhi', 'Rudradev', 'Mayur', 'Parshuram']
    
    # Walk through all files in docs directory
    for root, dirs, filenames in os.walk(base):
        for filename in filenames:
            # Only include .md files, exclude index.md
            if not filename.endswith('.md') or filename.lower() == 'index.md':
                continue
                
            full_path = os.path.join(root, filename)
            relative_path = full_path.replace(base, '').lstrip('/\\').replace('\\', '/')
            
            # Get document title
            title = get_document_title(full_path)
            
            files.append({
                'Title': title,
                'Name': filename,
                'Path': relative_path
            })
    
    # Create DataFrame
    df = pd.DataFrame(files)
    
    # Sort by path
    df = df.sort_values('Path').reset_index(drop=True)
    
    # Assign team members in chunks (first 100 to person 1, next 100 to person 2, etc.)
    chunk_size = 100
    df['Assigned To'] = ''
    for i in range(len(df)):
        person_index = min(i // chunk_size, len(team) - 1)
        df.at[i, 'Assigned To'] = team[person_index]
    
    # Create Excel file
    df.to_excel('cookbook_sections_detailed.xlsx', index=False, sheet_name='Cookbook Files')
    
    print(f"✓ Excel created: cookbook_sections_detailed.xlsx")
    print(f"  - Total markdown files: {len(df)}")
    print(f"\nAllocation per person (in chunks of {chunk_size}):")
    for person in team:
        count = len(df[df['Assigned To'] == person])
        print(f"  - {person}: {count} files")

if __name__ == '__main__':
    create_cookbook_inventory()
