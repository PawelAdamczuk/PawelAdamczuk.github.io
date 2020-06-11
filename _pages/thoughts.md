---
permalink: /thoughts/
title: "Thoughts"
---

{% for thought in site.data.thoughts %}
- {{ thought }}
{% endfor %}