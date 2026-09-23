---
layout: home
title: 🏠 Home
nav_exclude: false
nav_order: 1
seo:
  type: Course
  name: Computational Models of Cognition and Behavior
---

# {{ site.tagline }}
{: .mb-2 }
{% if site.description != '' %}{{ site.description }}
{: .fs-6 .fw-300 }
{% endif %}

{% assign instructors = site.staffers | where: 'role', 'Instructor' %}
{% for staffer in instructors %}{% include staffer.html staffer=staffer nobio='true' %}{% endfor %}

{{ site.course_vars.quarter }}
{: .label .label-blue .course-badge }

<a href="{{ site.course_vars.building_map }}" target="_blank" rel="noopener">{{ site.course_vars.building }} &#x2197;</a>
{: .label .label-blue .course-badge }

{{ site.course_vars.timings }}
{: .label .label-blue .course-badge }


{% comment %} Important info & reminders: edit _data/notices.yml {% endcomment %}

{% include notices.html %}

## Discussion Sections

Both sections meet on **Wednesdays @ <a href="https://maps.app.goo.gl/bF2MJgm9aCoEa3ak7" target="_blank" rel="noopener">CSB 004 &#x2197;</a>** with [Ian](mailto:izane@ucsd.edu).

* **W, 4-4:50pm**
* **W, 5-5:50pm**

## Office Hours

{% comment %} Office-hours grid, built from the rows tagged `group: hours` in _schedules/weekly.md {% endcomment %}

{% include hours.html %}

## Course Calendar

{% comment %} One row per week: edit _data/calendar.yml {% endcomment %}

{% include calendar.html %}
