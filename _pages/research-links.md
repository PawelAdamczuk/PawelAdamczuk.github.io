---
permalink: /research-links/
title: "Interesting research"
---

{% for link in site.data.research_links %}
- [{{ link.title }}]({{ link.url }})
{% endfor %}