# Decisions

## DEC-001

Accept plain text as the input for now, not transcripts from particular media such as YouTube or Netflix.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** there are too many kinds of media to focus on just one, so the learner decides where to find texts and the product takes plain text from any source.

## DEC-002

Build a web app for Firefox and Chrome; Safari is not needed, and a mobile app is a later idea.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** a web app is enough for now, and the Customer asked for Firefox and Chrome; a mobile app, so that students can rehearse offline, is a later idea.

## DEC-003

Always give the LLM the sentence the word appeared in as context, so the generated sentence uses the same meaning.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** a word on its own removes the context, and the LLM may then write a sentence with the wrong meaning of the word.

## DEC-004

Let technical users write their own prompt, and give other users a short questionnaire (profession, study goals) that produces the prompt for them.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** KaramKhaddour, Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** technical users want control over the prompt, while other users should get sentences on their own topics without writing a prompt.

## DEC-005

Schedule reviews with an established spaced-repetition algorithm, such as FSRS used by Anki.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** the Customer wants the scheduling Anki uses today, maybe FSRS, rather than a scheduler of our own.

## DEC-006

Use React for the frontend and Python with FastAPI for the backend.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** KaramKhaddour proposed, Customer agreed
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** the lemmatization libraries the Customer used in songs2anki are in Python, the team has members who work in Python, and React suits a web application.
