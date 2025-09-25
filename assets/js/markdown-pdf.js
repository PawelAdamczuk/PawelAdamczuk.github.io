console.log('DEBUG: markdown-pdf.js script loaded');

document.addEventListener('DOMContentLoaded', function () {
    console.log('DEBUG: DOMContentLoaded fired');
    const generateBtn = document.getElementById('generatePdf');
    const showPreviewBtn = document.getElementById('showPreview');
    const leftMarkdown = document.getElementById('leftMarkdown');
    const rightMarkdown = document.getElementById('rightMarkdown');
    const pdfPreview = document.getElementById('pdfPreview');
    const leftContent = document.getElementById('leftContent');
    const rightContent = document.getElementById('rightContent');
    const visiblePreview = document.getElementById('visiblePreview');
    const leftPreview = document.getElementById('leftPreview');
    const rightPreview = document.getElementById('rightPreview');

    console.log('DEBUG: DOM elements found:', {
        generateBtn: !!generateBtn,
        showPreviewBtn: !!showPreviewBtn,
        leftMarkdown: !!leftMarkdown,
        rightMarkdown: !!rightMarkdown,
        pdfPreview: !!pdfPreview,
        leftContent: !!leftContent,
        rightContent: !!rightContent,
        visiblePreview: !!visiblePreview,
        leftPreview: !!leftPreview,
        rightPreview: !!rightPreview
    });

    // Check if marked is available
    console.log('DEBUG: marked library available:', typeof marked !== 'undefined');

    // Configure marked options
    if (typeof marked !== 'undefined') {
        try {
            marked.setOptions({
                breaks: true,
                gfm: true
            });
            console.log('DEBUG: marked options set successfully');
        } catch (error) {
            console.error('DEBUG: Error setting marked options:', error);
        }
    } else {
        console.error('DEBUG: marked library not available');
    }

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

    // Function to render markdown content
    function renderMarkdownContent(leftMd, rightMd, leftTarget, rightTarget) {
        console.log('DEBUG: Input markdown lengths:', {
            leftMd: leftMd.length,
            rightMd: rightMd.length
        });

        // Convert markdown to HTML
        const leftHtml = marked.parse(leftMd);
        const rightHtml = marked.parse(rightMd);

        console.log('DEBUG: Converted HTML lengths:', {
            leftHtml: leftHtml.length,
            rightHtml: rightHtml.length
        });
        console.log('DEBUG: Left HTML preview:', leftHtml.substring(0, 200));
        console.log('DEBUG: Right HTML preview:', rightHtml.substring(0, 200));

        // Render content to containers
        leftTarget.innerHTML = leftHtml;
        rightTarget.innerHTML = rightHtml;

        console.log('DEBUG: Content rendered to targets:', {
            leftTargetContent: leftTarget.innerHTML.length,
            rightTargetContent: rightTarget.innerHTML.length
        });

        // Apply consistent styling
        applyContentStyling(leftTarget);
        applyContentStyling(rightTarget);

        console.log('DEBUG: Styling applied');
    }

    // Show preview button handler
    if (showPreviewBtn) {
        showPreviewBtn.addEventListener('click', function () {
            console.log('DEBUG: Show preview button clicked');


            const leftMd = leftMarkdown.value.trim();
            const rightMd = rightMarkdown.value.trim();

            console.log('DEBUG: Retrieved values:', { leftMd, rightMd });

            renderMarkdownContent(leftMd, rightMd, leftPreview, rightPreview);
            visiblePreview.style.display = 'block';

            console.log('DEBUG: Preview should now be visible');
        });
    } else {
        console.error('DEBUG: Show preview button not found!');
    }

    generateBtn.addEventListener('click', async function () {
        try {
            console.log('DEBUG: Generate PDF button clicked');
            generateBtn.disabled = true;
            generateBtn.textContent = 'Generating PDF...';

            // Get markdown content
            const leftMd = leftMarkdown.value.trim();
            const rightMd = rightMarkdown.value.trim();

            console.log('DEBUG: Markdown content retrieved:', {
                leftLength: leftMd.length,
                rightLength: rightMd.length
            });

            // Convert markdown to HTML
            const leftHtml = marked.parse(leftMd);
            const rightHtml = marked.parse(rightMd);

            console.log('DEBUG: Markdown converted to HTML:', {
                leftHtmlLength: leftHtml.length,
                rightHtmlLength: rightHtml.length
            });

            // Render content to hidden containers
            leftContent.innerHTML = leftHtml;
            rightContent.innerHTML = rightHtml;

            console.log('DEBUG: Content rendered to hidden containers');
            console.log('DEBUG: Left content HTML:', leftContent.innerHTML.substring(0, 200));
            console.log('DEBUG: Right content HTML:', rightContent.innerHTML.substring(0, 200));

            // Apply consistent styling
            applyContentStyling(leftContent);
            applyContentStyling(rightContent);

            console.log('DEBUG: Styling applied to hidden containers');

            // Show preview temporarily to measure content
            pdfPreview.style.display = 'block';
            pdfPreview.style.position = 'absolute';
            pdfPreview.style.left = '-9999px';
            pdfPreview.style.top = '0';

            console.log('DEBUG: PDF preview container shown off-screen');
            console.log('DEBUG: PDF preview dimensions:', {
                width: pdfPreview.offsetWidth,
                height: pdfPreview.offsetHeight,
                scrollWidth: pdfPreview.scrollWidth,
                scrollHeight: pdfPreview.scrollHeight
            });

            // Wait a bit for rendering
            await new Promise(resolve => setTimeout(resolve, 100));

            // Find optimal font sizes for both sides
            const leftFontSize = findOptimalFontSize(leftContent, leftContent.innerHTML);
            const rightFontSize = findOptimalFontSize(rightContent, rightContent.innerHTML);

            console.log('DEBUG: Optimal font sizes calculated:', {
                leftFontSize,
                rightFontSize
            });

            // Use the smaller font size for both sides to maintain consistency
            const fontSize = Math.min(leftFontSize, rightFontSize);

            console.log('DEBUG: Using font size:', fontSize);

            leftContent.style.fontSize = fontSize + 'px';
            leftContent.style.lineHeight = (fontSize * 1.2) + 'px';
            rightContent.style.fontSize = fontSize + 'px';
            rightContent.style.lineHeight = (fontSize * 1.2) + 'px';

            // Wait a bit more for font sizing to take effect
            await new Promise(resolve => setTimeout(resolve, 100));

            // Reset position for canvas capture
            pdfPreview.style.position = 'static';
            pdfPreview.style.left = 'auto';

            console.log('DEBUG: PDF preview repositioned for capture');

            // Generate PDF using html2canvas and jsPDF
            console.log('DEBUG: Starting html2canvas capture');
            const canvas = await html2canvas(pdfPreview, {
                width: 1123, // A4 landscape width in pixels (297mm at 96 DPI)
                height: 794,  // A4 landscape height in pixels (210mm at 96 DPI)
                scale: 2,     // Higher scale for better quality
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            console.log('DEBUG: Canvas created:', {
                width: canvas.width,
                height: canvas.height
            });

            // Create a temporary image to verify canvas content
            const tempImg = canvas.toDataURL('image/png');
            console.log('DEBUG: Canvas data URL length:', tempImg.length);
            console.log('DEBUG: Canvas data URL preview:', tempImg.substring(0, 100));

            // Show the captured canvas as an image for debugging
            const debugImg = document.createElement('img');
            debugImg.src = tempImg;
            debugImg.style.maxWidth = '500px';
            debugImg.style.border = '2px solid red';
            debugImg.style.display = 'block';
            debugImg.style.margin = '20px auto';
            document.body.appendChild(debugImg);
            console.log('DEBUG: Canvas image added to page for inspection');

            // Create PDF in landscape orientation
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            console.log('DEBUG: PDF created');

            // Calculate dimensions to fit the canvas in the PDF
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            console.log('DEBUG: Dimensions:', {
                pdfWidth,
                pdfHeight,
                canvasWidth,
                canvasHeight
            });

            // Scale to fit
            const scale = Math.min(pdfWidth / (canvasWidth / 96 * 25.4), pdfHeight / (canvasHeight / 96 * 25.4));
            const finalWidth = (canvasWidth / 96 * 25.4) * scale;
            const finalHeight = (canvasHeight / 96 * 25.4) * scale;

            // Center the content
            const x = (pdfWidth - finalWidth) / 2;
            const y = (pdfHeight - finalHeight) / 2;

            console.log('DEBUG: Final positioning:', {
                scale,
                finalWidth,
                finalHeight,
                x,
                y
            });

            // Add image to PDF
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);

            console.log('DEBUG: Image added to PDF');

            // Save PDF
            pdf.save('markdown-document.pdf');
            console.log('DEBUG: PDF saved');

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