// KRS lookup debounce and autofill logic
(function () {
    const krsInput = document.getElementById('sprzedawca_krs');
    const statusSpan = document.getElementById('krs_status');
    const nazwaInput = document.getElementById('sprzedawca_nazwa');
    const adresInput = document.getElementById('sprzedawca_adres');
    let debounceTimeout = null;
    if (krsInput) {
        krsInput.addEventListener('input', function () {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            statusSpan.textContent = '';
            statusSpan.className = 'ms-2';
            debounceTimeout = setTimeout(() => {
                const krs = krsInput.value.trim();
                if (!krs) return;
                statusSpan.textContent = 'szukam...';
                statusSpan.className = 'ms-2 text-secondary';
                fetch(`https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/${encodeURIComponent(krs)}?rejestr=P&format=json`)
                    .then(resp => {
                        if (resp.status === 404) {
                            statusSpan.textContent = 'nie znaleziono!';
                            statusSpan.className = 'ms-2 text-danger';
                            return null;
                        }
                        if (!resp.ok) throw new Error('API error');
                        return resp.json();
                    })
                    .then(json => {
                        if (!json) return;
                        // Try to extract name and address
                        try {
                            const nazwa = json.odpis.dane.dzial1.danePodmiotu.nazwa;
                            const adresObj = json.odpis.dane.dzial1.siedzibaIAdres.adres || json.odpis.dane.dzial1.siedzibaIAdres;
                            let adres = '';
                            if (adresObj) {
                                adres = [
                                    adresObj.ulica,
                                    adresObj.nrDomu ? adresObj.nrDomu : '',
                                    adresObj.nrLokalu ? ('/' + adresObj.nrLokalu) : '',
                                    adresObj.kodPocztowy,
                                    adresObj.miejscowosc,
                                    adresObj.kraj
                                ].filter(Boolean).join(' ').replace(/  +/g, ' ');
                            }
                            nazwaInput.value = nazwa || '';
                            adresInput.value = adres || '';
                            statusSpan.textContent = 'znaleziono!';
                            statusSpan.className = 'ms-2 text-success';
                        } catch (e) {
                            statusSpan.textContent = 'nie znaleziono!';
                            statusSpan.className = 'ms-2 text-danger';
                        }
                    })
                    .catch(() => {
                        statusSpan.textContent = 'nie znaleziono!';
                        statusSpan.className = 'ms-2 text-danger';
                    });
            }, 2000);
        });
    }
})();
// Listens the 'load' event to initialize after loaded the bundle file from CDN (jsdelivr).
document.getElementById('typst').addEventListener('load', function () {
    $typst.setCompilerInitOptions({
        getModule: () =>
            'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
    });
    $typst.setRendererInitOptions({
        getModule: () =>
            'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
    });

    document.getElementById('reklamacjaForm').addEventListener('submit', function (e) {
        e.preventDefault();
        // Gather all form values
        const values = {
            KONSUMENT_IMIE: document.getElementById('konsument_imie').value,
            KONSUMENT_NAZWISKO: document.getElementById('konsument_nazwisko').value,
            KONSUMENT_ADRES: document.getElementById('konsument_adres').value,
            KONSUMENT_TEL: document.getElementById('konsument_tel').value,
            // Escape @ for Typst using \\@
            KONSUMENT_EMAIL: document.getElementById('konsument_email').value.replace(/@/g, '\\@'),
            SPRZEDAWCA_NAZWA: document.getElementById('sprzedawca_nazwa').value,
            SPRZEDAWCA_ADRES: document.getElementById('sprzedawca_adres').value,
            TOWAR_NAZWA: document.getElementById('towar_nazwa').value,
            TOWAR_DATA_ZAKUPU: document.getElementById('towar_data_zakupu').value,
            OPIS_WADY: document.getElementById('opis_wady').value,
            ZADANIE: document.getElementById('zadanie').value,
            ZALACZNIKI: document.getElementById('zalaczniki').value,
            MIEJSCOWOSC: document.getElementById('miejscowosc').value,
            DATA: document.getElementById('data').value
        };

        fetch('/assets/reklamacje.typ')
            .then(response => response.text())
            .then(templateContent => {
                console.log('TEMPLATE CONTENT BEFORE REPLACEMENT:', templateContent);
                console.log('FORM VALUES:', values);
                // Replace all {{VAR}} placeholders with form values
                let typstSource = templateContent;
                for (const [key, value] of Object.entries(values)) {
                    const re = new RegExp(`{{${key}}}`, 'g');
                    typstSource = typstSource.replace(re, value);
                }
                console.log('TYPST SOURCE AFTER REPLACEMENT:', typstSource);

                $typst.pdf({ mainContent: typstSource }).then(pdfData => {
                    var pdfFile = new Blob([pdfData], { type: 'application/pdf' });
                    console.log(`pdf generated! Blob { size: ${pdfFile.size} }`);
                    // Trigger download
                    var link = document.createElement('a');
                    link.href = URL.createObjectURL(pdfFile);
                    link.download = 'reklamacja.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);
                });
            });
    });
});