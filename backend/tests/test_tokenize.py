from app.tokenize import tokenize


def test_splits_sentences_and_words_in_three_languages():
    text = "Ich träume oft. Он сказал: «Привет!» It's well-known."
    sentences = tokenize(text)
    assert [s["text"] for s in sentences] == [
        "Ich träume oft.",
        "Он сказал: «Привет!»",
        "It's well-known.",
    ]
    assert sentences[0]["words"] == ["Ich", "träume", "oft"]
    assert sentences[1]["words"] == ["Он", "сказал", "Привет"]
    assert sentences[2]["words"] == ["It's", "well-known"]


def test_german_quotes_end_a_sentence_and_punctuation_is_kept():
    text = "Sie sagte: „Ja, das stimmt.“ Niemand wollte reden."
    sentences = tokenize(text)
    assert [s["text"] for s in sentences] == [
        "Sie sagte: „Ja, das stimmt.“",
        "Niemand wollte reden.",
    ]
    first = sentences[0]
    assert first["words"] == ["Sie", "sagte", "Ja", "das", "stimmt"]
    # Putting the tokens back together gives the sentence exactly as written.
    assert "".join(t["text"] for t in first["tokens"]) == first["text"]
    assert [t["text"] for t in first["tokens"] if not t["word"]] == [" ", ": „", ", ", " ", ".“"]
