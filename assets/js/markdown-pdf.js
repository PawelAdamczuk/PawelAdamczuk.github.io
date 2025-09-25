document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generatePdf');
    const leftMarkdown = document.getElementById('leftMarkdown');
    const rightMarkdown = document.getElementById('rightMarkdown');
    const pdfPreview = document.getElementById('pdfPreview');
    const leftContent = document.getElementById('leftContent');
    const rightContent = document.getElementById('rightContent');

    // Configure marked options
    marked.setOptions({
        breaks: true,
        gfm: true
    });

    // Function to find optimal font size for content to fit
    function findOptimalFontSize(container, content, maxFontSize = 16, minFontSize = 8) {
        let fontSize = maxFontSize;
        container.innerHTML = content;

        while (fontSize >= minFontSize) {
            container.style.fontSize = fontSize + 'px';
            container.style.lineHeight = (fontSize * 1.2) + 'px';

            if (container.scrollHeight <= container.clientHeight) {
                return fontSize;
            }
            fontSize -= 0.5;
        }

        return minFontSize;
    }

    // Function to apply consistent styling to rendered content
    function applyContentStyling(element) {
        // Style headings
        const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            heading.style.marginTop = '1em';
            heading.style.marginBottom = '0.5em';
            heading.style.fontWeight = 'bold';
        });

        // Style lists
        const lists = element.querySelectorAll('ul, ol');
        lists.forEach(list => {
            list.style.paddingLeft = '1.5em';
            list.style.marginBottom = '1em';
        });

        // Style paragraphs
        const paragraphs = element.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.marginBottom = '0.8em';
        });

        // Style blockquotes
        const blockquotes = element.querySelectorAll('blockquote');
        blockquotes.forEach(bq => {
            bq.style.borderLeft = '4px solid #ccc';
            bq.style.paddingLeft = '1em';
            bq.style.marginLeft = '0';
            bq.style.fontStyle = 'italic';
            bq.style.color = '#666';
        });

        // Style code blocks
        const codeBlocks = element.querySelectorAll('pre');
        codeBlocks.forEach(pre => {
            pre.style.backgroundColor = '#f4f4f4';
            pre.style.padding = '0.5em';
            pre.style.borderRadius = '4px';
            pre.style.overflow = 'auto';
            pre.style.fontSize = '0.9em';
        });

        // Style inline code
        const inlineCodes = element.querySelectorAll('code:not(pre code)');
        inlineCodes.forEach(code => {
            code.style.backgroundColor = '#f4f4f4';
            code.style.padding = '0.2em 0.4em';
            code.style.borderRadius = '3px';
            code.style.fontSize = '0.9em';
        });

        // Style tables
        const tables = element.querySelectorAll('table');
        tables.forEach(table => {
            table.style.borderCollapse = 'collapse';
            table.style.width = '100%';
            table.style.marginBottom = '1em';

            const cells = table.querySelectorAll('th, td');
            cells.forEach(cell => {
                cell.style.border = '1px solid #ddd';
                cell.style.padding = '0.3em 0.5em';
            });

            const headers = table.querySelectorAll('th');
            headers.forEach(th => {
                th.style.backgroundColor = '#f9f9f9';
                th.style.fontWeight = 'bold';
            });
        });

        // Style links
        const links = element.querySelectorAll('a');
        links.forEach(link => {
            link.style.color = '#0066cc';
            link.style.textDecoration = 'underline';
        });
    }

    generateBtn.addEventListener('click', async function () {
        try {
            generateBtn.disabled = true;
            generateBtn.textContent = 'Generating PDF...';

            // Get markdown content
            const leftMd = leftMarkdown.value.trim();
            const rightMd = rightMarkdown.value.trim();

            // Convert markdown to HTML
            const leftHtml = marked.parse(leftMd);
            const rightHtml = marked.parse(rightMd);

            // Render content to hidden containers
            leftContent.innerHTML = leftHtml;
            rightContent.innerHTML = rightHtml;

            // Apply consistent styling
            applyContentStyling(leftContent);
            applyContentStyling(rightContent);

            // Show preview temporarily to measure content
            pdfPreview.style.display = 'block';
            pdfPreview.style.position = 'absolute';
            pdfPreview.style.left = '-9999px';
            pdfPreview.style.top = '0';

            // Find optimal font sizes for both sides
            const leftFontSize = findOptimalFontSize(leftContent, leftContent.innerHTML);
            const rightFontSize = findOptimalFontSize(rightContent, rightContent.innerHTML);

            // Use the smaller font size for both sides to maintain consistency
            const fontSize = Math.min(leftFontSize, rightFontSize);

            leftContent.style.fontSize = fontSize + 'px';
            leftContent.style.lineHeight = (fontSize * 1.2) + 'px';
            rightContent.style.fontSize = fontSize + 'px';
            rightContent.style.lineHeight = (fontSize * 1.2) + 'px';

            // Reset position for canvas capture
            pdfPreview.style.position = 'static';
            pdfPreview.style.left = 'auto';

            // Generate PDF using html2canvas and jsPDF
            const canvas = await html2canvas(pdfPreview, {
                width: 1123, // A4 landscape width in pixels (297mm at 96 DPI)
                height: 794,  // A4 landscape height in pixels (210mm at 96 DPI)
                scale: 2,     // Higher scale for better quality
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            // Create PDF in landscape orientation
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            // Calculate dimensions to fit the canvas in the PDF
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            // Scale to fit
            const scale = Math.min(pdfWidth / (canvasWidth / 96 * 25.4), pdfHeight / (canvasHeight / 96 * 25.4));
            const finalWidth = (canvasWidth / 96 * 25.4) * scale;
            const finalHeight = (canvasHeight / 96 * 25.4) * scale;

            // Center the content
            const x = (pdfWidth - finalWidth) / 2;
            const y = (pdfHeight - finalHeight) / 2;

            // Add image to PDF
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);

            // Save PDF
            pdf.save('markdown-document.pdf');

            // Hide preview
            pdfPreview.style.display = 'none';

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please check the console for details.');
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate PDF';
            pdfPreview.style.display = 'none';
        }
    });
});