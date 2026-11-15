# UT-01 Surveys

These are the questions every counted participant of [UT-01](README.md) answers, in the order the [protocol](README.md#protocol) gives.
The answers are recorded on the session's paper or form copy, which goes to the private usability-data repository; no answer is written in this file.
No question asks for a name, an email address, a phone number, or anything else that identifies the participant.

## Survey language

The English SEQ question, its seven-point scale, the ten English SUS items, their five-point scale, and the scoring formula below remain unchanged for every session.
Following [DEC-145](../../decisions.md#dec-145), a Russian-speaking teammate may ask the pre-test and open-ended post-test in Russian using the corresponding wording below; record the interview language and the teammate's GitHub username in the private session sheet.
The participant still needs to understand the fixed English interface, task cards, and unchanged SEQ/SUS items; conversational English fluency and knowledge of the English words for card or deck are not eligibility tests.
Read the standard SEQ/SUS wording as written and allow time to answer; do not invent a translation or explain an item differently for one participant.
If a participant needs a translated standardized questionnaire, prepare and agree one common version before counted sessions; until then, that language arrangement is not ready for a counted session.

## Pre-test

Asked after the consent and before the first task.

1. Are you 18 or older? (Yes / No; a participant who answers No does not take part.)
2. What do you mainly do: study, work, or something else?
3. Which language will you practise in this session, Russian or German? How long have you been learning it, and what level would you say you are at: A1, A2, B1, or higher?
4. How do you usually learn new words, for example from texts, lists, apps, or classes?
5. Which flashcard or vocabulary apps have you used, if any, and how often? None is an eligible answer; prior Anki experience is not required.
6. What do you understand by a study card and a deck? It is fine not to know these terms or to explain them in Russian; record the answer without teaching the concepts before the tasks.
7. Have you used this product before? (Yes / No; a participant who answers Yes is outside the profile and the session is exploratory.)
8. Can you comfortably read the English interface, task cards, and standard questionnaire items used in this session? (Yes / No)
9. Would you prefer the pre-test and open-ended interview in English or Russian? Russian is available when a Russian-speaking teammate can conduct it.
10. Which device do you usually study on: a laptop, a phone, a tablet, or something else?
11. What do you expect a tool that makes study cards from your own texts to do for you?

The recruitment and screening changes follow [DEC-143](../../decisions.md#dec-143) and [DEC-144](../../decisions.md#dec-144).
Confirm eligibility against the [participant profile](README.md#participant-profile); language level and familiarity are recorded, and lack of flashcard experience alone never excludes someone.

### Russian wording for the pre-test

Use these questions in the same order for a Russian-language interview; apply the eligibility rules above unchanged.

1. Вам уже исполнилось 18 лет?
2. Чем вы в основном занимаетесь: учитесь, работаете или чем-то другим?
3. Какой язык вы будете практиковать на этой встрече: русский или немецкий? Как давно вы его изучаете и как оцениваете свой уровень: A1, A2, B1 или выше?
4. Как вы обычно учите новые слова: по текстам, спискам, в приложениях, на занятиях или иначе?
5. Какими приложениями для карточек или изучения слов вы пользовались и как часто? Если никакими, так и скажите.
6. Что вы понимаете под учебной карточкой и колодой? Можно не знать этих терминов или объяснить своими словами по-русски.
7. Вы уже пользовались этим приложением?
8. Вам удобно читать английский интерфейс, задания и стандартные вопросы анкет, которые используются на этой встрече?
9. На каком языке вам удобнее отвечать на предварительные вопросы и вопросы после заданий: на английском или русском?
10. На каком устройстве вы обычно занимаетесь: на ноутбуке, телефоне, планшете или другом?
11. Чего вы ожидаете от приложения, которое создаёт учебные карточки по вашим текстам?

## SEQ after each task

Asked once after each of the three tasks, before the next scenario is read.

Overall, how difficult or easy was the task to complete?

| 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- |
| Very difficult | | | | | | Very easy |

A higher score is easier.

## SUS after all the tasks

Asked once after the last task's SEQ.
For each statement, choose one answer from 1, strongly disagree, to 5, strongly agree.

1. I think that I would like to use this system frequently.
2. I found the system unnecessarily complex.
3. I thought the system was easy to use.
4. I think that I would need the support of a technical person to be able to use this system.
5. I found the various functions in this system were well integrated.
6. I thought there was too much inconsistency in this system.
7. I would imagine that most people would learn to use this system very quickly.
8. I found the system very cumbersome to use.
9. I felt very confident using the system.
10. I needed to learn a lot of things before I could get going with this system.

| Strongly disagree | Disagree | Neutral | Agree | Strongly agree |
| --- | --- | --- | --- | --- |
| 1 | 2 | 3 | 4 | 5 |

### Scoring

`SUS = 2.5 × (20 + sum(odd) - sum(even))`

The odd items are 1, 3, 5, 7, and 9, and the even items are 2, 4, 6, 8, and 10.
The formula uses the responses as recorded, from 1 to 5; the even items are not reverse-coded before it, because subtracting their sum already reverses them.
The score runs from 0 to 100.
A participant who skips an item has no SUS score, and the missing answer is never filled in.

## Open-ended post-test

Asked after the SUS, following [DEC-147](../../decisions.md#dec-147).

1. What was your overall impression of making and studying cards with this product?
2. Which parts felt intuitive, and which were difficult to understand?
3. Was there a moment when you got stuck or were unsure what to do next? What happened?
4. What would you change to make those parts easier?
5. What did we not ask that we should have?

### Russian wording for the post-test

1. Какое у вас общее впечатление от создания карточек и занятий с ними в этом приложении?
2. Что было понятным и интуитивным, а в чём было трудно разобраться?
3. Был ли момент, когда вы застряли или не понимали, что делать дальше? Что произошло?
4. Что бы вы изменили, чтобы пользоваться этими частями приложения было проще?
5. О чём мы не спросили, хотя стоило бы?
