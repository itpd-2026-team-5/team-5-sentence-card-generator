# Gap Analysis: Sentence Cards Generator

## Identified Gaps

### GAP-01

LLM-Generated Bilingual Sentences for Context

- **Status:** Active
- **Who needs it and what they cannot do:** Language learners need comprehensible input when studying.
  Having a sentence dynamically generated in both the target language and their known language provides exact context for a word, removing the tedious manual work of writing or translating example sentences by hand.
  The sentence should also fit the learner: at their level, built from words they already know, and on topics they care about, which the Customer raised at the kickoff (custom prompts for a topic, excluding words the learner does not want).
- **Evidence:** the P2 row of [the comparison](comparison.md), "Does the card give a sentence in both the known and the target language, produced by an LLM?": [ALT-03](alternatives.md#alt-03) has "No LLM" and "the example sentence is not translated"; for [ALT-01](alternatives.md#alt-01) it is "Not confirmed: whether the sentence or its translation is written by an LLM", and for [ALT-02](alternatives.md#alt-02) "Not confirmed: whether an LLM writes those example sentences".
  LinguaCafe (ALT-03) relies on static dictionaries (like DeepL) and only captures the original text sentence without translating it.
  Migaku (ALT-01) provides AI explanations of words, and Language Reactor (ALT-02) provides example sentences, but none offer explicitly LLM-generated bilingual sentence pairs mapped directly to flashcard fields for the user.
  None personalises the sentence either: Migaku and Language Reactor track which words a learner knows, and LinguaCafe tracks word levels, but none uses that, or the learner's level and interests, to choose the sentences the learner studies.
- **What closing it looks like:** Utilizing modern LLM APIs (like OpenAI or Anthropic) with strict system prompts can reliably generate a target sentence and its translation based on a selected word.
- **Buildable by us in this course:** Integrating an external LLM API call into a word-selection workflow is a well-scoped data-fetching task suitable for a single semester.
- **Confidence:** medium.
  ALT-03's "No LLM" comes from its documentation and code, but whether an LLM writes the sentences in ALT-01 and ALT-02 is "Not confirmed" in the comparison, and ALT-02 was tried only with Arabic.
- **Rests on:** [ASM-01](../assumptions.md#asm-01).
- **Changed:**
  - Always passes the sentence the word appeared in to the LLM, so the new sentence keeps the same meaning ([DEC-003](../decisions.md#dec-003)).
  - Learners who are technical write their own prompt, and the others answer a short questionnaire that writes it for them ([DEC-004](../decisions.md#dec-004)).

### GAP-02

Teacher-Learner Review Connection

- **Status:** Active
- **Who needs it and what they cannot do:** Language teachers or tutors need to monitor, review, and correct the custom Anki cards their students are generating to ensure they aren't memorizing incorrect grammar, hallucinations, or poor translations.
- **Evidence:** the P6 row of [the comparison](comparison.md), "Can a teacher connect to a learner and review their cards?", is "Not found" for all three: [ALT-01](alternatives.md#alt-01) "Checked: mobile app, home page, FAQ page, pricing page. Not checked: web version, help centre"; [ALT-02](alternatives.md#alt-02) "Checked: the reading, saved-words and practice screens. Not checked: the FAQ and help pages"; [ALT-03](alternatives.md#alt-03) "No teacher role or card sharing is documented".
  Migaku (ALT-01) and Language Reactor (ALT-02) are entirely single-player experiences with no teacher or sharing features.
  LinguaCafe (ALT-03) has an admin panel, but it is explicitly documented that multiple user features (including Anki export) are broken or unsupported, and there is no way for one user to review another's cards.
- **What closing it looks like:** It requires standard Role-Based Access Control (RBAC) associating a "learner" account with a "teacher" account, giving the teacher read/edit access to the learner's generated word queue.
- **Buildable by us in this course:** Building basic user roles and a shared database view is a standard CRUD application feature that a small team can easily implement.
- **Confidence:** medium.
  All three are "Not found" in P6, but the ALT-01 web version and help centre and the ALT-02 FAQ and help pages were not checked, so this is an absence in the parts we looked at; ALT-03's comes from its documentation, not an install.
- **Rests on:** [ASM-06](../assumptions.md#asm-06).

### GAP-03

Bulk Card Prioritization Queue

- **Status:** Active
- **Who needs it and what they cannot do:** Learners encounter hundreds of unknown words in a text but want to prioritize high-frequency or highly relevant words first, without having to edit the due dates or priority of cards one by one.
- **Evidence:** the P3 row of [the comparison](comparison.md), "Can the learner change which words get learned first without editing cards one by one?": [ALT-01](alternatives.md#alt-01) and [ALT-02](alternatives.md#alt-02) "Not observed: any control that sets which words are learned first"; [ALT-03](alternatives.md#alt-03) "Not found: a way to set which of the chosen words come up first in reviews".
  While Migaku allows bulk status changes and Language Reactor allows sorting by due date, neither offers a way to directly prioritize the learning queue.
  LinguaCafe's levels strictly follow the SRS schedule, not learner priority.
  None solve the problem of re-prioritizing cards flexibly.
- **What closing it looks like:** It requires adding a priority field to the database schema for saved words and building a UI (like drag-and-drop or a bulk numbering system) to update that field.
- **Buildable by us in this course:** Implementing a sortable queue and database update endpoints is low-complexity and highly feasible.
- **Confidence:** medium.
  P3 is "Not observed" or "Not found" for all three, but that is an absence, ALT-03's comes from its documentation, and ALT-03 can already limit a review to one book or chapter, which comes close.
- **Rests on:** [ASM-08](../assumptions.md#asm-08), [ASM-09](../assumptions.md#asm-09).
- **Changed:**
  - The app schedules reviews itself with an established algorithm such as FSRS, so the priority order reaches the review queue ([DEC-005](../decisions.md#dec-005)).
  - The learner sets the priority by choosing which decks to study, not by ordering texts ([DEC-007](../decisions.md#dec-007), [DEC-008](../decisions.md#dec-008)); [ASM-09](../assumptions.md#asm-09) is `Refuted`.

---

## Rejected Gaps

This is the list of gaps we considered but explicitly rejected, along with the rationale. This aligns expectations with the customer on what the product will *not* do.

### Rejected 1 (reversed at the kickoff): Built-in Spaced Repetition System (SRS)

- **The Concept:** Building our own review interface and algorithmic spaced-repetition scheduler directly into the app so users don't need Anki.
- **Why we first rejected it:** we expected that a small team could not build a reliable SRS alongside LLM generation and teacher review, and LinguaCafe (ALT-03) and Language Reactor (ALT-02) already have one.
- **Why it is no longer rejected:** at the kickoff on 2026-10-01 the Customer decided that the app schedules reviews itself with an established algorithm such as FSRS, the one Anki uses ([DEC-005](../decisions.md#dec-005); see also the Decisions in the kickoff meeting report, `reports/week-01/meeting-report.md`). Using an existing FSRS implementation instead of writing our own scheduler keeps it within a team of four, and it lets the learner's priorities (GAP-03) and "too hard" feedback reach the review order.

### Rejected 2: Video Subtitle and Audio Mining (YouTube/Netflix)

- **The Concept:** A tool that extracts vocabulary, screenshots, and native audio directly from streaming video platforms to create multimedia flashcards.
- **Why it was rejected (Fails the "Alternatives do not serve it" test):** Migaku (ALT-01) and Language Reactor (ALT-02) already excel at video/subtitle integration; trying to compete with their mature browser extensions is a losing battle. More importantly, our defined problem space specifically targets learners who build decks from **texts they choose** (reading). Video mining deviates completely from our core users and requirements. The Customer confirmed at the kickoff that plain text is enough ([DEC-001](../decisions.md#dec-001)).

### Rejected 3: Supporting All Global Languages

- **The Concept:** Allowing users to generate cards and use LLM features for any language in the world, rather than restricting it.
- **Why it was rejected (Fails the "Reachability" test):** Prompting an LLM to generate highly accurate sentences, translations, and pronunciations (like romanization or IPA) varies wildly in quality depending on the language. Guaranteeing accuracy across all languages is impossible to test. We must restrict our scope to the problem space's explicitly requested languages: Russian, English, and German.
