---
layout: page
title: 📅 Weekly Rhythm
nav_order: 3
description: What a typical week looks like in COGS 118D.
---

{% for schedule in site.schedules %}
{{ schedule }}
{% endfor %}

For the full week-by-week calendar, see the [home page]({{ site.baseurl }}/#course-calendar).
