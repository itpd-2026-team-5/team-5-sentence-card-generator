# Week 4 Customer Validation Transcript

- **Date:** 2026-10-24.
- **Participants:** Customer, KaramKhaddour, Byakko-san, Horokk1, saleemasekrea000.

[00:00:00] KaramKhaddour: Thank you.
[00:00:04] KaramKhaddour: Today we will go through the project.
[00:00:07] KaramKhaddour: The biggest difference from last week is that I integrated a real LLM, so the generated cards are real.
[00:00:20] KaramKhaddour: I will need to ask you some questions about the acceptance criteria for some user stories so we can close them.
[00:00:30] KaramKhaddour: Let's get started.
[00:00:34] KaramKhaddour: Where would you like to start, in Settings?
[00:00:37] KaramKhaddour: I'll start right here, on Today, the page for learning.
[00:00:57] KaramKhaddour: If you want to learn your cards, you come here.
[00:01:04] KaramKhaddour: Here you choose which text you want to learn from.
[00:01:11] KaramKhaddour: When you study, you first see the German word and sentence, since you are studying German.
[00:01:22] KaramKhaddour: As we discussed last week, in German the article is part of the word.
[00:01:29] KaramKhaddour: We are making the LLM mark the word rather than marking it in code.
[00:01:41] KaramKhaddour: When we translate, here we have the English translation of the word and the English translation of the sentence, and then we can choose its difficulty.
[00:02:00] KaramKhaddour: We can also rewrite the sentence immediately or mark it to rewrite later.
[00:02:15] KaramKhaddour: Let's see.
[00:02:16] KaramKhaddour: If we choose to rewrite the sentence, we rewrite it directly using the LLM.
[00:02:24] KaramKhaddour: It's taking a little time.
[00:02:32] KaramKhaddour: I need to figure out why [inaudible].
[00:02:41] KaramKhaddour: Now we have a new sentence for the word, and we can mark it to rewrite later.
[00:02:47] KaramKhaddour: Rewrite later is a flag that marks this card in the table.
[00:02:54] KaramKhaddour: In the future, if we want to rewrite it, it is easier to see that we marked it to rewrite later.
[00:03:03] KaramKhaddour: We can also listen to it.
[00:03:08] KaramKhaddour: We can click and listen to the word—or rather, the sentence—and mark the difficulty.
[00:03:14] KaramKhaddour: I think that's all for studying a card.
[00:03:19] KaramKhaddour: Too hard still works as before.
[00:03:20] KaramKhaddour: If you choose Too hard, you ignore this sentence.
[00:03:25] KaramKhaddour: We can create a new deck.
[00:03:30] KaramKhaddour: Creating one is similar to before: we have a name and description, but we also have this new setting.
[00:03:39] KaramKhaddour: We choose the difficulty level for each deck.
[00:03:42] KaramKhaddour: We discussed this last week: my level in Settings might differ because someone else uses my account, or for some other reason I want a specific level for this deck.
[00:03:57] KaramKhaddour: We can choose it here.
[00:03:59] KaramKhaddour: Then we have these instructions.
[00:04:04] KaramKhaddour: The instructions are sent to the LLM to generate the cards, and we have limits for each deck.
[00:04:13] KaramKhaddour: For example, we can generate only 10 a day for this one and review 200.
[00:04:23] KaramKhaddour: Inside a deck, we can study all the cards unless we mark them as Too hard, in which case they are archived.
[00:04:40] KaramKhaddour: For example, I archived this one, so it is not here.
[00:04:45] KaramKhaddour: We have a flag for the teacher if we want, and a flag to rewrite.
[00:05:04] KaramKhaddour: Then there is Failed check.
[00:05:05] KaramKhaddour: We have three checks: the number of words in the sentence, the number of characters, and whether the LLM can generate a correct sentence based on our conditions.
[00:05:05] KaramKhaddour: If it cannot, the check fails.
[00:05:32] KaramKhaddour: For now, if the LLM cannot generate the sentence after three attempts, we stop.
[00:05:43] KaramKhaddour: Is three attempts okay, or should it be a different number?
[00:05:50] Customer: I think that's enough.
[00:05:53] Customer: What is the interval between these attempts?
[00:05:57] KaramKhaddour: It's immediate: when we receive a failure, we resend the request.
[00:06:06] Customer: If you couldn't generate a sentence, you move it to Failed check.
[00:06:13] Customer: I mean, if you couldn't generate sentences satisfying the conditions, it moves to Failed check.
[00:06:21] KaramKhaddour: Yes, for example, the conditions might allow too few characters, so the LLM cannot generate anything, or there might be some other unreasonable conditions.
[00:06:34] KaramKhaddour: Inside a card in this deck, we can see the sentence in German, the sentence in English, the word in German, and the word in English.
[00:06:47] KaramKhaddour: We can save changes.
[00:06:49] KaramKhaddour: We can see where the word comes from.
[00:06:51] KaramKhaddour: This is from the text, and here we have a link to the text.
[00:06:59] KaramKhaddour: That's the sentence containing this word.
[00:07:04] KaramKhaddour: We can see which text has this card, and if we want to regenerate it, we can enter what was wrong and the instructions, then rewrite it using the LLM.
[00:07:21] KaramKhaddour: We can generate one card or any number we want, and we can also ask a teacher.
[00:07:30] KaramKhaddour: We can add a note for the teacher, archive the card, or delete it permanently.
[00:07:42] Customer: So now we have a teacher, right?
[00:07:45] KaramKhaddour: Yes, but to have a teacher, we need to put their email here for the deck.
[00:07:56] KaramKhaddour: One second.
[00:08:04] KaramKhaddour: When we switch to the teacher, I will use their credentials.
[00:08:04] KaramKhaddour: Here we have Texts.
[00:08:19] KaramKhaddour: When we add a new text, we can enter the text and title, or get the text from a file on our system.
[00:08:19] KaramKhaddour: Here we can put where the text comes from online, such as a link to an article or journal, and add notes if we want.
[00:08:49] KaramKhaddour: Inside a text, it is similar to the old design: we choose which words to learn, then generate the sentences.
[00:09:09] Customer: How does it know how many sentences to generate?
[00:09:14] KaramKhaddour: For now, it generates one sentence per word.
[00:09:19] Customer: If you have two occurrences of the same word in different sentences, what happens?
[00:09:32] KaramKhaddour: And you choose both of them?
[00:09:35] Customer: Yes.
[00:09:37] KaramKhaddour: Then you generate one word and one sentence for each occurrence.
[00:09:42] Customer: Okay.
[00:09:45] Customer: Is there any duplication?
[00:09:52] KaramKhaddour: Do you mean whether we are duplicating the sentence?
[00:09:59] Customer: Yes, I think we agreed to use the sentence as part of the identifier, right?
[00:10:11] Customer: If the sentences are the same, do you check this?
[00:10:18] KaramKhaddour: I am not sure.
[00:10:25] KaramKhaddour: Do you mean if the same word appears twice in the text, and the sentences are also the same?
[00:10:34] Customer: Yes.
[00:10:35] KaramKhaddour: The generated sentences are the same, right?
[00:10:41] KaramKhaddour: Or the original sentences?
[00:10:42] Customer: No, only one card should be generated.
[00:10:52] Customer: A word plus its sentence is an identifier.
[00:10:59] Customer: If you have the same word in two sentences, and the sentences are the same, you don't need to generate two cards.
[00:11:10] Customer: These cards would have the same identifier, so generating one card is enough.
[00:11:22] Customer: It is an edge case: it is very rare to have two identical sentences.
[00:11:32] Customer: A more frequent case might be a word appearing twice in the same sentence.
[00:11:42] Customer: I think some logic should handle this.
[00:11:48] Customer: Okay, nice.
[00:11:49] KaramKhaddour: Okay, I will add this check.
[00:11:52] KaramKhaddour: I think we are now unable to reach the Claude API.
[00:11:59] KaramKhaddour: I'm not sure whether we can reach it because I don't have the VPN, because of GitHub.
[00:12:06] KaramKhaddour: Logically, we should not be able to reach it because it is outside the VPN, right?
[00:12:09] KaramKhaddour: Or was it reached?
[00:12:14] KaramKhaddour: Now we have the sentences we generated here, such as Berlin and this word that I have no idea how to pronounce: Anschluss.
[00:12:35] KaramKhaddour: That's all for Texts.
[00:12:37] KaramKhaddour: For teaching, I'll switch to a teacher account in a little while.
[00:12:44] KaramKhaddour: Then we have Settings, where we choose the languages: what I speak and what I want to learn.
[00:12:50] KaramKhaddour: We can also choose more languages.
[00:12:55] KaramKhaddour: For example, I am learning German, and I can also add Russian.
[00:13:01] KaramKhaddour: When I add Russian, I have it here.
[00:13:05] KaramKhaddour: For now, I only support German and Russian.
[00:13:10] KaramKhaddour: There is a difficulty level for each one and a placement test we found online for each one.
[00:13:19] KaramKhaddour: Is this placement test enough for now, or do we need to integrate it with the platform?
[00:13:29] Customer: Sorry, could you please repeat the question?
[00:13:31] KaramKhaddour: Is it okay for now to have the placement test online on a different platform?
[00:13:38] KaramKhaddour: Or is our platform required to provide the test so the user takes it inside this platform?
[00:13:52] Customer: I think it is okay not to implement this on your site.
[00:14:01] Customer: It's a good feature, but I don't think you have enough expertise to build a test.
[00:14:13] Customer: Moreover, I'm not sure we can trust a test generated by an LLM, and I'm not sure we can legally use an existing test.
[00:14:27] Customer: Let's not build it for now.
[00:14:33] KaramKhaddour: Then we choose the sentence length, from five to whatever we want, from shortest to longest, and also in characters.
[00:14:45] Customer: I have one question about the placement test, though.
[00:14:47] Customer: Could you please scroll?
[00:14:50] Customer: I see German and Russian here.
[00:14:55] Customer: What if the person studies or knows more languages?
[00:15:05] KaramKhaddour: What if they speak more than one language?
[00:15:09] Customer: Yes.
[00:15:12] KaramKhaddour: For example, when you speak English and Russian and want to learn German, right?
[00:15:20] Customer: Yes, for example.
[00:15:23] KaramKhaddour: In this case, we are currently using English as the platform language.
[00:15:41] KaramKhaddour: That should be different, right?
[00:15:43] KaramKhaddour: We should have one section for the application language, and then another for what languages [inaudible].
[00:15:57] Customer: I got the first part.
[00:15:59] Customer: The interface language setting should be separate from the next settings because the person may choose any available language for the interface.
[00:16:15] Customer: Maybe they want to practice German.
[00:16:19] Customer: Okay, but then, could you please [inaudible]?
[00:16:28] Customer: Sorry, can I ask you again?
[00:16:30] Customer: Can you repeat?
[00:16:34] Customer: The interface is a separate setting, and then we need a level for each language.
[00:16:42] Customer: Maybe we assume a set of languages that the platform supports for decks, not for the interface.
[00:16:56] Customer: Let's have German, Russian, and English, and then the user can select their level for each language.
[00:17:07] Customer: One option is to add another section for English here, in the card showing your level in each language.
[00:17:23] Customer: Another option is to change the UI a bit, perhaps making a table instead of these sections.
[00:17:35] Customer: This might be more scalable later if we add support for more languages, such as 10.
[00:17:46] Customer: The links to placement tests should still be preserved.
[00:17:58] Customer: I'm not sure what “for new decks” means here.
[00:18:04] Customer: To the right of German, what does it mean?
[00:18:12] KaramKhaddour: If you change something, we do not change anything you have already generated.
[00:18:20] KaramKhaddour: We will use this information for the cards you generate.
[00:18:24] Customer: Got it.
[00:18:30] Customer: There is a phrase at the end: “A deck can use a different level of its own.”
[00:18:35] Customer: Maybe this should be moved to the top of the card to clarify what is going on.
[00:18:44] Customer: Some additional description could help explain what will be affected when you choose the level.
[00:19:05] Customer: Okay.
[00:19:07] KaramKhaddour: Now there are limits and sound settings.
[00:19:07] KaramKhaddour: What is your default: do you want it to play automatically, or play it yourself?
[00:19:22] Customer: Okay, it's a global setting?
[00:19:26] KaramKhaddour: Yes.
[00:19:26] Customer: You can also switch it during study with the speaker button.
[00:19:31] KaramKhaddour: Yes, you can stop it with the speaker button if you want.
[00:19:39] KaramKhaddour: Who writes the sentence: the service, or your own key?
[00:19:44] KaramKhaddour: Here there is a bit of a problem.
[00:19:50] KaramKhaddour: If it is your own key, we have no cost, but if it is the service, we have a cost.
[00:20:01] KaramKhaddour: How could we handle this cost problem?
[00:20:08] KaramKhaddour: Who should pay?
[00:20:12] Customer: I didn't quite get the question.
[00:20:17] Customer: Which cost do you mean, the cost of the LLM?
[00:20:21] KaramKhaddour: Let's say the user chooses the service here, so the service's LLM API token is used.
[00:20:32] KaramKhaddour: Should we charge this user for the cost of the LLM?
[00:20:40] Customer: There should probably be a subscription for the whole service, including this API key, maybe with some limit, for example $5 or $10 per month.
[00:21:03] KaramKhaddour: Should we implement this for the next version?
[00:21:13] Customer: I think it would be better implemented in the next version, after this project, as a Could Have feature.
[00:21:27] Customer: That's the idea: you don't pay specifically for the key provided by the service.
[00:21:47] Customer: Okay, My own key.
[00:21:50] Customer: There you have one provider.
[00:21:55] Customer: One second.
[00:21:57] Customer: Yes, sure.
[00:22:00] KaramKhaddour: You can enter anything.
[00:22:07] Customer: Mm-hmm.
[00:22:09] Customer: Which providers can it accept?
[00:22:18] KaramKhaddour: For now, we have [inaudible], or OpenAI, or anything compatible with [inaudible].
[00:22:28] Customer: Okay.
[00:22:29] KaramKhaddour: We save the key only in your browser.
[00:22:39] KaramKhaddour: We are not using it, and we are not saving the key in our database.
[00:22:44] Customer: I think it's called something different, not “address,” but I forgot: “base URL” or something like that.
[00:23:04] Customer: Mm-hmm.
[00:23:06] Customer: Or “chat completions.”
[00:23:09] Customer: I forgot what it is called, but there is a name for this endpoint where you can make requests to an OpenAI-compatible API.
[00:23:28] Customer: It would be better to use that name instead of “address” to give a better idea of what the input should be.
[00:23:39] Customer: Mm-hmm.
[00:23:42] Customer: Okay.
[00:23:44] Customer: It might also be nice to check that this endpoint is reachable after it is entered here.
[00:24:05] Customer: Okay.
[00:24:07] Customer: Get the list of models from this endpoint.
[00:24:15] Customer: The model should be obtained somehow by the user.
[00:24:20] Customer: It's okay.
[00:24:22] Customer: And the API key, that's right.
[00:24:28] Customer: What happens when you enter the API key?
[00:24:32] Customer: How does it look?
[00:24:36] KaramKhaddour: It's like a password.
[00:24:39] Customer: Okay, so it's not visible to me.
[00:24:43] Customer: To anyone else?
[00:24:45] KaramKhaddour: No.
[00:24:47] KaramKhaddour: Now I have some statistics.
[00:24:56] Customer: Okay, 31 cards.
[00:24:58] Customer: What does that mean?
[00:25:02] KaramKhaddour: 31 cards generated.
[00:25:04] Customer: Generated, okay.
[00:25:07] Customer: 28 kept as written.
[00:25:10] Customer: So they are not [inaudible].
[00:25:13] Customer: Mm-hmm.
[00:25:14] KaramKhaddour: This is edited by hand, and this is rewritten by the LLM, archived, or deleted.
[00:25:23] KaramKhaddour: These are the tokens you have used, and this number is taken from the provider.
[00:25:32] KaramKhaddour: It is not calculated by us.
[00:25:34] Customer: Okay, “rewritten one time.”
[00:25:39] Customer: What does it mean?
[00:25:44] KaramKhaddour: I think the card was rewritten one time.
[00:25:49] KaramKhaddour: We can rewrite the same card multiple times.
[00:25:53] KaramKhaddour: Let's check.
[00:25:58] Customer: It is written by an LLM, not by hand, right?
[00:26:04] KaramKhaddour: Yes, it's written by the LLM.
[00:26:10] Customer: Maybe call it “regenerated,” and then “kept as generated,” to show the connection between those numbers.
[00:26:32] Customer: “Edited by hand” and “regenerated” could be swapped so that the statistics about generated cards are near each other.
[00:26:54] Customer: Okay, and the account, [redacted].
[00:27:01] Customer: You can save changes, good.
[00:27:05] KaramKhaddour: Yes, Save changes only appears when you change something.
[00:27:09] KaramKhaddour: If you don't change anything, [inaudible].
[00:27:12] Customer: Mm-hmm.
[00:27:14] Customer: Okay, nice.
[00:27:17] KaramKhaddour: Do you want to review anything here?
[00:27:19] KaramKhaddour: Or maybe you can sign out and sign in to the teaching account?
[00:27:27] Customer: Let's review Today.
[00:27:31] Customer: Sign-in and sign-out should also be checked because I couldn't sign in when I tried.
[00:27:38] Customer: Mm-hmm.
[00:27:39] Customer: Not this version, but an older one.
[00:27:47] Customer: Okay, Today we study.
[00:27:53] Customer: Choose one or several decks.
[00:27:58] Customer: I think this phrase should be rewritten: “Choose one or several decks.”
[00:28:09] Customer: Travel by train, At work, and Cooking are selected.
[00:28:15] Customer: Zero to review.
[00:28:22] Customer: Why is it zero to review?
[00:28:24] Customer: Are no cards due today?
[00:28:29] KaramKhaddour: Because I haven't studied anything yet, so they are still new.
[00:28:37] Customer: Okay, zero.
[00:28:43] Customer: What are they called in Anki?
[00:28:49] Customer: Is “review” an intuitive word to explain that the card should be reviewed, meaning that it was studied before?
[00:29:05] Customer: Mm-hmm.
[00:29:07] Customer: I think Anki also uses “review.”
[00:29:12] Customer: Let's keep it.
[00:29:16] Customer: Two new, zero to review.
[00:29:22] Customer: Anki also has [inaudible].
[00:29:28] Customer: If you leave mid-session, what happens?
[00:29:36] Customer: Let's study.
[00:29:43] Customer: Flip the card.
[00:29:46] Customer: Okay, this is a disabled sound button in the top-right corner, right?
[00:29:52] Customer: Okay.
[00:29:54] Customer: Great, okay.
[00:30:00] Customer: Diverting from the topic of reviews, I think the sound button on the card should be near each important part.
[00:30:14] Customer: I should be able to listen to just the German word, just the English word, just the sentence in German, or just the sentence in English.
[00:30:27] Customer: I think there should be four sound buttons.
[00:30:32] KaramKhaddour: But maybe four buttons would not look good, right?
[00:30:34] KaramKhaddour: Maybe we should make it so that clicking the sentence or word lets you listen to it.
[00:30:45] Customer: That might work as well, but then they should look like buttons so I know I can click them.
[00:30:58] Customer: I'm not sure, or they could be like [inaudible].
[00:31:11] Customer: If they look like buttons, I may click them or I may not.
[00:31:18] Customer: If I am not a very curious person, I may not click.
[00:31:24] Customer: Maybe a speaker icon should also be provided on that button so I know I can listen when I click it.
[00:31:43] Customer: I'm not sure which UI is better, or whether a button without an icon would be intuitive enough.
[00:31:53] Customer: I suggest trying both options, perhaps drawing a design and seeing which works better in your opinion, so we have more opinions than just mine.
[00:32:13] Customer: Maybe ask someone outside the team as well.
[00:32:21] Customer: Coming back to reviews.
[00:32:26] Customer: I have 18, 0, and 3 at the top.
[00:32:33] Customer: 18 is new.
[00:32:37] Customer: New in this session, right?
[00:32:41] KaramKhaddour: Yes.
[00:32:41] Customer: Or is it for review?
[00:32:45] KaramKhaddour: New cards.
[00:32:48] KaramKhaddour: They have never been studied before.
[00:32:52] Customer: Okay.
[00:32:56] Customer: On the Today screen, are they blue or green?
[00:33:03] Customer: Those are new cards.
[00:33:06] KaramKhaddour: They are blue.
[00:33:09] Customer: They are blue.
[00:33:12] Customer: Bluish, I don't know.
[00:33:14] KaramKhaddour: Yes.
[00:33:15] Customer: Okay.
[00:33:17] Customer: Anki has them green.
[00:33:20] Customer: That might be more familiar to Anki users.
[00:33:27] Customer: Cards for review are blue.
[00:33:31] Customer: I suggest swapping the colors here.
[00:33:35] Customer: Maybe use brighter colors, like true green and true blue, so the difference is more apparent.
[00:33:52] Customer: The contrast between those colors would be higher.
[00:33:59] Customer: Okay, and 3 is yellow here.
[00:34:03] Customer: I guess 3 is something you marked as Again or Hard.
[00:34:11] Customer: Is it?
[00:34:14] Customer: If I leave the session right now, what do I see on the Today screen?
[00:34:30] Customer: I see 3 reviews left, 18 new left, 1 review done, and 0 new studied.
[00:34:41] Customer: They have some colors, and I'm not sure what they mean.
[00:34:49] KaramKhaddour: Here, you haven't studied it yet.
[00:34:53] KaramKhaddour: You need to go here and choose a difficulty level.
[00:34:59] Customer: If you click Again, do I see something on the Today screen?
[00:34:59] Customer: Will it appear in the 3 reviews left, or where will it appear?
[00:35:19] KaramKhaddour: Let's say you go here and choose Easy.
[00:35:23] Customer: Okay.
[00:35:25] KaramKhaddour: Yes, 2 reviews left.
[00:35:32] Customer: Okay, 18 new left.
[00:35:34] Customer: What if you choose Again?
[00:35:39] KaramKhaddour: You are starting from this word, you see.
[00:35:43] KaramKhaddour: Let's try a couple so the numbers are clear.
[00:35:49] KaramKhaddour: Now it says study 17 words, not 20.
[00:35:53] Customer: Uh-huh.
[00:35:54] KaramKhaddour: And 1 new studied.
[00:35:58] KaramKhaddour: One new word studied.
[00:36:01] KaramKhaddour: And 3 reviews are done.
[00:36:03] KaramKhaddour: I think this is complicated.
[00:36:08] KaramKhaddour: It's not very clear what each one does.
[00:36:12] KaramKhaddour: We need something better; maybe we should not have everything.
[00:36:19] KaramKhaddour: We should only show what is new and what is not new, and that's it.
[00:36:30] KaramKhaddour: We should not have all this information.
[00:36:32] Customer: Do you have Anki on desktop or mobile?
[00:36:38] KaramKhaddour: No, I used it a very long time ago, maybe five years ago, but not anymore.
[00:36:48] Customer: Okay, I think I can send a screenshot.
[00:36:57] Customer: This Today screen is a bit complicated.
[00:37:04] Customer: I think the statistics and Study button could move to the top of this card because, with lots of decks to study, you have to scroll to reach the Study button.
[00:37:37] Customer: In Anki, you don't do that.
[00:37:43] Customer: You just click a deck and then you can study.
[00:37:48] Customer: Here, you study multiple decks at once.
[00:37:53] Customer: I think the Study button should be somewhere at the top, or the list should be scrollable so that, even with hundreds of decks, you can scroll through them while the button stays in the same place.
[00:38:16] Customer: Regarding screenshots, I'll show what Anki shows.
[00:38:49] Customer: Okay.
[00:39:01] Customer: Hopefully, Telegram works.
[00:39:06] Customer: I sent a screenshot to the chat.
[00:39:09] Customer: Okay.
[00:39:13] KaramKhaddour: Okay.
[00:39:14] KaramKhaddour: You learn, and that's it.
[00:39:17] Customer: Okay.
[00:39:22] Customer: Basically, they have a table.
[00:39:33] Customer: I showed only one row.
[00:39:35] Customer: I should have sent two or three rows, but the idea is that they have New, Learning, and Due instead of your labels, New and To review.
[00:39:55] Customer: In your case, I think you could have a total row showing the statistics.
[00:40:11] Customer: Sorry, did I disconnect?
[00:40:23] KaramKhaddour: No.
[00:40:23] Customer: Can you hear me?
[00:40:24] Customer: Yes, we can hear you.
[00:40:26] Customer: Great.
[00:40:27] Customer: I think it is not completely clear what this progress bar shows.
[00:40:36] Customer: Maybe it would be better to clarify it.
[00:40:39] Customer: Maybe put it above Study or somewhere at the top, and put all the decks in their own section, such as Decks to study or Available decks.
[00:41:04] Customer: Logically separate the parts in this [inaudible].
[00:41:20] Customer: You selected several decks.
[00:41:24] Customer: What happens to this progress when you deselect a deck?
[00:41:28] Customer: For example, deselect Cooking.
[00:41:32] Customer: Okay.
[00:41:35] Customer: Nice.
[00:41:37] Customer: In which order do you study?
[00:41:42] Customer: Can I study?
[00:41:46] KaramKhaddour: Do you mean the cards?
[00:41:48] Customer: Yes.
[00:41:49] KaramKhaddour: I'm not sure, but I think from the top down.
[00:42:03] Customer: Where did the word come from?
[00:42:06] Customer: Does it show the deck?
[00:42:08] KaramKhaddour: No, it only shows the text.
[00:42:12] Customer: Okay.
[00:42:13] Customer: Then we can tell from here which deck this belongs to.
[00:42:23] Customer: If I want to study cards from a specific deck in a specific order, I should just select the deck with those cards and study them, right?
[00:42:39] Customer: First, just from one deck, for example.
[00:42:43] KaramKhaddour: Maybe we should add a Study button on the deck page.
[00:42:50] KaramKhaddour: Then you can study just one deck from there.
[00:42:55] Customer: Sorry, I didn't get it.
[00:42:59] KaramKhaddour: Here, we should add something like Study, and you study just this deck.
[00:43:10] Customer: Okay.
[00:43:12] Customer: Maybe we could just support reordering decks on the Today page.
[00:43:25] Customer: Then I can reorder them, select the decks I want to study, and study just those.
[00:43:38] Customer: All right.
[00:43:46] KaramKhaddour: Okay.
[00:43:53] Customer: Now let's proceed to Decks.
[00:44:01] Customer: Here, eight plus one archived.
[00:44:04] Customer: What does it mean?
[00:44:10] Customer: Eight cards and one archived.
[00:44:13] Customer: Okay.
[00:44:21] Customer: Eight is not very obvious.
[00:44:24] Customer: Maybe there could be a word, such as “eight active plus one archived,” if you want to show this.
[00:44:38] Customer: [inaudible]
[00:44:43] Customer: And Teacher, there are two asked.
[00:44:49] Customer: What does it mean?
[00:44:51] KaramKhaddour: When you add a teacher to a deck, you can mark each card to ask the teacher to check it.
[00:45:07] KaramKhaddour: You ask the teacher to check this card, and you can add notes about the card for the teacher.
[00:45:16] Customer: You selected three cards.
[00:45:22] Customer: Then I should see Asked three or Three asked.
[00:45:27] Customer: Could you please show it?
[00:45:29] Customer: Okay, three asked.
[00:45:31] Customer: I don't know.
[00:45:38] Customer: Maybe a column should be created if you want to show this.
[00:45:55] Customer: Okay.
[00:45:59] Customer: I don't know what to call this column, perhaps For teacher's review.
[00:46:08] Customer: Or Review.
[00:46:17] Customer: Teacher, no teacher.
[00:46:21] Customer: Languages, German from English.
[00:46:26] Customer: What does it mean?
[00:46:30] Customer: Here, Languages, German from English.
[00:46:40] KaramKhaddour: What you are learning, translated from which language.
[00:46:50] Customer: Got it.
[00:46:54] KaramKhaddour: German from English means you are learning German and using English to learn German.
[00:47:01] KaramKhaddour: Okay.
[00:47:03] Customer: This is confusing.
[00:47:07] Customer: I think there should be two separate columns, such as Know and Study, with the languages.
[00:47:19] Customer: Okay.
[00:47:20] Customer: Oh no, I don't see the screen anymore.
[00:48:29] Customer: Can you hear us?
[00:48:31] Customer: Yes.
[00:48:33] Customer: I've just noticed that we are nearing 2 PM.
[00:48:40] Customer: You probably had plans for this meeting, but I distracted you by giving feedback.
[00:48:49] Customer: If you would like to proceed with your plan, we can do that.
[00:48:55] Customer: I can give you feedback later.
[00:48:59] KaramKhaddour: Okay, maybe let's just show you the teacher side.
[00:49:03] Customer: Okay.
[00:49:04] KaramKhaddour: Because this has never been done.
[00:49:09] KaramKhaddour: If you are a teacher, you go to Teaching and see that [redacted] sent you this deck.
[00:49:59] KaramKhaddour: You see the word, its meaning, the sentence, its translation, and what was wrong, and you can rewrite it using an LLM or write it yourself.
[00:50:21] KaramKhaddour: You can listen to it.
[00:50:23] KaramKhaddour: You can mark it.
[00:50:26] KaramKhaddour: You can mark it as answered, and your changes are directly applied to the student's deck.
[00:50:37] Customer: Immediately?
[00:50:40] KaramKhaddour: Yes.
[00:50:41] Customer: Uh-huh.
[00:50:44] KaramKhaddour: That's basically it.
[00:50:47] Customer: Okay.
[00:50:53] Customer: I'm not sure they should be applied immediately.
[00:50:57] Customer: At least the answer.
[00:51:03] Customer: Maybe there should be a Save changes button, like you had in Settings.
[00:51:16] Customer: Answered.
[00:51:17] Customer: Why did the comment disappear immediately?
[00:51:21] KaramKhaddour: It's like if I have a question and I acknowledge your question.
[00:51:31] Customer: Uh-huh.
[00:51:33] Customer: What if I want to restore your question?
[00:51:42] Customer: Maybe I did something and forgot the question.
[00:51:50] Customer: I got distracted.
[00:51:51] Customer: I forgot the question, but marked it as answered.
[00:51:56] Customer: Maybe this button could behave differently.
[00:52:04] Customer: For example, when you click Answered, the text is just crossed out.
[00:52:12] Customer: It doesn't disappear, so I don't forget exactly what I addressed and can review my work later.
[00:52:19] Customer: After Answered is clicked, the button becomes Reopen, for example.
[00:52:31] KaramKhaddour: Yes.
[00:52:32] Customer: Or Restore question.
[00:52:34] Customer: I don't know.
[00:52:36] Customer: Unanswered, or some other name.
[00:52:41] Customer: After clicking it, the original note is no longer crossed out.
[00:52:51] Customer: It is just as it is now.
[00:52:55] Customer: After I click Save changes, the final state is applied.
[00:53:04] Customer: If it was crossed out, meaning answered, then it may disappear.
[00:53:13] Customer: Because it was really answered and saved.
[00:53:16] Customer: Otherwise, it does not.
[00:53:21] Customer: What do you think?
[00:53:28] Customer: Okay.
[00:53:28] KaramKhaddour: I think when you mark it as answered, it would be better for this color to be a little lighter.
[00:53:44] KaramKhaddour: Then it is different from [inaudible], and the Answer button [inaudible].
[00:54:00] KaramKhaddour: Okay.
[00:54:02] KaramKhaddour: I think maybe I should remove this [inaudible].
[00:54:07] KaramKhaddour: This is answered.
[00:54:08] KaramKhaddour: We could keep the student note, and when the teacher clicks Looks right, we remove the student's request for the teacher to check this specific card.
[00:54:26] KaramKhaddour: The student wants the teacher to see it.
[00:54:29] KaramKhaddour: When they click that it is correct, that means the teacher has seen it, and that should be enough.
[00:54:38] KaramKhaddour: We don't remove the note; it is just an acknowledgment that I saw it.
[00:54:44] KaramKhaddour: That's enough.
[00:54:50] Customer: This might be an even better option.
[00:54:55] Customer: They acknowledged that they saw it.
[00:55:04] Customer: We'll keep them.
[00:55:06] Customer: Do they need this button to track progress on cards, or is the approval button enough?
[00:55:18] KaramKhaddour: Progress in what sense?
[00:55:21] Customer: Okay, let's keep it.
[00:55:24] Customer: I agree with your idea.
[00:55:26] Customer: Let's do it like this.
[00:55:28] Customer: The comment stays; maybe when the button is clicked, it becomes faded or crossed out.
[00:55:39] Customer: Something that indicates it was addressed.
[00:55:43] Customer: So it is possible to visually distinguish comments that were addressed from those that were not.
[00:55:55] Customer: The teacher can see which comments were not addressed by looking at this column with check marks, but a visual hint might help.
[00:56:13] Customer: There was something violet on the left side.
[00:56:19] Customer: Was that highlighting for cards that needed review?
[00:56:32] Customer: Like a chat, or what was that?
[00:56:40] KaramKhaddour: The cards you haven't marked as checked yet.
[00:56:43] Customer: Okay.
[00:56:45] Customer: Now I don't see any violet highlighting on the left.
[00:56:51] KaramKhaddour: The highlighting was for cards with a student note.
[00:56:57] KaramKhaddour: Okay, got it.
[00:56:59] KaramKhaddour: I have already checked every card that has a student note.
[00:57:05] Customer: That was a bit confusing.
[00:57:07] Customer: Maybe highlighting should not be about the student's note, but about this check mark.
[00:57:16] Customer: Or it should not exist at all.
[00:57:25] Customer: No highlighting is needed.
[00:57:30] Customer: As we discussed, the teacher can review any cards.
[00:57:38] Customer: But the student may ask for some cards to be reviewed.
[00:57:47] Customer: Right now, you rely on their comment, a student note, right?
[00:57:54] Customer: What if they don't leave a note?
[00:57:57] Customer: What if they just ask for review?
[00:58:12] KaramKhaddour: I think it will appear like any other card in the deck.
[00:58:19] Customer: But I think we agreed that they should go to the top of the list so the teacher checks them first.
[00:58:30] Customer: The student is most concerned about this card, for example.
[00:58:37] Customer: We have to highlight them somehow.
[00:58:41] Customer: Either add a marker on the right with the icons, or highlight the rows that need to be reviewed first.
[00:59:00] Customer: I don't know how to present it, but could you please think about options?
[00:59:08] Customer: Yes.
[00:59:08] KaramKhaddour: Yes.
[00:59:10] KaramKhaddour: Maybe we could use a different border color when it is assigned to the teacher.
[00:59:20] KaramKhaddour: The border here should be different.
[00:59:22] Customer: Yes.
[00:59:23] Customer: Maybe explain to the teacher what this color means.
[00:59:34] Customer: The buttons on the right.
[00:59:39] Customer: I see the speaker button.
[00:59:40] Customer: What does it do?
[00:59:47] KaramKhaddour: It runs when I click it.
[00:59:56] Customer: When you click it, what does it do?
[01:00:00] KaramKhaddour: It's a sentence in German.
[01:00:02] Customer: Okay.
[01:00:11] Customer: That's useful.
[01:00:12] Customer: The teacher can listen to the sentence because maybe the sound is bad.
[01:00:22] Customer: Maybe the sound should be regenerated later.
[01:00:27] Customer: But I think it is not completely intuitive.
[01:00:31] KaramKhaddour: The sound is not generated.
[01:00:34] KaramKhaddour: The sound comes from the operating system and browser.
[01:00:40] KaramKhaddour: There is a library inside the browser that pronounces different languages.
[01:00:52] KaramKhaddour: If you have Firefox and I have Chrome, for example, the sound is different between them.
[01:01:00] KaramKhaddour: Maybe not the browser.
[01:01:02] Customer: Yes.
[01:01:03] KaramKhaddour: It is not generated by an LLM and stored in another database.
[01:01:11] Customer: That is a bit of a problem because I have a deck where a speaker of [inaudible] recorded pronunciations of words.
[01:01:27] Customer: I store them as separate files.
[01:01:31] Customer: Sometimes you don't have good enough TTS, or the text-to-speech engines available now are not the best quality.
[01:01:43] Customer: They are good, but not the best quality.
[01:01:45] Customer: Maybe you want to use something else.
[01:01:49] Customer: It would be nice to have an option to store actual pronunciation files after they are generated.
[01:02:01] Customer: It may also help later.
[01:02:08] Customer: First, it would guarantee that users can listen to good pronunciation of words.
[01:02:22] Customer: Second, you can reuse pronunciation for the same cards between users.
[01:02:33] Customer: You just provide them with the same files.
[01:02:37] KaramKhaddour: Okay, but where should the sound be generated?
[01:02:45] KaramKhaddour: I don't know.
[01:02:46] KaramKhaddour: We need to look at the options, right?
[01:02:49] KaramKhaddour: What options do we have?
[01:02:51] Customer: I think a text-to-speech model could run near the backend.
[01:03:04] Customer: Another option is to use an API.
[01:03:08] Customer: It depends on which options work better.
[01:03:15] Customer: If a local model works well for these languages, it would probably be cheaper to use that model.
[01:03:29] Customer: Otherwise, a provider could be used.
[01:03:41] Customer: The teacher should be able to listen to the pronunciation of everything, just as the student can listen to everything on the card.
[01:04:00] Customer: The teacher may want to mark the card as bad because of its pronunciation.
[01:04:13] Customer: The pronunciation should then be regenerated, for example.
[01:04:22] Customer: Maybe add four buttons below the elements.
[01:04:29] Customer: The word in German, the word in English, the sentence in German, and the sentence in English.
[01:04:35] Customer: I think there is some space.
[01:04:43] Customer: Done.
[01:04:44] Customer: The next button, the check mark.
[01:04:47] Customer: This looks intuitive.
[01:04:50] Customer: Archive also.
[01:04:53] Customer: The trash bin too.
[01:04:57] Customer: Maybe it would help to provide a legend for those buttons above the table, explaining exactly what they do.
[01:05:09] Customer: So the teacher does not get confused.
[01:05:15] Customer: The Rewrite button could become an icon to take less space.
[01:05:27] Customer: Otherwise, it looks pretty good.
[01:05:33] Customer: What happens if the teacher opens this on mobile?
[01:05:39] Customer: Should we even consider this?
[01:05:42] Customer: Not sure.
[01:05:47] Customer: They can still scroll.
[01:05:54] KaramKhaddour: A better option would be to click a card and see the details of that card alone.
[01:06:04] KaramKhaddour: Moving around on a mobile phone is not good.
[01:06:12] Customer: Agreed.
[01:06:18] Customer: Please think about what can be done.
[01:06:24] Customer: I think that's it for Teaching.
[01:06:34] Customer: The teacher is also a user, so they have Decks and Today.
[01:06:44] Customer: I think that's reasonable.
[01:06:52] Customer: On the student side, I think we only haven't reviewed Texts.
[01:07:00] Customer: Could you please open Texts?
[01:07:02] Customer: No texts yet.
[01:07:06] Customer: Or maybe switch accounts.
[01:07:41] Customer: The texts are here.
[01:07:46] Customer: You can move the text.
[01:07:56] Customer: Maybe drag and drop would work better.
[01:08:00] Customer: So it is supported.
[01:08:03] Customer: It is not completely obvious that it exists.
[01:08:06] Customer: Maybe add a marker on the left.
[01:08:10] Customer: I think there is a standard marker indicating that you can move elements up and down.
[01:08:26] Customer: [inaudible] to learn, three cards.
[01:08:33] Customer: What do these statistics show?
[01:08:47] Customer: Two to learn, three cards.
[01:08:54] KaramKhaddour: Ah.
[01:08:56] Customer: Selected.
[01:08:59] Customer: Okay.
[01:09:00] Customer: How many cards were generated from them?
[01:09:04] KaramKhaddour: Yes.
[01:09:06] KaramKhaddour: Here, this word has the same meaning, and it is a similar word.
[01:09:12] KaramKhaddour: So you only generated one card.
[01:09:14] KaramKhaddour: But you told us that we need to [inaudible].
[01:09:21] Customer: Sorry?
[01:09:23] KaramKhaddour: This word, Bank.
[01:09:27] Customer: Uh-huh.
[01:09:28] KaramKhaddour: We generated only one card for both because they have similar meanings.
[01:09:39] KaramKhaddour: They are the same word with the same meaning.
[01:09:41] KaramKhaddour: So we generated only one card.
[01:09:43] Customer: But in this case, that is not right because they have different meanings.
[01:09:52] Customer: The first sentence is like, “I sit on a Bank in a park.”
[01:09:59] Customer: The second sentence is, “I go to the bank and take my money.”
[01:10:06] Customer: There should be a sentence for each of them.
[01:10:14] KaramKhaddour: So...
[01:10:14] Customer: I mean a card for each of them.
[01:10:17] KaramKhaddour: Yes.
[01:10:18] KaramKhaddour: Because these are similar words.
[01:10:25] Customer: Uh-huh.
[01:10:30] Customer: There were two to learn and three cards, or two cards, on the screen.
[01:10:47] Customer: Two words to learn.
[01:10:50] KaramKhaddour: Three cards.
[01:10:51] KaramKhaddour: I understood it incorrectly.
[01:10:57] KaramKhaddour: What do you mean?
[01:11:03] KaramKhaddour: Yes, we are generating one card for each of these.
[01:11:10] KaramKhaddour: I didn't understand it correctly.
[01:11:13] Customer: Uh-huh.
[01:11:15] KaramKhaddour: Okay.
[01:11:16] KaramKhaddour: That's obvious, yes.
[01:11:18] Customer: Maybe...
[01:11:22] KaramKhaddour: Maybe here, under To learn, we should have the English translation, such as Bank, bank, and Bank, bench.
[01:11:31] KaramKhaddour: Maybe that would make it obvious.
[01:11:37] Customer: That's a good idea.
[01:11:41] Customer: But how do we get this translation?
[01:11:45] Customer: I don't know.
[01:11:48] Customer: When the user selects a word, what do we do?
[01:11:54] Customer: Make a request to an LLM?
[01:11:57] KaramKhaddour: Yes, with the sentence.
[01:12:00] Customer: So we can get a translation.
[01:12:03] Customer: Fetch a translation.
[01:12:06] Customer: Show it somewhere.
[01:12:07] Customer: I don't know where.
[01:12:11] Customer: Maybe in a tooltip or something like that.
[01:12:25] Customer: If the user selects two words with different translations, cards are generated for both.
[01:12:37] Customer: So the user can learn both words and both meanings.
[01:12:47] Customer: Good.
[01:12:50] Customer: The word tray, To learn: Geld and Bank.
[01:12:59] Customer: Here, the words are lowercased, but the original versions are not.
[01:13:05] Customer: They are German nouns, so they start with capital letters.
[01:13:11] Customer: I think you should preserve the case.
[01:13:18] Customer: Then, Generate into Travel by train, in German.
[01:13:26] KaramKhaddour: This is the deck we are generating the content for.
[01:13:33] Customer: Wait, you select a deck?
[01:13:37] KaramKhaddour: Yes, when we generate the [inaudible], it goes there, I think.
[01:13:40] Customer: But the deck has two languages.
[01:13:44] Customer: Not only German.
[01:13:50] KaramKhaddour: We want to study German from English.
[01:13:54] KaramKhaddour: That's why the translation will be in English.
[01:13:58] Customer: Got it.
[01:14:00] Customer: Maybe it would be nice to show English here as well.
[01:14:09] Customer: So they know what to expect and which language will be used.
[01:14:21] Customer: Cards are generated using the deck settings.
[01:14:24] Customer: What happens when you click Generate new cards, or something like that?
[01:14:32] Customer: You select a new word in this text.
[01:14:35] Customer: Then generate one card.
[01:14:38] Customer: Writing sentences.
[01:14:41] KaramKhaddour: It's slow.
[01:14:43] KaramKhaddour: I don't know why.
[01:14:56] KaramKhaddour: Okay.
[01:15:00] KaramKhaddour: Now they appear at the end of the deck.
[01:15:04] Customer: Okay.
[01:15:10] KaramKhaddour: Maybe they should appear at the beginning.
[01:15:16] Customer: Yes.
[01:15:27] Customer: Should we show them here?
[01:15:30] Customer: Or on the text page as well?
[01:15:36] Customer: We could show them on the text page too.
[01:15:45] Customer: Maybe I would like to edit some information about those cards right now, before adding them to the deck.
[01:15:57] Customer: I think it would be useful.
[01:16:00] Customer: After I save, they may no longer appear on the text page.
[01:16:10] Customer: They become part of a deck and don't belong to the text anymore.
[01:16:20] KaramKhaddour: Does it belong to the text only during generation?
[01:16:25] KaramKhaddour: After we close the session?
[01:16:29] KaramKhaddour: Yes.
[01:16:32] Customer: Basically, after generating, editing, and approving these new cards, they can be cleared from the text page.
[01:16:52] Customer: There is this problem about cards and text links.
[01:17:02] Customer: You have a text with some words selected.
[01:17:06] Customer: How do you know where each word appears now?
[01:17:12] Customer: In which deck does it appear?
[01:17:21] KaramKhaddour: You can go here and see which text you are coming from.
[01:17:29] Customer: You can do it from a word in a deck.
[01:17:35] Customer: But can you do this on the text page?
[01:17:41] Customer: If you open a text and see some words selected, how do you know which decks those words appear in?
[01:17:54] Customer: Or whether they appear in any deck at all?
[01:18:02] KaramKhaddour: Currently, there is no way.
[01:18:04] Customer: Yes.
[01:18:11] Customer: Maybe there could be two tabs below the text.
[01:18:16] Customer: One tab is for newly generated cards, as we discussed before.
[01:18:23] Customer: Another is for searching across decks for cards with those words.
[01:18:33] Customer: For each word, the user can see which decks contain cards with that word.
[01:18:49] Customer: So they know there is at least one deck containing that word, for example.
[01:18:59] Customer: Or so they know which deck to look at if they want to learn that word.
[01:19:12] Customer: Great.
[01:19:15] Customer: Thank you.
[01:19:17] Customer: I think that's it for Texts and Teaching.
[01:19:25] Customer: I think that's it for the UI review.
[01:19:29] Customer: Do you think so too?
[01:19:32] Customer: Or should we look at something else?
[01:19:47] KaramKhaddour: I think that's all.
[01:19:52] KaramKhaddour: Okay.
[01:19:53] KaramKhaddour: Are there any qualities you find very important that we don't have yet and should have?
[01:20:08] Customer: I don't know which qualities you documented.
[01:20:16] Customer: I also haven't thought about it very much.
[01:20:24] Customer: One very important quality is that keys are not leaked.
[01:20:30] Customer: If a user invites a teacher, the teacher cannot see the user's key.
[01:20:39] Customer: When a user invites a teacher, the user cannot see the teacher's key.
[01:20:45] Customer: When the user uses the service, they cannot see the built-in key.
[01:20:56] Customer: The keys are isolated from each other.
[01:21:02] Customer: Isolated between the parties: user, teacher, and service.
[01:21:10] Customer: This is important.
[01:21:12] Customer: Another thing.
[01:21:20] Customer: No data should be lost when the service is stopped.
[01:21:26] Customer: When it stops, the database should not crash.
[01:21:33] Customer: It should behave well.
[01:21:38] Customer: This should be self-hostable on Linux.
[01:21:43] Customer: On a Linux virtual machine with [inaudible].
[01:21:57] Customer: Maybe other prerequisites are needed, but they can be specified a bit later.
[01:22:07] Customer: Basically, it should run on Linux.
[01:22:12] KaramKhaddour: What else?
[01:22:20] KaramKhaddour: Maybe, if you open the application on a phone, it should be usable without horizontal scrolling.
[01:22:33] Customer: Yes.
[01:22:34] Customer: It is very important that it is usable on mobile.
[01:22:39] Customer: I don't know how to formalize this as a [inaudible].
[01:22:45] Customer: Maybe a quality scenario could be written.
[01:22:47] Customer: I'm not sure which measures to use.
[01:22:53] Customer: Or usability.
[01:22:56] Customer: Maybe consider some scenarios.
[01:22:59] Customer: You don't need to scroll, or something like that.
[01:23:06] Customer: This may sound more like a functional requirement.
[01:23:13] Customer: Not sure.
[01:23:17] Customer: Please try to formalize usability.
[01:23:23] KaramKhaddour: My last question could be: do you think we should have a threshold for cards kept after generation?
[01:23:37] KaramKhaddour: For example, let's say we generate 10 cards with the LLM, but 5 are regenerated.
[01:23:45] KaramKhaddour: Is this a problem?
[01:23:48] KaramKhaddour: Or do we not care how many are regenerated?
[01:23:55] Customer: I think it is not a problem.
[01:24:05] Customer: Let me answer.
[01:24:07] Customer: It depends on the scenario you are considering.
[01:24:11] Customer: When are they regenerated?
[01:24:13] Customer: When you click Create cards, generate some cards, find that some sentences are invalid, and regenerate them?
[01:24:29] Customer: This scenario, for example, or which one?
[01:24:36] KaramKhaddour: This scenario.
[01:24:38] KaramKhaddour: Should we have a threshold for the quality of cards generated by the LLM?
[01:24:51] Customer: I get it.
[01:24:54] Customer: We can measure the quality globally.
[01:24:59] Customer: We have global statistics about which cards were regenerated.
[01:25:07] Customer: But these global statistics may be affected by using different models for each card.
[01:25:24] Customer: The student can provide a different key before generating each deck.
[01:25:31] Customer: So cards will be generated by different models.
[01:25:34] Customer: These aggregate statistics don't tell you much about the quality of the models.
[01:25:43] Customer: I think it makes more sense to consider just this scenario, when you generate cards here on this page.
[01:26:06] Customer: We have checks for generated cards and regeneration logic.
[01:26:14] Customer: If multiple cards are regenerated several times, we can warn the user that something is going wrong: either they chose a bad prompt or the model is not very good.
[01:26:14] Customer: Even if the model sends blank answers, that is still a hint that the model is not very good.
[01:26:53] Customer: What else can be wrong in this case?
[01:27:01] Customer: The instructions, the model, or maybe the API key has expired, so you don't receive any reply from the LLM.
[01:27:21] Customer: If the API key has expired, you should notify the user immediately.
[01:27:21] Customer: Otherwise, we don't know exactly what causes problematic cards: the prompt or the LLM itself.
[01:27:45] Customer: Let's panic at 30%: if 30% of cards have to be regenerated, the model is bad.
[01:28:02] Customer: Let's be generous.
[01:28:06] Customer: I noticed something like that when generating cards for myself, although it was in 2024.
[01:28:06] Customer: Around one third of the cards were unusable, so I think a 30% threshold is reasonable in this case.
[01:28:06] Customer: It may be adjusted later depending on what we observe; maybe modern models are much better.
[01:28:41] KaramKhaddour: Okay.
[01:28:47] KaramKhaddour: Okay.
[01:28:48] KaramKhaddour: To close some of our user stories and move to the next steps, do you accept the ability to add text here?
[01:28:48] KaramKhaddour: Do you think it is enough for the user stories that a user can add text and choose words from it?
[01:29:24] Customer: Yes.
[01:29:26] Customer: What were the acceptance criteria for this user story?
[01:29:31] Customer: Are they satisfied?
[01:29:34] KaramKhaddour: Yes.
[01:29:35] KaramKhaddour: The acceptance criteria are that you can add text through the input here or choose a file, and the text can be no more than 300 words.
[01:30:01] KaramKhaddour: I think that's it for the acceptance criteria for adding text.
[01:30:01] KaramKhaddour: For marking words, you can mark words as learned or ignored.
[01:30:07] KaramKhaddour: If you mark a word as learned, you generate cards for it.
[01:30:13] KaramKhaddour: If you mark it as ignored, you don't generate anything.
[01:30:13] KaramKhaddour: You can also clear the selection.
[01:30:21] KaramKhaddour: What does Ignore do, basically?
[01:30:39] KaramKhaddour: When you generate cards, you should not use this word.
[01:30:39] KaramKhaddour: I think we can close these two user stories, right?
[01:30:51] KaramKhaddour: Marking words inside a text and adding a new text.
[01:31:00] KaramKhaddour: I think they are done.
[01:31:12] KaramKhaddour: For generating cards, we are now generating them using the LLM.
[01:31:24] KaramKhaddour: I think we can also close Generate cards using the LLM, but we should have a different [inaudible].
[01:31:33] KaramKhaddour: I'm not sure whether the quality threshold should be part of this user story.
[01:31:43] KaramKhaddour: I'm not sure.
[01:31:50] Customer: I'm also not sure.
[01:31:50] Customer: Maybe it should be a quality requirement, such as fault tolerance.
[01:32:01] Customer: When the system receives problematic responses in 30% of cases, it reports this to the user rather than failing silently.
[01:32:20] KaramKhaddour: I guess this is a new user story, right?
[01:32:20] KaramKhaddour: The user story is to generate cards, and we can now generate cards.
[01:32:27] KaramKhaddour: This is one user story, so I guess we can close it and open a new user story about reporting problems.
[01:32:33] KaramKhaddour: We also talked about the user story where you hear the sentence.
[01:32:48] KaramKhaddour: I think we need to work on that because our current approach is not correct, so we cannot close it.
[01:33:00] KaramKhaddour: I guess that's most of what we can close right now.
[01:33:11] KaramKhaddour: I think that's all from my side.
[01:33:11] KaramKhaddour: Do you have any questions for us?
[01:33:23] Customer: Not really.
[01:33:23] Customer: I think you are doing well.
[01:33:23] Customer: Okay, so I guess the team also does not...
[01:33:36] KaramKhaddour: ...have questions, so thank you very much for the meeting.
[01:33:36] KaramKhaddour: See you next week.
[01:33:36] KaramKhaddour: Have a nice weekend.
[01:33:43] Customer: Yes, thank you very much for your work.
[01:33:43] Customer: I appreciate your effort.
[01:33:43] Customer: Good luck.
[01:33:50] Customer: Thank you, and goodbye.
[01:33:50] Customer: Have a nice weekend.
[01:33:50] Customer: You too.
[01:33:50] Customer: Bye.
