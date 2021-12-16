---
permalink: /poems/
title: "Poems"
---

<style>
.poems-1 {
    background-color: #A8D9C6;
    color: #8C1D06;
}
.poems-2 {
    background-color: #7EA1C4;
    color: #1B365C;
}
.poems-3 {
    background-color: #CED9A7;
    color: #5D008C;
}


.poems {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    font-family: "Times New Roman", Times, serif;
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