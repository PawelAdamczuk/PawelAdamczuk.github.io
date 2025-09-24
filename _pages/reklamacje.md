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
    <h1>Generator wniosku reklamacji</h1>
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
                <input type="text" class="form-control" id="konsument_adres" value="ul. Przykładowa 1, 00-000 Miasto"
                    required>
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

<script src="{{ '/assets/js/reklamacje.js' | relative_url }}"></script>