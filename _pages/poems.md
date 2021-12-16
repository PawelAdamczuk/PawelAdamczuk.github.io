---
permalink: /poems/
title: "Poems"
---

<style>

.poems {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    font-family: "Times New Roman", Times, serif;
}

.poems:nth-child(odd) {
    background-color: #BAB4FA;
    color: #0A0078;
}

.poems:nth-child(even) {
    background-color: #0A0078;
    color: #BAB4FA;
}

</style>

![](/assets/poems.gif)

<div class="poems-1 poems">

{% capture poem1 %}{% include_relative poems/1.md %}{% endcapture %}
{{ poem1 | markdownify }}

</div>

<div class="poems-2 poems">

{% capture poem2 %}{% include_relative poems/2.md %}{% endcapture %}
{{ poem2 | markdownify }}

</div>

<div class="poems-3 poems">

{% capture poem3 %}{% include_relative poems/3.md %}{% endcapture %}
{{ poem3 | markdownify }}

</div>

<div class="poems-1 poems">

{% capture poem4 %}{% include_relative poems/4.md %}{% endcapture %}
{{ poem4 | markdownify }}

</div>