---
layout: page
title: 🧑🏻‍🏫 Staff
nav_order: 6
description: A listing of all the course staff members.
---

# Course Staff

## Get to know your COGS 118D course staff! 
🎓 degree  🏠 hometown  💬 talk to me about...

{% comment %}
  Everyone on this page is generated from _staffers_source.md at build time by
  _plugins/split_staffers.rb. To add, remove or edit a person, edit that file.
{% endcomment %}

{% assign role_names = 'Instructor,Teaching Assistant,PLA,Reader' | split: ',' %}
{% assign role_headings = 'Instructor,Teaching Assistant,Peer Learning Assistants,Reader' | split: ',' %}

{% for role in role_names %}
  {% assign group = site.staffers | where: 'role', role %}
  {% if group.size > 0 %}
## {{ role_headings[forloop.index0] }}

{% for staffer in group %}
{{ staffer }}
{% endfor %}
  {% endif %}
{% endfor %}
