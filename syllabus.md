---
layout: page
title: 📖 Syllabus
nav_order: 2
description: The COGS 118D course syllabus
---

# Syllabus
{: .no_toc }

COGS 118D: Computational Models of Cognition and Behavior · Fall 2026
{: .fs-5 .fw-300 }

{: .warning }
This syllabus is a draft and is subject to change before the quarter begins!

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Course Teaching Staff

| Instructor | [Lucy Lai](https://www.lucylai.com) |
| TA | Ian Zane |
| Reader (Grader) | Pradyumna |

See the [Staff page]({{ site.baseurl }}/staff/) for more about each of us.

## Course Information

| **Lectures** | MWF, 10-10:50am @ COA B27 |
| **Discussion sections** | W, 4-4:50pm @ CSB 004<br>W, 5-5:50pm @ CSB 004 |
| **Final** | **No** sit-down final exam. The final project is due on **Dec 11 @ 11:59pm**. |
| **Prerequisites** | • **Programming:** BILD 62 or COGS 18 or CSE 11 or CSE 8B<br>• **Linear algebra:** MATH 18 or MATH 31AH<br>• **Probability & statistics:** ECE 109 or ECON 120A or MAE 108 or MATH 180A or MATH 183 or MATH 186<br>• **Data science and ML:** COGS 109 or COGS 118A or COGS 118B or COGS 188 or CSE 150A or CSE 151A or CSE 158 or CSE 158R or DSC 148 or ECE 174 or ECE 175A<br>_As long as you can demonstrate that you have the prerequisite knowledge via pre-test, you may enroll in the course via instructor permission._ |
| **Credits** | 4.00 |
| **Course Website** | [cogs118d.github.io](https://cogs118d.github.io) |

### Office hours

| Staff | Date & Time | Location |
|:--|:--|:--|
| Prof. Lai | Wed, 2-3:15pm (1-1, [book](https://calendar.app.google/1nebbtvdYdn6WFpw5) only) | CSB 244 & Zoom |
| Prof. Lai | Wed, 3:15-4:30pm (open office hours, walk-in) | CSB 244 |
| TA | During section time | CSB 004 |

## Course Description

**Behavioral data is everywhere—revealing how we think, learn, and act.** This course equips you to describe, predict, and explain behavior for real-world applications, using tools from classical statistics, machine learning, and cognitive modeling. We will explore a variety of computational models, including generalized linear models (GLMs), Bayesian cognitive models, and latent variable models, and apply them to real-world datasets. A practical course for students interested in behavioral data science or computational research in human behavior. Skills learned will be applicable to both industry (e.g., quantitative UX, behavioral data science) and academic paths (e.g., computational cognitive science research) alike.

**This could be a good course for you** if you are interested in applying computational models to analyze real behavioral datasets and/or learning to generate new research questions at the frontier of computational cognitive science. The course will rely on interactive discussion and collaboration, and will offer a chance to hone your research, presentation, and communication skills.

## Course Learning Goals

By the end of this course, you will be able to (course-specific):

1. **Identify** and **describe** key models used in behavioral data analysis and cognitive modeling, including generalized linear models (GLMs), generative models of cognition, and latent variable models and the questions each is designed to answer.
2. **Distinguish** describe, predict, and explain as distinct goals of behavioral data analysis and **explain** why different modeling approaches suit different research or industry questions.
3. **Apply** computational models to understand and analyze real-world behavioral datasets.
4. **Assess** model performance by performing model comparison, and **interpret** results in terms of theoretical and practical significance (e.g., making product recommendations or drawing conclusions about the cognitive processes that underlie human learning and decision making).

You will also be able to (domain-general skills):

{:start="5"}
5. **Deliver a clear and engaging oral presentation** to effectively communicate results of data analysis to an interdisciplinary audience.
6. **Contribute** to a collaborative and interactive learning environment.
7. **Apply AI tools** in innovative and pedagogically meaningful ways to enhance learning.
8. **Refine learning strategies** through metacognition reflection.

## Course Materials

- There is **no textbook**.
- **All course materials** are provided through this course website.
- **Canvas** is used for reading quizzes, course announcements, and to view your grades.
- **Gradescope** will be used to submit assignments + course project.
- Please post any questions on the course **Piazza** (and answer your classmates' questions!).

## Course Details, Datasets, and Modules

This course teaches you to formally analyze and model human behavior by building and testing quantitative accounts of why people act the way they do.

**What we mean by "behavior."** Behavior is a very general term that can mean anything from how people make binary choices to free-text responses on internet forums. **In this course, we define behavior as any measurable output of an underlying cognitive process:** how users interact with an app or website, a survey response, a choice on a trial, an error, a response time, or even a physiological signal recorded during a night of sleep. Our main goals are to understand:

1. the factors that influence human behavior and
2. the cognitive processes that produce it.

**Course datasets.** You'll work with data from user testing surveys, usability studies, game-play behavior, wearable sensors, and cognitive science experiments.

**Course modules & questions.** The course is split into 4 modules, each designed to address a distinct type of question about behavioral data. Each module contains models that will be covered. For the most part, this course focuses on interpretable models that are useful for inference (understand what factors influence behavior), though we do contrast with purely prediction models (e.g., machine learning).

| Module | Question / Models Covered | Description |
|:--|:--|:--|
| **1: Describe** | **Is there a real difference or pattern in the data?**<br><br>_Examples:_<br>• _Does user satisfaction differ by device type?_<br>• _Does version A or version B of a website change a user's behavior?_<br><br>**Models/tools covered:** Common statistical tests for exploratory behavioral data analysis | We will briefly review the classical toolkit of statistical testing (e.g., t-tests, ANOVA, chi-square) and discover how each is a special case of one underlying framework: the **generalized linear model (GLM)**.<br><br>You'll practice choosing the right test for a given outcome type (continuous, binary, count) and its distribution, and learn to recognize when test assumptions are violated. |
| **2: Predict** | **Given a particular setting or situation, what will this person do?**<br><br>_Examples:_<br>• _Will this user buy the product subscription?_<br>• _Will this participant respond correctly on the next trial?_<br><br>**Models/tools covered:** Generalized linear models (GLMs) for prediction and inference, mixed-effects models, survival analysis | You will build models to predict human behavior and understand the factors that influence it. You will learn to match each behavioral outcome type to the appropriate GLM family and link function.<br><br>You will then extend these single-level models into mixed-effects models for data with multi-level structure, such as multiple sessions from the same player or multiple tasks from the same participant. |
| **3: Explain** | **What internal cognitive process produced this behavior?**<br><br>_Examples:_<br>• _What unobserved cognitive state are people in?_<br>• _What can people's decision making behavior reveal about the cognitive algorithm they are using?_<br><br>**Models/tools covered:** Reinforcement learning, Bayesian models of cognition, Hidden Markov Models, and the generative cognitive modeling workflow (model fitting, simulation, parameter recovery etc.) | You will learn to formalize a cognitive hypothesis as a generative model, fit that model to choice data, and compare competing models to determine which one best explains a person's behavior.<br><br>While this approach is mostly unique to academic cognitive science research, some of the tools involved (e.g., fitting models to data, formal model comparison) can be just as useful in industry. |

## Course Calendar & Topics

The full week-by-week calendar, with links to submit each assignment, is on the [home page]({{ site.baseurl }}/#course-calendar). For what a typical week looks like, see the [weekly rhythm]({{ site.baseurl }}/schedule/).

All assignments are due by **11:59pm PT**.

## Assignments

_Forthcoming…_

## Grading

### My philosophy on grades

Anxiety about grades often pushes well-meaning but stressed students to put in the **least amount of effort** required to obtain the grade they desire (I've been there myself). This is simply human nature(!), and in my opinion, a failure of the modern education system.

However, when designed thoughtfully, grades can serve a valuable purpose: they can tell you how well you grasped the material, and can tell me whether I need to clarify something better. If it were up to me, I'd eliminate letter grades and GPAs entirely, but since UCSD requires them, I've designed grades in this course to reflect a balance between:

1. **your demonstrated progress** toward and
2. **mastery** of the course's learning goals.

**To measure demonstrated progress:** Homeworks assignments are <u>graded for completion</u>, as long as you make a **genuine effort to engage with the material.** This is meant to motivate your learning in a low-stakes environment without the pressure of performance-based grading. Weekly quizzes are closed-note and mirror the timing and content of exams (half the time and content). However, they are primarily intended as a "knowledge check" to help you gauge your understanding of course material and **can be retaken as many times as needed** until you achieve 100%.

**To measure mastery:** Exams allow both you and I to gauge how well you've grasped the course material. There are 3 in-class exams spaced ~3 weeks apart, and are non-cumulative. The course project offers another opportunity to demonstrate mastery by applying course concepts to a real-world dataset. This project will be evaluated by me, the TAs, and your peers using a clear rubric.

If you're curious about the ideas that shaped this grading philosophy, I highly recommend:

1. _Ungrading: Why Rating Students Undermines Learning (and What to Do Instead)_
2. _Grading for Growth_

### Grade points

Your final letter grade in this course is based on the **total grade points** you earn across the following course components.

| Category | Course component | Points |
|:--|:--|--:|
| **Misc.** | Pre-course survey | 0.5pt |
|  | Syllabus quiz | 0.5pt |
|  | Post-course survey | 0.5pt |
|  | SET evaluations (>80% class completion) | 1pt |
| **Attendance & participation** | Lecture participation (24 total) | 0.25pts × 24 = **6pts** |
| **Main assignments** | Homeworks (7 total) | 3pts × 7 = **21pts** |
|  | Quizzes (7 total) | 1pt × 7 = **7pts** |
|  | Exams (3 total) | 17pts × 3 = **51pts** |
|  | Exam cheat sheets (handwritten) | 1pt × 3 = **3pts** |
|  | Course projects (3 total) | 4 + 4 + 10 = **18pts** |
| | **Total available** | **108.5pts** |

As you may have already noticed, there are <u>a total of **108.5 points**</u> available for you to earn in this course. <u>How you choose to earn points in this course is entirely up to you.</u> For example, you can choose to skip lectures, skip a reading quiz or two, etc. This flexible grading system offers many paths to success in this course, and recognizes that students have different strengths and preferences in how they demonstrate learning. _Everything is optional_—your learning is your own responsibility!

The 8.5 extra points are also meant to offer **flexibility for unprecedented situations and absences**; please note there are no alternative options to "make up points" for missed lectures or sections—that's what the +8.5 points are for! 🙂

{: .highlight }
My ultimate goal is to **take the stress off grades** so that you can **focus on genuine learning instead.**

I will assign final letter grades based off the following scale:

| Points | Letter grade |
|--:|:--|
| >97 | A+ |
| 93-96.99 | A |
| 90-92.99 | A- |
| 87-89.99 | B+ |
| 83-86.99 | B |
| 80-82.99 | B- |
| 77-79.99 | C+ |
| 73-76.99 | C |
| 70-72.99 | C- |
| 60-69.99 | D |
| <60 | F |

{: .warning }
**Please note:** Because there are ample opportunities to earn points in this course, **we do not adjust or "round up" final letter grades.** Please do not email course staff with this request.

## FAQ / Course Policies

### Can I turn in an assignment late?

_Forthcoming…_

### Can I bring a cheat sheet to the exams?

No, all exams are closed-note. However, students that make and submit handwritten cheat sheets _before_ the exam will earn +1 course point (the logic being that making hand-written cheat sheets is an excellent way to study).

### What happens if I miss an exam or have testing accommodations?

We will use the [Triton Testing Center (TTC)](https://ttc.ucsd.edu/) located in Pepper Canyon Hall 364 to administer exams for students with documented accommodations and for legitimate excused absences (does NOT include voluntary travel).

**If you know you need to miss an exam for a legitimate reason, please let Prof. Lai know ASAP.** You may schedule your make-up exam within a 1-week window after the initial exam date. (Those with documented testing accommodations must schedule to take the exam the same day as everyone else). Other exceptions will only be granted under **extenuating circumstances.**

### What if I have a question about the homework?

Before emailing course staff:

1. check the class **Piazza** to see if your question has already been answered! If not, post it there so others can benefit too.
2. bring questions to your TA/PLA in discussion section or office hours! Both are great opportunities for getting help and support in the course.

### How do I calculate my grade in this course?

Because we use a **"point accumulation"** grading scheme in this course, you will accumulate points throughout the quarter from assignments/quizzes/etc. Your grade is **<u>_NOT_ a percentage</u>—please ignore anything on Canvas that shows a "%".**

To check your current point total, go to **Canvas → Grades**, scroll to the bottom, and look at the **<u>numerator</u> of "Total"** (ignore the denominator, <u>don't divide</u> by anything!). That numerator is your current grade—the number of points you have earned so far.

Final course grades will be assigned based on your **total points earned** (see the table above for points → letter-grade conversions).

### Can I use ChatGPT or other AI tools to help me with assignments?

Yes, of course! You are welcome (and even encouraged) to use AI tools in this course. I'm an AI enthusiast myself, and I believe they can be powerful learning aids.

**However,** there are both helpful and detrimental ways to use AI. **Mindless reliance on AI will only cause brain rot and leave you unprepared for weekly quizzes.** Since this course is intentionally designed to support your genuine understanding of the material, <u>using AI as a shortcut won't serve you in the long run</u>. Ultimately, it's a matter of your own integrity and commitment to doing yourself a favor by engaging fully with the learning process.

Throughout the course, I'll share examples of productive ways to use AI, such as helping you understand readings, clarify difficult concepts, and get feedback on your work. **However, copying AI-generated output <u>verbatim</u> and submitting it as your own work is <u>strictly prohibited</u>.** Not only is this usually easy to spot, but it also undermines your opportunity to learn. **If we notice any obvious instances, you will receive a 0 on the assignment.**

### I have a question that isn't answered in this syllabus…

Please post your question on the class Piazza! If it is a personal or sensitive question (that doesn't pertain to anyone else in the class), please email Prof. Lai ([lai@ucsd.edu](mailto:lai@ucsd.edu)) and CC **your assigned TA/PLA.**

## Finally…

Since this is my first time teaching this course, I'm especially open to feedback and reasonable discussions about course policies. If you ever feel that a policy is unfair or gets in the way of your learning, you have several ways to let us know:

1. talk to your TA or PLAs during discussion section
2. come to my office hours
3. send us an email
