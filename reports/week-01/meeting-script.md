# Kickoff meeting script

## Context

Our problem-space sentence: language learners who study with Anki, and the teachers who guide them, want to turn the words they pick from texts they chose into sentence cards with a translation and pronunciation, and to learn those words first, without rebuilding their Anki collection by hand.

We believe the core of the product is GAP-01: going from a learner's own text to finished cards in one pass (VP-01).
We believe prioritising chosen words (VP-02) comes next, and that teacher review (VP-03) is the most expensive and the least certain.
We also propose a readiness score for a YouTube video the learner chose (VP-04), which goes beyond the catalog's uploaded texts.
We have dropped rich media cards from video, our own spaced-repetition system, and video recommendations.

This meeting has to settle which of VP-01 to VP-04 the course version is built around, whether the cards must live in Anki, and whether video is in scope.

Questions marked ★ would change the project most if the answer went against us; ask them even if time runs short.

## Questions

**Business goals**

1. _(open)_ What made you build songs2anki, and what did you do with the decks it produced?
2. _(open)_ When this product works, what is different about the way you or your students study?

**End users**

3. _(open)_ Who used songs2anki or a similar workflow most recently: you, a student, or a teacher? ★
4. _(closed)_ Are the learner and the person who prepares the cards usually the same person?

**Current workflow**

5. _(open)_ Walk us through the last time you added sentences from a text to an Anki deck, step by step. ★
6. _(open)_ The last time you wanted particular words to come up first, what did you do in Anki?
7. _(open)_ The last time you or a student tried to watch a video in the language you were learning, what happened?

**Pain points and constraints**

8. _(open)_ What was the most tedious part of that last time?
9. _(closed)_ Must the cards end up in Anki, or is a separate study app acceptable? ★
10. _(closed)_ Must it run on a VPS or locally without a paid LLM API?

**Scope**

11. _(open)_ If only one of these four directions shipped by December, which would you keep, and why?
12. _(closed)_ Is the teacher review in or out for this course?
13. _(closed)_ Is a YouTube video an acceptable source, alongside uploaded texts?

## Roles

TODO-username asks, TODO-username takes notes, TODO-username observes and records what we did not ask and what was not said.
The fourth member, TODO-username, presents the gaps and value propositions after question 8, so that questions 1 to 8 are answered before the Customer hears our direction.

## Key improvements

**"Would you like the app to prioritise words for you?" → question 6: "The last time you wanted particular words to come up first, what did you do in Anki?"**

The original offered our own solution and invited a polite yes.
The rewrite asks about a past event, so the answer describes what the Customer actually does today, which tells us whether VP-02 solves a real problem.

**"Would teachers use a feature to review student cards?" → question 3: "Who used songs2anki or a similar workflow most recently: you, a student, or a teacher?"**

The original asked for a prediction about other people's future behaviour, which nobody can answer reliably.
The rewrite asks who actually used the workflow, so the answer tells us whether teachers are real users of it or an assumption.

**"Is translation quality important to you?" → question 8: "What was the most tedious part of that last time?"**

The original asked about an abstract quality, and everyone says yes to it.
The rewrite lets the Customer name the pain without us suggesting it, so if translation is the problem, they will say so unprompted.

**"Would you like the app to recommend YouTube videos you are ready for?" → question 7: "The last time you or a student tried to watch a video in the language you were learning, what happened?"**

The original pitched VP-04 and asked the Customer to approve it.
The rewrite asks what happened last time, so we hear whether getting lost in a video is a real problem before we present our answer to it.
