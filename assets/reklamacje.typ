#set page(width: 210mm, height: 297mm, margin: 25mm)

#let phone = "{{KONSUMENT_TEL}}"
#let email = "{{KONSUMENT_EMAIL}}"

#align(right)[
  {{KONSUMENT_IMIE}} {{KONSUMENT_NAZWISKO}} \
  {{KONSUMENT_ADRES}} \
  #if phone != "" [
    tel: {{KONSUMENT_TEL}} \
  ]
  #if email != "" [
    e-mail: {{KONSUMENT_EMAIL}}
  ]
]

{{SPRZEDAWCA_NAZWA}} \
{{SPRZEDAWCA_ADRES}}

#align(center)[#strong[#underline[Reklamacja z tytułu rękojmi]]]

*Towar:* {{TOWAR_NAZWA}} \
*Data zakupu:* {{TOWAR_DATA_ZAKUPU}}

Na podstawie art. 556 i nast. Kodeksu cywilnego składam reklamację z tytułu rękojmi.

*Opis wady:* \
{{OPIS_WADY}}

*Żądanie:* \
{{ZADANIE}}

Proszę o odpowiedź w ustawowym terminie 14 dni.

Załączniki: {{ZALACZNIKI}}

#align(right)[
  {{MIEJSCOWOSC}}, dnia {{DATA}} \
  \
  .............................................. \
  (podpis)
]
