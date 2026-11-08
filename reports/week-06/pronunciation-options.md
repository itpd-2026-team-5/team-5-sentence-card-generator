# Week 6 pronunciation options

Prepared on 2026-11-08 for the [carried Week 5 action](../week-05/meeting-report.md#action-points) and [US-08](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/41).
This is a documentation comparison and a proposed validation procedure, not a listening test, a provider selection, or a Customer decision.

## Current implementation

The frontend's [speak function](../../frontend/src/api.ts) uses SpeechSynthesisUtterance with the requested language, checks a loaded voice list for that language, and calls the failure callback for an unavailable API/voice or synthesis error.
It does not select a named voice or export an audio file.
The [speaker control](../../frontend/src/components/Say.tsx), [study session](../../frontend/src/pages/Study.tsx), and [FR-010](../../docs/functional-requirements/fr/FR-010.md) define the current playback paths and global/session preference behavior.

## Comparison

| Option | Languages and consistency | Storage and reuse | Cost and operation |
| --- | --- | --- | --- |
| Browser Web Speech synthesis | Voice availability comes from the device/browser; enumerate voices for Russian, English, and German on each target device. Local and remote voices are possible. The current language-only choice does not establish a consistent named voice across devices. See the [Web Speech synthesis specification](https://webaudio.github.io/web-speech-api/). | The speech API plays utterances rather than returning a reusable audio file. The current implementation stores no recording and cannot share a generated file between users. | The product currently makes no separately billed TTS API call and operates no synthesis server. Device voice availability, remote-voice connectivity, and pronunciation still require checks. |
| Self-hosted Piper | The [voice catalog](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/VOICES.md) includes Russian, English, and German. Pinning a model, voice, and settings gives a common configuration across clients; it does not establish pronunciation quality without listening. | The [HTTP API](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/API_HTTP.md) returns WAV files, enabling an application-managed cache. Check the chosen voice's MODEL_CARD before deciding reuse. | The team would operate the synthesis service and pay for VM resources and storage rather than a metered cloud synthesis request. The [engine](https://github.com/OHF-Voice/piper1-gpl) is GPL-3.0, and voice terms differ; deployment resources and the exact voice terms remain to be assessed. |
| Google Cloud Text-to-Speech API | The [supported-voice list](https://docs.cloud.google.com/text-to-speech/docs/list-voices-and-types) includes Russian, English, and German. A configured voice avoids relying on each device's installed voices; it still needs the same listening check. | The API returns encoded audio that the application can store and play, subject to its terms, per the [synthesis basics](https://docs.cloud.google.com/text-to-speech/docs/basics). Storage location, cache access, retention, and cross-user reuse would be application decisions. | [Published pricing](https://cloud.google.com/text-to-speech/pricing), checked on 2026-11-08, lists Standard at USD 4 per million characters after its monthly free allowance of four million characters. Billing must be enabled; other cloud/storage charges are additional. Provider access and credentials from the deployment environment have not been tested. |

The consistency and operational conclusions above are engineering assessments from the documented interfaces and the current source, not measured rankings of voice quality or latency.

## Proposed playback and failure checks

1. Use the same two synthetic sentences per language, including German nouns/articles, Russian stress-sensitive words, and English punctuation. Record the engine, exact voice/model, settings, browser/device, and whether synthesis is local or remote.
2. Have a proficient listener for each language record pronunciation errors and whether each sentence is understandable without reading it. Keep observations per sentence rather than declaring a winner from provider descriptions.
3. Exercise the word, meaning, sentence, and translation speaker controls in learner study and teacher views; verify that each uses its own language, following FR-010 AC-01 and AC-03.
4. Run the global-default and session-override/reset cases in FR-010 AC-02, AC-04, AC-05, and AC-06. A setting change must not change card content or study progress.
5. Test an unavailable browser API, a missing language voice after the voice list loads, a synthesis/network failure, and rapid cancellation/replay. Record whether feedback is visible, a later retry succeeds, and intentional cancellation avoids a misleading error. These are proposed checks; no new failure criterion is marked accepted here.
6. For a server/API candidate, record synthesis duration, output size, request count, cache hits, and the actual billed amount where applicable. Compare repeated playback of the same sentence with a new synthesis; do not substitute a price estimate for a measured bill or claim an unmeasured latency target.
7. If audio storage is chosen, invalidate cached output when text/language/voice/settings change. Test authorization separately from cache identity: identical text must not expose an unshared card. Keep learner text, generated audio, private endpoints, and credentials out of public evidence.

## Recommendation for the focused review

Retain the current browser implementation while these checks establish whether device variation prevents FR-010 from being met.
If it does, compare one pinned Piper voice per language with one configured API voice using the same samples before proposing a change.
The Customer's source/storage/reuse choice, actual listening results, resource measurements, and a deployment-network check remain outstanding; none is inferred from this comparison.
