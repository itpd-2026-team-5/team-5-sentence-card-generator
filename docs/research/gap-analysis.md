# Gap Analysis: Sentence Cards Generator

## Identified Gaps

### GAP-01: LLM-Generated Bilingual Sentences for Context

* **Somebody needs it:** Language learners need comprehensible input when studying. Having a sentence dynamically generated in both the target language and their known language provides exact context for a word, removing the tedious manual work of writing or translating example sentences by hand. The sentence should also fit the learner: at their level, built from words they already know, and on topics they care about, which the Customer raised at the kickoff (custom prompts for a topic, excluding words the learner does not want).
* **The alternatives do not serve it:** LinguaCafe (ALT-03) relies on static dictionaries (like DeepL) and only captures the original text sentence without translating it. Migaku (ALT-01) provides AI explanations of words, and Language Reactor (ALT-02) provides example sentences, but none offer explicitly LLM-generated bilingual sentence pairs mapped directly to flashcard fields for the user. None personalises the sentence either: Migaku and Language Reactor track which words a learner knows, and LinguaCafe tracks word levels, but none uses that, or the learner's level and interests, to choose the sentences the learner studies.
* **It is reachable:** Utilizing modern LLM APIs (like OpenAI or Anthropic) with strict system prompts can reliably generate a target sentence and its translation based on a selected word.
* **A team of 3 or 4 could build it in this course:** Integrating an external LLM API call into a word-selection workflow is a well-scoped data-fetching task suitable for a single semester.
* **Rests on:** [ASM-01](../assumptions.md#asm-01).
* **Changed:**
  * Always passes the sentence the word appeared in to the LLM, so the new sentence keeps the same meaning ([DEC-003](../decisions.md#dec-003)).
  * Learners who are technical write their own prompt, and the others answer a short questionnaire that writes it for them ([DEC-004](../decisions.md#dec-004)).

### GAP-02: Teacher-Learner Review Connection

* **Somebody needs it:** Language teachers or tutors need to monitor, review, and correct the custom Anki cards their students are generating to ensure they aren't memorizing incorrect grammar, hallucinations, or poor translations.
* **The alternatives do not serve it:** Migaku (ALT-01) and Language Reactor (ALT-02) are entirely single-player experiences with no teacher or sharing features. LinguaCafe (ALT-03) has an admin panel, but it is explicitly documented that multiple user features (including Anki export) are broken or unsupported, and there is no way for one user to review another's cards.
* **It is reachable:** It requires standard Role-Based Access Control (RBAC) associating a "learner" account with a "teacher" account, giving the teacher read/edit access to the learner's generated word queue.
* **A team of 3 or 4 could build it in this course:** Building basic user roles and a shared database view is a standard CRUD application feature that a small team can easily implement.
* **Rests on:** [ASM-06](../assumptions.md#asm-06).

### GAP-03: Bulk Card Prioritization Queue

* **Somebody needs it:** Learners encounter hundreds of unknown words in a text but want to prioritize high-frequency or highly relevant words first, without having to edit the due dates or priority of cards one by one.
* **The alternatives do not serve it:** While Migaku allows bulk status changes and Language Reactor allows sorting by due date, neither offers a way to directly prioritize the learning queue. LinguaCafe's levels strictly follow the SRS schedule, not learner priority. None solve the problem of re-prioritizing cards flexibly.
* **It is reachable:** It requires adding a priority field to the database schema for saved words and building a UI (like drag-and-drop or a bulk numbering system) to update that field.
* **A team of 3 or 4 could build it in this course:** Implementing a sortable queue and database update endpoints is low-complexity and highly feasible.
* **Rests on:** [ASM-08](../assumptions.md#asm-08), [ASM-09](../assumptions.md#asm-09).
* **Changed:**
  * The app schedules reviews itself with an established algorithm such as FSRS, so the priority order reaches the review queue ([DEC-005](../decisions.md#dec-005)).

---

## Rejected Gaps

This is the list of gaps we considered but explicitly rejected, along with the rationale. This aligns expectations with the customer on what the product will *not* do.

### Rejected 1 (reversed at the kickoff): Built-in Spaced Repetition System (SRS)

* **The Concept:** Building our own review interface and algorithmic spaced-repetition scheduler directly into the app so users don't need Anki.
* **Why we first rejected it:** we expected that a small team could not build a reliable SRS alongside LLM generation and teacher review, and LinguaCafe (ALT-03) and Language Reactor (ALT-02) already have one.
* **Why it is no longer rejected:** at the kickoff on 2026-10-01 the Customer decided that the app schedules reviews itself with an established algorithm such as FSRS, the one Anki uses ([DEC-005](../decisions.md#dec-005); see also the Decisions in the kickoff meeting report, `reports/week-01/meeting-report.md`). Using an existing FSRS implementation instead of writing our own scheduler keeps it within a team of four, and it lets the learner's priorities (GAP-03) and "too hard" feedback reach the review order.

### Rejected 2: Video Subtitle and Audio Mining (YouTube/Netflix)

* **The Concept:** A tool that extracts vocabulary, screenshots, and native audio directly from streaming video platforms to create multimedia flashcards.
* **Why it was rejected (Fails the "Alternatives do not serve it" test):** Migaku (ALT-01) and Language Reactor (ALT-02) already excel at video/subtitle integration; trying to compete with their mature browser extensions is a losing battle. More importantly, our defined problem space specifically targets learners who build decks from **texts they choose** (reading). Video mining deviates completely from our core users and requirements. The Customer confirmed at the kickoff that plain text is enough ([DEC-001](../decisions.md#dec-001)).

### Rejected 3: Supporting All Global Languages

* **The Concept:** Allowing users to generate cards and use LLM features for any language in the world, rather than restricting it.
* **Why it was rejected (Fails the "Reachability" test):** Prompting an LLM to generate highly accurate sentences, translations, and pronunciations (like romanization or IPA) varies wildly in quality depending on the language. Guaranteeing accuracy across all languages is impossible to test. We must restrict our scope to the problem space's explicitly requested languages: Russian, English, and German.
