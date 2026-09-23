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
{{ site.description }}
{: .fs-6 .fw-300 }

{% assign instructors = site.staffers | where: 'role', 'Instructor' %}
{% for staffer in instructors %}{% include staffer.html staffer=staffer nobio='true' %}{% endfor %}

{{ site.course_vars.quarter }}
{: .label .label-blue }

{{ site.course_vars.building }}
{: .label .label-blue }

{{ site.course_vars.timings }}
{: .label .label-blue }


{% comment %} Important info & reminders: edit _data/notices.yml {% endcomment %}

{% include notices.html %}

<div class="two-col" markdown="1">
<div markdown="1">

## Discussion Sections

Both sections meet on **Wednesdays @ CSB 004** with **Ian**.

* **W, 4-4:50pm**
* **W, 5-5:50pm**

</div>
<div markdown="1">

## Office Hours
* **Prof. Lai**:
  * Wed, 2-3:15pm (1-1, <a href="https://calendar.app.google/1nebbtvdYdn6WFpw5" target="_blank" rel="noopener">book &#x2197;</a> only) @ CSB 244 or <a href="https://ucsd.zoom.us/my/lucylai" target="_blank" rel="noopener">Zoom &#x2197;</a>
  * Wed, 3:15-4:30pm (open office hours, walk-in!) @ CSB 244
* **Ian** (TA):
  * Mon, 3pm @ CSB 123 or <a href="https://ucsd.zoom.us/j/3497925056?pwd=BYldMAJhbdzT4LV8k3OHIP5seWoYk4.1" target="_blank" rel="noopener">Zoom &#x2197;</a>
  * During discussion section (Wed, 4-5:50pm @ CSB 004)

</div>
</div>

## Course Calendar

{% comment %} One row per week: edit _data/calendar.yml {% endcomment %}

{% include calendar.html %}
