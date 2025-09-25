---
layout: single
classes: wide
author_profile: true
permalink: /markdown-pdf/
---

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
    crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>

<div class="container-fluid mt-5">
    <h1>Markdown to PDF Converter</h1>
    <p class="text-muted mb-4">Enter markdown content in both fields. The tool will generate a horizontal A4 PDF with both sections side-by-side.</p>

    <div class="row mb-4">
        <div class="col-md-6">
            <label for="leftMarkdown" class="form-label">Left Side Markdown</label>
            <textarea class="form-control" id="leftMarkdown" rows="20" placeholder="Enter markdown content for the left side...">
# Left Side Example

This is **bold text** and this is *italic text*.

## Features
- Bullet point 1
- Bullet point 2
- Bullet point 3

### Code Example
```javascript
console.log("Hello World!");
```

> This is a blockquote example.

[Link example](https://example.com)
            </textarea>
        </div>
        <div class="col-md-6">
            <label for="rightMarkdown" class="form-label">Right Side Markdown</label>
            <textarea class="form-control" id="rightMarkdown" rows="20" placeholder="Enter markdown content for the right side...">
# Right Side Example

This content will appear on the **right side** of the PDF.

## Another Section
1. Numbered list item 1
2. Numbered list item 2
3. Numbered list item 3

### Tables Work Too
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
| Data 3   | Data 4   |

---

*This is the end of the right side content.*
            </textarea>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-12 text-center">
            <button type="button" class="btn btn-secondary me-3" id="showPreview">
                Show Preview
            </button>
            <button type="button" class="btn btn-primary btn-lg" id="generatePdf">
                Generate PDF
            </button>
        </div>
    </div>

    <!-- Visible preview container -->
    <div id="visiblePreview" class="row mb-4" style="display: none;">
        <div class="col-12">
            <h3>Preview</h3>
            <div class="border p-3" style="background-color: white; min-height: 400px;">
                <div style="display: flex; gap: 20px; height: 100%;">
                    <div id="leftPreview" style="flex: 1; border-right: 1px solid #ddd; padding-right: 10px;"></div>
                    <div id="rightPreview" style="flex: 1; padding-left: 10px;"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Hidden preview container for PDF generation -->
    <div id="pdfPreview" style="display: none; width: 297mm; height: 210mm; padding: 10mm; font-family: Arial, sans-serif;">
        <div style="display: flex; height: 100%; gap: 10mm;">
            <div id="leftContent" style="flex: 1; overflow: hidden;"></div>
            <div id="rightContent" style="flex: 1; overflow: hidden;"></div>
        </div>
    </div>
</div>

<script src="{{ '/assets/js/markdown-pdf.js' | relative_url }}"></script>