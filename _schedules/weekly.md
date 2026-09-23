---
# The "Weekly Rhythm" table on the Schedule page.
#
# Rendered by _layouts/schedule.html. Each row is one component of the course;
# `cells` maps a day name to what happens that day. A cell may set:
#   text  - the main line (markdown-ish inline HTML is allowed)
#   note  - a smaller second line
#   kind  - lecture | section | due | exam | hours | work   (controls the colour)
#   span  - number of day columns to stretch across (default 1)
heading: COGS 118D Weekly Rhythm
subtitle: "Here's how you can expect to spend your time in this course:"
term: Fall 2026
instructor: Prof. Lucy Lai

days:
  - Monday
  - Tuesday
  - Wednesday
  - Thursday
  - Friday

rhythm:
  - component: Lecture
    note: 10–10:50am @ <a href="https://maps.app.goo.gl/EBMotpwtm59M6zW38" target="_blank" rel="noopener">COA B27 &#x2197;</a>
    cells:
      Monday:
        text: Lecture
        kind: lecture
      Wednesday:
        text: Lecture
        kind: lecture
      Friday:
        text: Lecture
        kind: lecture

  - component: Discussion section
    note: Wednesdays @ <a href="https://maps.app.goo.gl/bF2MJgm9aCoEa3ak7" target="_blank" rel="noopener">CSB 004 &#x2197;</a>
    cells:
      Wednesday:
        text: S1 · 4–4:50pm<br>S2 · 5–5:50pm
        kind: section

  - component: Assignments
    note: Due 11:59pm
    cells:
      Monday:
        text: Quiz due
        note: on Canvas
        kind: due

  - component: ''
    cells:
      Monday:
        text: Homework due
        note: on Gradescope
        kind: due
      Tuesday:
        text: Work on this week's homework
        kind: work
        span: 4

  - component: Course projects
    note: Slides & video, on Gradescope
    cells:
      Monday:
        text: Mini-Project 1 · Oct 26<br>Mini-Project 2 · Nov 16<br>Final project · Dec 7
        kind: due
      Friday:
        text: Project Expo · Dec 4
        kind: due

  - component: In-class exams
    note: During lecture
    cells:
      Wednesday:
        text: Exam 1 · Oct 21<br>Exam 3 · Dec 2
        kind: exam
      Friday:
        text: Exam 2 · Nov 13
        kind: exam

  - component: Office hours
    cells:
      Wednesday:
        text: Prof. Lai
        note: 2–3:15pm 1-1s (<a href="https://calendar.app.google/AFfkzCq6sAxN44oe7" target="_blank" rel="noopener">booked</a>)<br>3:15–4:30pm open, walk-in
        kind: hours

  - component: ''
    cells:
      Monday:
        text: Ian (TA)
        note: 3pm @ <a href="https://maps.app.goo.gl/bF2MJgm9aCoEa3ak7" target="_blank" rel="noopener">CSB 123 &#x2197;</a> or Zoom
        kind: hours
      Wednesday:
        text: Ian (TA)
        note: During discussion section
        kind: hours

  - component: Other
    cells:
      Monday:
        text: Study for exams, work on course projects
        kind: work
        span: 5
---
