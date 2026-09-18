---
layout: page
title: 🧑🏻‍🏫 Staff
nav_order: 5
description: A listing of all the course staff members.
---

# Course Staff

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
