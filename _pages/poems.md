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


.poems {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    font-family: "Times New Roman", Times, serif;
}
</style>

![](/assets/poems.gif)

<div class="poems-1 poems">

{% include_relative poems/1.md %}

</div>

<div class="poems-2 poems">

{% capture poem2 %}{% include_relative poems/2.md %}{% endcapture %}
{{ poem2 | markdownify }}

</div>