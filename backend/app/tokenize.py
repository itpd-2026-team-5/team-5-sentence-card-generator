"""Split a text into sentences and words, for Russian, English, and German."""

import re

# A sentence ends at . ! ? or …, optionally followed by closing quotes or brackets.
_SENTENCE_END = re.compile(r"(?<=[.!?…])[»”“’\"')\]]*\s+|\n+")
# Letters of any script, with inner hyphens or apostrophes ("well-known", "don't").
_WORD = re.compile(r"[^\W\d_]+(?:[-'’][^\W\d_]+)*")


def split_sentences(text: str) -> list[str]:
    sentences, start = [], 0
    for match in _SENTENCE_END.finditer(text):
        # Keep the closing quotes with the sentence; drop only the whitespace.
        end = match.start() + len(match.group().rstrip())
        sentences.append(text[start:end])
        start = match.end()
    sentences.append(text[start:])
    return [s.strip() for s in sentences if s.strip()]


def split_words(sentence: str) -> list[str]:
    return _WORD.findall(sentence)


def tokenize(text: str) -> list[dict]:
    """Return the text as sentences. Each has its words, and every token in order, so a reader
    can show the sentence exactly as written and make only the words clickable."""
    sentences = []
    for sentence in split_sentences(text):
        tokens, position = [], 0
        for match in _WORD.finditer(sentence):
            if match.start() > position:
                tokens.append({"text": sentence[position : match.start()], "word": False})
            tokens.append({"text": match.group(), "word": True})
            position = match.end()
        if position < len(sentence):
            tokens.append({"text": sentence[position:], "word": False})
        words = [t["text"] for t in tokens if t["word"]]
        sentences.append({"text": sentence, "words": words, "tokens": tokens})
    return sentences


def find_sentences(text: str, word: str) -> list[str]:
    """The sentences of a text that contain a word, ignoring case; a word typed in its
    dictionary form also finds forms that start with it ("Koffer" finds "Koffern")."""
    key = word.strip().lower()
    if not key:
        return []
    return [
        s for s in split_sentences(text) if any(w.lower().startswith(key) for w in split_words(s))
    ]


def context_for(text: str, sentence: str, around: int = 1) -> str:
    """The sentence with up to `around` neighbours on each side, so the meaning is clear.
    A sentence that is no longer in the text (it was edited) is returned on its own."""
    sentences = split_sentences(text)
    if sentence not in sentences:
        return sentence
    index = sentences.index(sentence)
    return " ".join(sentences[max(index - around, 0) : index + around + 1])
