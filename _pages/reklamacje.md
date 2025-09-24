---
layout: single
classes: wide
author_profile: true
permalink: /reklamacje/
---

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>

    <script type="module"
        src="https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts/dist/esm/contrib/all-in-one-lite.bundle.js"
        id="typst"></script>

<div class="container mt-5">
        <h1>Reklamacja PDF Generator</h1>
        <form id="reklamacjaForm" class="mb-3">
            <h5>Dane konsumenta</h5>
            <div class="row g-3">
                <div class="col-md-6">
                    <label for="konsument_imie" class="form-label">Imię</label>
                    <input type="text" class="form-control" id="konsument_imie" value="Jan" required>
                </div>
                <div class="col-md-6">
                    <label for="konsument_nazwisko" class="form-label">Nazwisko</label>
                    <input type="text" class="form-control" id="konsument_nazwisko" value="Kowalski" required>
                </div>
                <div class="col-12">
                    <label for="konsument_adres" class="form-label">Adres</label>
                    <input type="text" class="form-control" id="konsument_adres"
                        value="ul. Przykładowa 1, 00-000 Miasto" required>
                </div>
                <div class="col-md-6">
                    <label for="konsument_tel" class="form-label">Telefon</label>
                    <input type="text" class="form-control" id="konsument_tel" value="123-456-789">
                </div>
                <div class="col-md-6">
                    <label for="konsument_email" class="form-label">E-mail</label>
                    <input type="email" class="form-control" id="konsument_email" value="jan.kowalski@email.com">
                </div>
            </div>
            <div class="d-flex align-items-center mt-4 mb-2">
                <h5 class="mb-0">Dane sprzedawcy</h5>
                <div class="ms-3 small text-secondary" style="white-space:nowrap;">
                    <label for="sprzedawca_krs" class="form-label mb-0">numer KRS</label>
                    <input type="text" class="form-control form-control-sm d-inline-block"
                        style="width: 120px; max-width: 40vw; vertical-align: middle;" id="sprzedawca_krs"
                        placeholder="np. 0000123456">
                    <span id="krs_status" class="ms-2"></span>
                </div>
            </div>
            <div class="row g-3">
                <div class="col-md-6">
                    <label for="sprzedawca_nazwa" class="form-label">Nazwa sprzedawcy</label>
                    <input type="text" class="form-control" id="sprzedawca_nazwa" value="Sklep XYZ" required>
                </div>
                <div class="col-md-6">
                    <label for="sprzedawca_adres" class="form-label">Adres sprzedawcy</label>
                    <input type="text" class="form-control" id="sprzedawca_adres" value="ul. Sklepowa 2, 00-001 Miasto"
                        required>
                </div>
            </div>
            <h5 class="mt-4">Towar</h5>
            <div class="row g-3">
                <div class="col-md-6">
                    <label for="towar_nazwa" class="form-label">Nazwa towaru</label>
                    <input type="text" class="form-control" id="towar_nazwa" value="SuperWidget 3000" required>
                </div>
                <div class="col-md-6">
                    <label for="towar_data_zakupu" class="form-label">Data zakupu</label>
                    <input type="date" class="form-control" id="towar_data_zakupu" value="2025-08-31" required>
                </div>
                <div class="col-12">
                    <label for="opis_wady" class="form-label">Opis wady</label>
                    <textarea class="form-control" id="opis_wady" rows="2" required>Nie działa po włączeniu.</textarea>
                </div>
                <div class="col-md-6">
                    <label for="zadanie" class="form-label">Żądanie</label>
                    <input type="text" class="form-control" id="zadanie" value="Wymiana na nowy egzemplarz" required>
                </div>
                <div class="col-md-6">
                    <label for="zalaczniki" class="form-label">Załączniki</label>
                    <input type="text" class="form-control" id="zalaczniki" value="paragon, zdjęcie produktu" required>
                </div>
                <div class="col-md-6">
                    <label for="miejscowosc" class="form-label">Miejscowość</label>
                    <input type="text" class="form-control" id="miejscowosc" value="Warszawa" required>
                </div>
                <div class="col-md-6">
                    <label for="data" class="form-label">Data</label>
                    <input type="date" class="form-control" id="data" value="2025-08-31" required>
                </div>
            </div>
            <div class="mt-4">
                <button type="submit" class="btn btn-primary">Generuj PDF</button>
            </div>
        </form>
    </div>
    <script>
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

            // Wait for form submission
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

                fetch('assets/reklamacje.typ')
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
    </script>