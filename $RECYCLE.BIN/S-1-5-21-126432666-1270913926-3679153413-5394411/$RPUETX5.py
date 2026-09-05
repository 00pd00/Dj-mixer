#!/usr/bin/env python3
"""
PDF to Markdown Converter using PyPDF2
Converts PDF files to Markdown format
"""

import sys
import argparse
from pathlib import Path

try:
    import PyPDF2
except ImportError:
    print("Error: PyPDF2 not installed. Install with: pip install PyPDF2")
    sys.exit(1)


def pdf_to_markdown(pdf_path, output_path=None):
    """
    Convert a PDF file to Markdown format
    
    Args:
        pdf_path: Path to the input PDF file
        output_path: Path to the output MD file (optional)
    """
    pdf_path = Path(pdf_path)
    
    if not pdf_path.exists():
        print(f"Error: File '{pdf_path}' not found")
        return False
    
    # Default output path
    if output_path is None:
        output_path = pdf_path.with_suffix('.md')
    else:
        output_path = Path(output_path)
    
    try:
        markdown_content = []
        markdown_content.append(f"# {pdf_path.stem}\n\n")
        
        with open(pdf_path, 'rb') as pdf_file:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            total_pages = len(pdf_reader.pages)
            print(f"Processing {total_pages} pages...")
            
            for i, page in enumerate(pdf_reader.pages, 1):
                print(f"Processing page {i}/{total_pages}...", end='\r')
                
                # Extract text
                text = page.extract_text()
                if text and text.strip():
                    # Add page separator
                    if i > 1:
                        markdown_content.append(f"\n---\n\n## Page {i}\n\n")
                    
                    # Clean up text and add to markdown
                    markdown_content.append(text.strip())
                    markdown_content.append("\n\n")
        
        # Write to output file
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(''.join(markdown_content))
        
        print(f"\nSuccessfully converted '{pdf_path}' to '{output_path}'")
        print(f"Output file size: {output_path.stat().st_size} bytes")
        return True
        
    except Exception as e:
        print(f"\nError converting PDF: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    parser = argparse.ArgumentParser(
        description='Convert PDF files to Markdown format',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python pdf_to_md_pypdf.py document.pdf
  python pdf_to_md_pypdf.py input.pdf -o output.md
        """
    )
    parser.add_argument('pdf_file', help='Path to the PDF file to convert')
    parser.add_argument('-o', '--output', help='Output markdown file path (optional)')
    
    args = parser.parse_args()
    
    success = pdf_to_markdown(args.pdf_file, args.output)
    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
