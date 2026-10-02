# Gap Analysis: Sentence Cards Generator

## Identified Gaps

### GAP-01: LLM-Generated Bilingual Sentences for Context
* **Somebody needs it:** Language learners need comprehensible input when studying. Having a sentence dynamically generated in both the target language and their known language provides exact context for a word, removing the tedious manual work of writing or translating example sentences by hand.
* **The alternatives do not serve it:** LinguaCafe (ALT-03) relies on static dictionaries (like DeepL) and only captures the original text sentence without translating it. Migaku (ALT-01) provides AI explanations of words, and Language Reactor (ALT-02) provides example sentences, but none offer explicitly LLM-generated bilingual sentence pairs mapped directly to flashcard fields for the user.
* **It is reachable:** Utilizing modern LLM APIs (like OpenAI or Anthropic) with strict system prompts can reliably generate a target sentence and its translation based on a selected word.
* **A team of 3 or 4 could build it in this course:** Integrating an external LLM API call into a word-selection workflow is a well-scoped data-fetching task suitable for a single semester.

### GAP-02: Teacher-Learner Review Connection
* **Somebody needs it:** Language teachers or tutors need to monitor, review, and correct the custom Anki cards their students are generating to ensure they aren't memorizing incorrect grammar, hallucinations, or poor translations.
* **The alternatives do not serve it:** Migaku (ALT-01) and Language Reactor (ALT-02) are entirely single-player experiences with no teacher or sharing features. LinguaCafe (ALT-03) has an admin panel, but it is explicitly documented that multiple user features (including Anki export) are broken or unsupported, and there is no way for one user to review another's cards.
* **It is reachable:** It requires standard Role-Based Access Control (RBAC) associating a "learner" account with a "teacher" account, giving the teacher read/edit access to the learner's generated word queue.
* **A team of 3 or 4 could build it in this course:** Building basic user roles and a shared database view is a standard CRUD application feature that a small team can easily implement.

### GAP-03: Bulk Card Prioritization Queue
* **Somebody needs it:** Learners encounter hundreds of unknown words in a text but want to prioritize high-frequency or highly relevant words first, without having to edit the due dates or priority of cards one by one.
* **The alternatives do not serve it:** While Migaku allows bulk status changes and Language Reactor allows sorting by due date, neither offers a way to directly prioritize the learning queue. LinguaCafe's levels strictly follow the SRS schedule, not learner priority. None solve the problem of re-prioritizing cards flexibly.
* **It is reachable:** It requires adding a priority field to the database schema for saved words and building a UI (like drag-and-drop or a bulk numbering system) to update that field.
* **A team of 3 or 4 could build it in this course:** Implementing a sortable queue and database update endpoints is low-complexity and highly feasible.

---

## Rejected Gaps

This is the list of gaps we considered but explicitly rejected, along with the rationale. This aligns expectations with the customer on what the product will *not* do.

### Rejected 1: Built-in Spaced Repetition System (SRS)
* **The Concept:** Building our own review interface and algorithmic spaced-repetition scheduler (like the Leitner system or SM-2) directly into the app so users don't need Anki.
* **Why it was rejected (Fails the "Team of 3 or 4" test):** Our problem space is centered on *card generation* and *teacher review*. Building a robust, bug-free SRS review platform with offline sync takes massive engineering effort. A small student team cannot build a high-quality SRS while also building LLM generation and teacher portals in one course. Furthermore, LinguaCafe (ALT-03) and Language Reactor (ALT-02) already attempt this. We will focus purely on generating the data and exporting it to Anki.

### Rejected 2: Video Subtitle and Audio Mining (YouTube/Netflix)
* **The Concept:** A tool that extracts vocabulary, screenshots, and native audio directly from streaming video platforms to create multimedia flashcards.
* **Why it was rejected (Fails the "Alternatives do not serve it" test):** Migaku (ALT-01) and Language Reactor (ALT-02) already excel at video/subtitle integration; trying to compete with their mature browser extensions is a losing battle. More importantly, our defined problem space specifically targets learners who build decks from **texts they choose** (reading). Video mining deviates completely from our core users and requirements.

### Rejected 3: Supporting All Global Languages
* **The Concept:** Allowing users to generate cards and use LLM features for any language in the world, rather than restricting it.
* **Why it was rejected (Fails the "Reachability" test):** Prompting an LLM to generate highly accurate sentences, translations, and pronunciations (like romanization or IPA) varies wildly in quality depending on the language. Guaranteeing accuracy across all languages is impossible to test. We must restrict our scope to the problem space's explicitly requested languages: Russian, English, and German.
