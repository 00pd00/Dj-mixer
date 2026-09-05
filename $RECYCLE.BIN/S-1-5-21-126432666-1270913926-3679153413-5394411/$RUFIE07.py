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
    team = ['Prathamesh', 'Bobby', 'Riddhi', 'Rudradev', 'Mayur', 'Parshuram', 'Soham']
    
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
    
    # Assign team members in equal consecutive chunks
    total_files = len(df)
    base_chunk = total_files // len(team)
    remainder = total_files % len(team)
    
    df['Assigned To'] = ''
    current_index = 0
    
    for i, person in enumerate(team):
        # First 'remainder' people get one extra file
        chunk_size = base_chunk + (1 if i < remainder else 0)
        for j in range(chunk_size):
            if current_index < total_files:
                df.at[current_index, 'Assigned To'] = person
                current_index += 1
    
    # Create Excel file
    df.to_excel('cookbook_sections_detailed.xlsx', index=False, sheet_name='Cookbook Files')
    
    print(f"✓ Excel created: cookbook_sections_detailed.xlsx")
    print(f"  - Total markdown files: {len(df)}")
    print(f"\nAllocation per person:")
    for person in team:
        count = len(df[df['Assigned To'] == person])
        print(f"  - {person}: {count} files")

if __name__ == '__main__':
    create_cookbook_inventory()
