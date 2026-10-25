# Quality Requirements

How well the Sentence Cards Generator must do what it does, each as an ISO/IEC 25010:2023 pair and a quality attribute scenario in its own file under [`qr/`](qr/).
This table is the priority matrix: active requirements first, then by business importance, then by technical risk.
Business importance is the value of the outcome to the Customer; technical risk is how hard the outcome is to achieve and to test.

| QR | Outcome | Business importance | Technical risk | Characteristic | Sub-characteristic | Status |
| --- | --- | --- | --- | --- | --- | --- |
| [QR-03](qr/QR-03.md) | At least 80% of the cards generated for a learner's marked words can be kept without editing or rewriting, in each supported language. | High | High | Functional Suitability | Functional Correctness | Active |
| [QR-01](qr/QR-01.md) | A teacher can read and correct only explicitly shared decks, while learner, teacher, and service API keys remain confidential between those parties. | High | Medium | Security | Confidentiality | Active |
| [QR-02](qr/QR-02.md) | A developer runs the checks that cover the card generation, the review scheduler, and the frontend entry point from a clean checkout, without an LLM key, and a change that breaks one of them fails the checks. | High | Medium | Maintainability | Testability | Active |
| [QR-06](qr/QR-06.md) | A learner or teacher completes their main card workflow on a phone without zooming or scrolling sideways. | High | Medium | Interaction Capability | Operability | Active |
| [QR-07](qr/QR-07.md) | Committed texts, word selections, decks, cards, sharing permissions, and study progress survive a service shutdown and restart without database corruption. | High | Medium | Reliability | Recoverability | Active |
| [QR-04](qr/QR-04.md) | Cards for five marked words appear within 60 seconds of the learner pressing generate. | Medium | Medium | Performance Efficiency | Time Behaviour | Active |
| [QR-08](qr/QR-08.md) | An operator can install and run the core workflow on a Linux virtual machine using the documented prerequisites and configuration. | Medium | Medium | Flexibility | Installability | Active |
| [QR-09](qr/QR-09.md) | The learner sees a warning when 30% or more of the cards in a generation batch require regeneration. | Medium | Medium | Reliability | Fault Tolerance | Active |
| [QR-05](qr/QR-05.md) | When the LLM provider fails or answers with something that is not cards, the learner sees a message, no broken card is saved, and the marked words stay marked for a retry. | Medium | Low | Reliability | Fault Tolerance | Active |
