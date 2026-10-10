# Kickoff meeting report

## Metadata

**Date:** 2026-10-01  
**Duration:** 28 minutes  
**Attended:** saleemasekrea000, Byakko-san, KaramKhaddour, Horokk1, Customer  
**Presented:** the project choice, our reading of the problem  
**Recording:** permitted, linked from the Week 01 Moodle submission  
**Transcript publication:** permitted, see [the transcript](meeting-transcript.md)  
**Transcript shared privately:** not applicable  
**Script:** [meeting-script.md](meeting-script.md)

## Summary

- Cards carry new sentences that the LLM writes around each word the learner picked, not sentences copied from the source text. The word's original sentence is always passed as context so the LLM uses the right meaning, and the sentences have a roughly fixed length so a study session's length is predictable.
- Input is plain text that the learner pastes or uploads. Specific media such as YouTube or Netflix transcripts are out of scope for now, and so is entering single words without a text.
- The Customer named two features as the most important by the end of the course: a card editor (mark bad cards for removal or regeneration, edit sentences, reorder words, request audio), used by both learner and teacher, and a word picker for marking the words to learn and the words to ignore in a text.
- The teacher reviews the decks a student shares with them and has the final say on which sentences stay, because in songs2anki many LLM sentences were bad and had to be removed by hand.
- It is a web app for Firefox and Chrome. A Python backend fits, because the lemmatization libraries the Customer used in songs2anki are in Python.

## Decisions

| Decision | Made by | Traces to |
| --- | --- | --- |
| Accept plain text as the input for now, not transcripts from particular media such as YouTube or Netflix | Customer | [`VP-04`](../../docs/research/value-proposition.md#vp-04-retired) (retired), [rejected video mining](../../docs/research/gap-analysis.md#rejected-2-video-subtitle-and-audio-mining-youtubenetflix) |
| Build a web app for Firefox and Chrome; Safari is not needed, and a mobile app is a later idea | Customer | None |
| Always give the LLM the sentence the word appeared in as context, so the generated sentence uses the same meaning | Customer | [`GAP-01`](../../docs/research/gap-analysis.md#gap-01-llm-generated-bilingual-sentences-for-context), [`VP-01`](../../docs/research/value-proposition.md#vp-01-sentences-written-for-this-learner) |
| Let technical users write their own prompt, and give other users a short questionnaire (profession, study goals) that produces the prompt for them | KaramKhaddour, Customer | [`GAP-01`](../../docs/research/gap-analysis.md#gap-01-llm-generated-bilingual-sentences-for-context), [`VP-01`](../../docs/research/value-proposition.md#vp-01-sentences-written-for-this-learner) |
| Schedule reviews with an established spaced-repetition algorithm, such as FSRS used by Anki | Customer | [`GAP-03`](../../docs/research/gap-analysis.md#gap-03-bulk-card-prioritization-queue), [`VP-02`](../../docs/research/value-proposition.md#vp-02-the-words-you-chose-come-up-first) |
| Use React for the frontend and Python with FastAPI for the backend | KaramKhaddour proposed, Customer agreed | None |

## Action points

| Action | Owner | Due |
| --- | --- | --- |
| Create a Telegram group for the project and send an invite link to the Customer | KaramKhaddour | 2026-10-01 |

## Open questions

| Question | What it would change | Follow-up |
| --- | --- | --- |
| How do we determine the user's language proficiency level? | It will allow the system to adapt the vocabulary and complexity of the generated sentences to the student's knowledge | KaramKhaddour |
| Should we use a questionnaire to generate custom LLM prompts for non-technical users? | It would allow the system to tailor sentence topics (e.g., IT or Data Science) based on the user's profession without requiring them to write custom prompts manually | KaramKhaddour |

## Disagreements

| Your position | Customer's position | What you changed |
| --- | --- | --- |
| The application could focus heavily on extracting transcripts from specific media platforms like YouTube or Netflix, similar to competitors | The focus should be on general texts, leaving it up to the user to decide where to search for texts, because there are too many kinds of media to focus on just one | We will accept plain text from any source instead of building around one media platform, and we dropped VP-04 (a readiness score for a YouTube video the learner chose) from the value proposition |
| The application should support two user input paths: uploading text to choose a word from it, and uploading a single word directly | Uploading a single word removes the necessary context, which could lead the LLM to generate sentences using the wrong meaning of the word | We dropped the single-word path: the learner always uploads a text, so every word comes with the sentence it appeared in |
