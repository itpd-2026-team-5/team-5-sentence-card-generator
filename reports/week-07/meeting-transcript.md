# Week 7 Customer Validation Transcript

- **Date:** 2026-11-15.
- **Participants:** Customer, KaramKhaddour, Horokk1, Byakko-san, saleemasekrea000.

[00:00:00] KaramKhaddour: Can you see my screen?
[00:00:07] Customer: Yes.
[00:00:08] KaramKhaddour: One second, please.
[00:00:28] KaramKhaddour: First, I will show you our production deployment, where we now have an LLM that we can use from the VM.
[00:00:39] KaramKhaddour: I am now using the DeepSeek API.
[00:00:43] KaramKhaddour: We are using it instead of Claude to bypass the restrictions.
[00:00:49] KaramKhaddour: I will show you some functionality to check whether it is suitable for the MVP.
[00:01:02] KaramKhaddour: Then we can talk about the usability tests and people who could participate and learn languages using our application.
[00:01:22] KaramKhaddour: For example, we have this text.
[00:01:29] KaramKhaddour: We can now select a word and generate a card.
[00:01:34] KaramKhaddour: It is generated, and we have it here.
[00:01:38] KaramKhaddour: We have a sentence for the selected word.
[00:01:52] KaramKhaddour: Do you think anything is confusing for a first-time user?
[00:02:00] KaramKhaddour: For example, someone who does not know the application.
[00:02:05] KaramKhaddour: Do you think any parts of it are confusing?
[00:02:11] Customer: Where do they start?
[00:02:14] Customer: Here?
[00:02:15] KaramKhaddour: Yes, here, but they will not have cards.
[00:02:19] Customer: They have no cards, and then they need to figure out how to add cards.
[00:02:29] KaramKhaddour: Maybe on the start page we can explain that they need to add text and generate cards from it.
[00:02:45] Customer: If they do not have any decks, we can also show them something.
[00:02:54] Customer: Okay.
[00:02:56] Customer: If they do not have any text, we can give them a hint on this page to add some text.
[00:03:12] Customer: Maybe we can provide a button that will bring them to the Text tab if they do not have any text.
[00:03:24] KaramKhaddour: Okay.
[00:03:25] Customer: When they are in the Text tab, they do not have any text.
[00:03:35] Customer: Here they see the Add text button.
[00:03:40] Customer: Maybe they will figure out that they need to add text, or we can also provide a hint to click it.
[00:03:52] Customer: Okay.
[00:03:53] Customer: Then they add the text and see a text.
[00:03:57] Customer: Ah, they see this dialog.
[00:04:02] Customer: The title is understandable.
[00:04:06] Customer: The text language is understandable as well.
[00:04:09] Customer: There is a brief instruction for the text.
[00:04:13] Customer: Good.
[00:04:15] Customer: Or load it from a text file.
[00:04:16] Customer: Okay.
[00:04:17] Customer: Where it is from is optional.
[00:04:19] Customer: Notes are optional and are never turned into cards.
[00:04:23] Customer: Add and pick words.
[00:04:28] Customer: They add the text and pick some words.
[00:04:37] Customer: Do you have some sample text?
[00:05:14] Customer: They should not forget to add the title.
[00:05:25] Customer: Nice.
[00:05:26] Customer: Here it says the text language is German and to click a word to learn it or ignore it.
[00:05:36] Customer: Type a word to find sentences.
[00:05:45] Customer: It has a meaning you want to learn.
[00:05:52] Customer: They search for words.
[00:06:03] Customer: Do they search?
[00:06:08] Customer: I mean, do they search for words?
[00:06:13] KaramKhaddour: Maybe if it is a long text, this could be useful.
[00:06:20] Customer: Will they understand what they need to do with the text?
[00:06:29] Customer: Click a word to learn it or ignore it?
[00:06:33] Customer: Which word?
[00:06:35] Customer: Words you leave alone count as words you know.
[00:06:37] Customer: A word with two meanings can be learned in each of its sentences.
[00:06:49] Customer: Text language: German.
[00:06:52] Customer: I think these instructions should be improved and put above the search input field.
[00:07:09] Customer: They are more important than the search.
[00:07:16] Customer: They explain what the user can do on this page, which is not explained anywhere else, as far as I can see.
[00:07:29] Customer: To learn, I think you have to choose a translation.
[00:07:34] Customer: What can we put in these instructions?
[00:07:46] Customer: Click words in the text below.
[00:07:52] Customer: Click.
[00:07:55] Customer: When they click a word, what happens?
[00:07:58] Customer: Learn or ignore.
[00:08:00] Customer: This is obvious: learn or ignore it.
[00:08:08] Customer: Click words.
[00:08:10] Customer: Let us keep just...
[00:08:18] Customer: I am thinking both about what to write in the instructions and how to simplify them.
[00:08:27] Customer: Maybe we can simplify them later.
[00:08:30] Customer: But what should we write?
[00:08:32] Customer: We should explain to the user that they need to click words in the text.
[00:08:37] Customer: We should clearly show where the text starts.
[00:08:43] Customer: Right now, the text starts just below the checkbox.
[00:08:53] Customer: I think this is a bit confusing.
[00:08:56] Customer: Maybe we should put it into a box to show where the text starts and ends.
[00:09:08] Customer: Then we instruct the user.
[00:09:17] Customer: Click the words in the text to learn or ignore them.
[00:09:22] Customer: Words you leave alone count as words you know.
[00:09:28] Customer: Words you do not select.
[00:09:33] Customer: Unselected words.
[00:09:46] Customer: Words you leave alone.
[00:09:51] Customer: Words you leave unselected count as words you know.
[00:09:56] Customer: Maybe like this.
[00:10:00] Customer: A word with two meanings can be learned in each of its sentences.
[00:10:05] KaramKhaddour: Maybe this could be removed?
[00:10:12] Customer: They can infer it from the selection.
[00:10:19] Customer: But what happens?
[00:10:21] Customer: I see that you selected the word "ist", and it is also highlighted in two other sentences.
[00:10:36] Customer: What will happen in this case?
[00:10:40] Customer: Why is it highlighted, by the way?
[00:10:44] KaramKhaddour: I think because the meaning is similar; it is the same.
[00:10:49] Customer: This is a verb.
[00:10:54] Customer: Yes.
[00:10:56] Customer: It is basic and almost always has the same meaning.
[00:11:01] Customer: I think we should not really highlight it.
[00:11:12] Customer: What happens if you click another word?
[00:11:19] Customer: Let me select one.
[00:11:21] Customer: Click the word "Sie".
[00:11:25] Customer: What happens with the first word in the second sentence?
[00:11:31] Customer: I see other occurrences of "Sie" are also highlighted here.
[00:11:43] Customer: It makes me a bit confused.
[00:11:51] Customer: Why are they highlighted?
[00:11:54] Customer: Why are they underlined?
[00:11:57] Customer: I think this may confuse the real user as well.
[00:12:03] Customer: I would suggest not underlining them.
[00:12:07] Customer: Maybe we discussed whether we should select all occurrences of a word if it appears in the same sentence?
[00:12:18] Customer: For example, there are two identical sentences, and the user selects a word in one of them.
[00:12:26] Customer: Should the same word in the other identical sentence be selected?
[00:12:34] KaramKhaddour: Maybe when we hover over them, we could show "Already selected".
[00:12:41] Customer: At this point, I assume we have not done any semantic analysis of whether all occurrences have the same meaning.
[00:13:00] Customer: I think we cannot reliably underline only the words that have the same meaning.
[00:13:09] Customer: I think we should not underline them.
[00:13:15] Customer: The same-meaning checks will be conducted later, when we generate the cards.
[00:13:22] Customer: When we see that the same word comes from the same sentence, we do not generate the card.
[00:13:35] Customer: If there are two identical sentences in the text, we do not generate a card for the second word occurrence in the second identical sentence.
[00:13:52] KaramKhaddour: Only if it is an identical sentence, not an identical...
[00:13:56] Customer: Yes.
[00:14:05] Customer: We do this check then, so we do not need to do it right now in the text.
[00:14:19] Customer: I think it will confuse the user.
[00:14:21] Customer: I assume the user does not see any underlines and sees only the selected words.
[00:14:31] Customer: What can they do with those words?
[00:14:36] KaramKhaddour: Select where to put the cards.
[00:14:41] Customer: Okay.
[00:14:42] Customer: Generate cards to learn.
[00:14:46] Customer: What is "To learn"?
[00:14:50] Customer: Can you scroll?
[00:14:52] Customer: Yes, it works too.
[00:14:55] Customer: Is it in "Travel by train"?
[00:15:01] Customer: What does it show?
[00:15:03] Customer: All the decks?
[00:15:06] Customer: Yes.
[00:15:07] Customer: Or only one of them?
[00:15:10] KaramKhaddour: Here it shows all of them.
[00:15:12] KaramKhaddour: You can choose what you want.
[00:15:15] Customer: I mean...
[00:15:17] KaramKhaddour: Or a new deck.
[00:15:18] KaramKhaddour: If you choose a new deck, you will create a deck.
[00:15:23] Customer: Here, in the "To learn" section, I see the word "ist", and it is in "Travel by train".
[00:15:36] Customer: If "ist" is in more than one deck, will this show all of the decks?
[00:15:43] Customer: Not only "Travel by train"?
[00:15:47] Customer: Or what?
[00:15:52] KaramKhaddour: I think "ist" here is connected to a card, so it shows where the card is, not where the word is.
[00:16:01] KaramKhaddour: It is the same word in two different cards.
[00:16:06] KaramKhaddour: Depending on where the card is, it will show the decks.
[00:16:10] Customer: Yes, but...
[00:16:10] KaramKhaddour: It will show all of the decks, supposedly.
[00:16:14] Customer: This list can be quite long.
[00:16:21] Customer: It names the decks that already have a card for the word.
[00:16:34] Customer: This might be useful, but...
[00:16:54] Customer: There are two approaches.
[00:16:55] Customer: We can show the user the decks that have this word immediately.
[00:17:08] Customer: Or we can let the user first try to add a card and then notify or warn them that the deck already has a card for this word.
[00:17:26] Customer: Do they really want to add it again?
[00:17:29] Customer: I am not sure.
[00:17:31] Customer: Showing it immediately seems a bit better because there is less interaction when they add cards.
[00:17:51] Customer: They do not need to read additional warnings or make additional decisions.
[00:18:00] Customer: But it may not be very compact when there are several decks.
[00:18:12] Customer: How can we do this best?
[00:18:17] Customer: Generate cards.
[00:18:19] Customer: Choose a translation language and destination deck for the selected words above.
[00:18:24] Customer: Translate into English.
[00:18:26] Customer: Generate into...
[00:18:29] Customer: No new words to generate.
[00:18:32] Customer: Three cards added.
[00:18:51] Customer: You can also let them first generate cards and then, for each card, select which decks to add it to.
[00:19:07] Customer: Or let them select several cards and add them to a deck.
[00:19:12] KaramKhaddour: Okay.
[00:19:14] KaramKhaddour: Then we will show a notification or an alert if...
[00:19:19] KaramKhaddour: Or a warning if...
[00:19:22] KaramKhaddour: The decks shown have the same word, right?
[00:19:29] Customer: Yes, kind of.
[00:19:31] Customer: But is it important to show that?
[00:19:34] Customer: To show the decks?
[00:19:36] KaramKhaddour: To show that this deck has the same word.
[00:19:43] Customer: It may be nice if the user forgot that they already have a card with this word.
[00:19:57] Customer: But honestly, I am not sure.
[00:20:01] Customer: Maybe we should let them add duplicate cards and just warn them.
[00:20:10] Customer: Right now, do we allow them to add duplicate cards?
[00:20:15] Customer: Not duplicate cards, but cards for a word that already has a card in this deck.
[00:20:24] KaramKhaddour: Yes.
[00:20:27] Customer: Okay.
[00:20:29] KaramKhaddour: But should we warn them about it?
[00:20:38] Customer: I do not know.
[00:20:48] Customer: It is much easier not to warn them.
[00:20:56] Customer: Yes.
[00:20:58] Customer: Do we have a search by word in the deck?
[00:21:06] KaramKhaddour: No.
[00:21:10] Customer: Do we have a duplicate-words filter?
[00:21:17] Customer: Also not.
[00:21:19] Customer: Maybe...
[00:21:20] Customer: Maybe we can move duplicate handling here, without warning the user.
[00:21:34] Customer: Because they can edit cards here as well.
[00:21:39] Customer: They can edit them.
[00:21:44] Customer: Okay.
[00:21:45] Customer: They can just replace a word.
[00:21:50] Customer: In the second card, they can replace the word "glass" with another word that exists in the deck, and then they will get a duplicate here.
[00:22:09] Customer: We only warned them about duplicates when they were creating cards.
[00:22:15] Customer: But we do not warn them here.
[00:22:18] Customer: This will be inconsistent.
[00:22:21] Customer: Since this is the ultimate destination, and users may care about duplicates only within a deck, I suggest moving duplicate handling here.
[00:22:40] Customer: When they add text, we do not warn them.
[00:22:48] Customer: Let us go back to the text.
[00:22:51] Customer: They added...
[00:22:55] Customer: They generated cards.
[00:23:00] Customer: Then what happens?
[00:23:03] Customer: You select a word.
[00:23:06] Customer: By the way, we need to explain what "Ignore" means in the instructions at the top of the page.
[00:23:21] Customer: They generated new cards.
[00:23:24] Customer: They can preview them.
[00:23:31] Customer: They can preview them.
[00:23:37] Customer: This is not nice.
[00:23:40] Customer: Why did it generate two sentences per card?
[00:23:46] Customer: See...
[00:23:47] Customer: That is one sentence, right?
[00:23:50] Customer: Here, yes, but in the card above.
[00:23:54] Customer: Here there are two sentences.
[00:23:56] Customer: There are two full stops, see?
[00:24:03] Customer: Maybe some validation is needed, at least for full stops.
[00:24:10] Customer: Or for exclamation marks and question marks.
[00:24:15] Customer: Okay.
[00:24:21] Customer: They generated the cards.
[00:24:26] Customer: They clicked a card.
[00:24:29] Customer: They preview the sentence.
[00:24:32] Customer: What could they be confused about here?
[00:24:37] Customer: They may...
[00:24:39] Customer: They select the decks.
[00:24:43] Customer: They may not understand what the decks section does.
[00:24:53] Customer: What does clicking a chip or a button here do?
[00:25:00] KaramKhaddour: It will add something to the deck.
[00:25:03] Customer: Some explanation would be nice.
[00:25:07] KaramKhaddour: Regeneration.
[00:25:08] Customer: Feedback tells the model what to correct.
[00:25:11] Customer: The saved card instructions guide its next sentence and translation.
[00:25:21] Customer: Regeneration.
[00:25:26] Customer: Which problem do they solve using regeneration?
[00:25:31] KaramKhaddour: If they do not like the sentence?
[00:25:33] Customer: Yes.
[00:25:36] Customer: Maybe tell them, "If you do not like the sentence, regenerate it."
[00:25:49] Customer: Then you can tell them...
[00:25:52] Customer: Feedback tells the model what to correct.
[00:25:56] Customer: The saved card instructions guide its next sentence and translation.
[00:26:02] Customer: Saved card instructions.
[00:26:07] Customer: I see.
[00:26:10] Customer: Guide its next sentence and translation.
[00:26:16] Customer: What was wrong is optional.
[00:26:35] Customer: I think the description can be simplified.
[00:26:42] Customer: Tell what was wrong with the card to regenerate it.
[00:26:55] Customer: Yes.
[00:26:58] Customer: Or to rewrite it.
[00:27:04] Customer: Then they will recognize that they can write what was wrong.
[00:27:13] Customer: But it is optional; you do not have to.
[00:27:19] Customer: Maybe tell them, "Rewrite the sentence if you do not like it."
[00:27:26] Customer: Just explain the intention they may have.
[00:27:31] Customer: Okay.
[00:27:34] Customer: Then they can skip "What was wrong".
[00:27:38] Customer: Instructions this card is written with: sentences about an office job.
[00:27:48] Customer: Okay.
[00:27:49] Customer: You can edit it.
[00:27:51] Customer: Rewrite now.
[00:27:52] Customer: Mark to rewrite later.
[00:27:55] Customer: Okay.
[00:27:56] Customer: Add one more card for this word, each with its own sentence.
[00:28:01] Customer: Where will it be added?
[00:28:04] Customer: To a deck?
[00:28:06] Customer: Or just created?
[00:28:11] Customer: To the current deck?
[00:28:13] Customer: Or to the currently selected decks?
[00:28:16] Customer: To all decks?
[00:28:19] Customer: Ah, yes.
[00:28:20] KaramKhaddour: I think so.
[00:28:21] Customer: Okay.
[00:28:29] Customer: Maybe we need to explain here which decks it will be added to.
[00:28:36] Customer: Add two more cards for this word, each with its own sentence, to the decks you selected above.
[00:28:44] Customer: Or to all decks you selected above.
[00:28:51] Customer: Okay.
[00:28:52] Customer: Then they add one card.
[00:28:56] Customer: Okay.
[00:28:57] Customer: Ask your teacher.
[00:28:59] Customer: Note for the teacher.
[00:29:01] Customer: Ask the teacher to check.
[00:29:06] Customer: Who is the teacher?
[00:29:09] Customer: I do not know who the teacher is.
[00:29:15] KaramKhaddour: Okay.
[00:29:16] KaramKhaddour: That is only if you have a teacher.
[00:29:19] Customer: Sorry?
[00:29:20] KaramKhaddour: That is only if you have a teacher who will review your cards.
[00:29:25] Customer: I got it.
[00:29:27] Customer: I do know who a teacher is at this point.
[00:29:32] Customer: Okay.
[00:29:33] Customer: Note for the teacher.
[00:29:36] Customer: Is this how people say it?
[00:29:38] Customer: Ask the teacher to check.
[00:29:40] Customer: Then it is not very confusing.
[00:29:44] Customer: Archive.
[00:29:46] Customer: Keep the card and its history, but stop studying it.
[00:29:49] Customer: Delete.
[00:29:50] Customer: Removes it for good.
[00:29:52] Customer: Okay.
[00:29:54] Customer: I do not quite understand what "for good" means.
[00:29:58] Customer: Bye.
[00:30:00] Customer: Overall, those buttons are correct.
[00:30:05] Customer: Archive and Delete should be available to the student.
[00:30:09] Customer: Why does it say "Delete for good"?
[00:30:14] KaramKhaddour: No, it is not...
[00:30:17] Customer: For good.
[00:30:23] Customer: Okay.
[00:30:28] Customer: Ah, it means permanently.
[00:30:30] Customer: I did not know that.
[00:30:32] Customer: A non-native speaker may also be confused.
[00:30:40] Customer: I suggest calling it "Delete permanently".
[00:30:45] Customer: Or just "Delete".
[00:30:51] Customer: But in the description, you can say that it removes the card permanently, to clearly distinguish it from Archive.
[00:31:10] Customer: What do they do next?
[00:31:14] Customer: They may close this tab, I guess.
[00:31:18] Customer: They added the cards and may have regenerated a card.
[00:31:27] Customer: Then they close this sidebar, I guess.
[00:31:34] Customer: What else?
[00:31:37] Customer: They are still here.
[00:31:40] Customer: Okay.
[00:31:44] Customer: Maybe we can give them a hint that they can now study these cards.
[00:31:55] Customer: And provide a button on the word "Study", or somewhere, that will bring them to Today.
[00:32:09] Customer: Is that right?
[00:32:12] Customer: They have only added these cards to the decks.
[00:32:19] Customer: It might be a false promise.
[00:32:23] Customer: The cards will be added to the end of the decks.
[00:32:28] Customer: They probably will not study them today.
[00:32:33] KaramKhaddour: No, they will study them today because new cards appear directly.
[00:32:42] Customer: Really?
[00:32:43] Customer: Okay.
[00:32:45] KaramKhaddour: They should.
[00:32:46] KaramKhaddour: If that is not true, it is a mistake, but they should.
[00:32:51] Customer: What if we finally implement the card limits?
[00:32:59] KaramKhaddour: Maybe.
[00:33:03] Customer: In this case, where will these new cards appear?
[00:33:08] Customer: Here?
[00:33:10] Customer: At the start?
[00:33:15] Customer: At the start of the deck?
[00:33:18] Customer: Closer to the start of the deck or to the end?
[00:33:23] KaramKhaddour: They should appear at the beginning, right?
[00:33:28] Customer: Honestly, I am not sure.
[00:33:31] Customer: Maybe the user wanted to study some cards first and then decided to add a couple more.
[00:33:44] Customer: It is not guaranteed that they want to learn these new cards first.
[00:33:53] Customer: Maybe they want to finish learning the previously added cards.
[00:34:02] KaramKhaddour: Maybe you can give them the option to learn new cards first, or...
[00:34:08] Customer: That is an option.
[00:34:11] Customer: Or we can let them reorder the deck to choose which cards they study first and which later.
[00:34:19] Customer: Do we have this here?
[00:34:25] KaramKhaddour: Reordering?
[00:34:29] KaramKhaddour: We can do it like this.
[00:34:33] Customer: We can drag a card and move it, right?
[00:34:39] Customer: Can you?
[00:34:40] Customer: Yes.
[00:34:42] Customer: Will they study this card first?
[00:34:49] Customer: Yes.
[00:34:52] Customer: How will it affect the schedule?
[00:34:58] Customer: If the first card is due today and the second is due tomorrow, when you move the second card to the first position, will it be due today or tomorrow?
[00:35:22] KaramKhaddour: It should be due today?
[00:35:28] Customer: I guess so.
[00:35:35] Customer: We worked on this approach with another team.
[00:35:43] Customer: They have a study queue where they can reorder the cards.
[00:35:50] Customer: The order of this queue determines which cards are due today and which are due tomorrow.
[00:36:01] Customer: When you move a card that is due tomorrow to the first position, it becomes due earlier than the card in the second position.
[00:36:18] Customer: If the card in the second position is due today, the card in the first position is also due today.
[00:36:29] Customer: If they still fit the daily limits, so two or more cards can be studied during the day.
[00:36:48] Customer: Please explore this.
[00:36:52] Customer: What happens to the schedule after reordering?
[00:37:01] Customer: Align it with what we discussed now: changing the due date of a card after reordering.
[00:37:09] Customer: If you need to discuss it in more detail, we can discuss it in the group, at the next meeting, or today if we have time.
[00:37:24] Customer: Okay.
[00:37:28] Customer: Please go back to the text.
[00:37:38] Customer: They are still looking at the generated cards and do not know what to do with them.
[00:37:56] Customer: One card added to "At work".
[00:38:03] Customer: Okay.
[00:38:05] Customer: Click one to change it.
[00:38:09] Customer: What happens next?
[00:38:14] KaramKhaddour: Nothing.
[00:38:16] Customer: They see the card.
[00:38:20] Customer: How do they know what to do next so that they do not get stuck?
[00:38:29] KaramKhaddour: Currently, there is no hint to go to Decks.
[00:38:33] KaramKhaddour: Maybe we could add a hint?
[00:38:36] Customer: Maybe.
[00:38:37] Customer: But what is the logical next step?
[00:38:40] Customer: What do you think?
[00:38:41] Customer: Go to Decks or study?
[00:38:44] Customer: Or maybe both?
[00:38:46] KaramKhaddour: We can tell them that they can now study the cards or go to Decks to change them.
[00:38:57] Customer: Something like that.
[00:38:58] Customer: They choose to go to Decks, for example; please go to the previous page with all the decks.
[00:39:13] Customer: What do they see here?
[00:39:18] Customer: They see some decks.
[00:39:21] Customer: Travel by train.
[00:39:23] Customer: Some description.
[00:39:25] Customer: Languages.
[00:39:27] Customer: Level.
[00:39:29] Customer: Cards, new, to review, teacher, asked.
[00:39:33] Customer: Okay.
[00:39:39] Customer: Asked.
[00:39:42] Customer: New deck.
[00:39:47] Customer: They will not be empty because they added some cards.
[00:39:51] Customer: What can they do here?
[00:40:00] KaramKhaddour: Create a new deck.
[00:40:06] Customer: Maybe we should tell them to click a deck to open it.
[00:40:14] Customer: Some users may not understand that this table is clickable and may get stuck.
[00:40:30] Customer: Click a deck to open it.
[00:40:34] Customer: They click a deck, and then what?
[00:40:38] Customer: Words from my train trips.
[00:40:42] Customer: Edit deck.
[00:40:44] Customer: This is understandable.
[00:40:46] Customer: Select a card to open its editor.
[00:40:52] Customer: Yes.
[00:40:56] Customer: You use the verb "select".
[00:40:59] Customer: How do they select?
[00:41:02] Customer: Can they select a card?
[00:41:07] KaramKhaddour: Select multiple cards?
[00:41:13] Customer: What can they do with the cards here?
[00:41:19] Customer: They can click a card.
[00:41:22] Customer: Can they select multiple cards?
[00:41:27] KaramKhaddour: No.
[00:41:29] KaramKhaddour: But maybe they should be able to select multiple cards, right?
[00:41:33] Customer: What for?
[00:41:35] Customer: To change the order.
[00:41:40] KaramKhaddour: Yes.
[00:41:40] KaramKhaddour: Archive a group.
[00:41:42] Customer: That would be nice.
[00:41:46] Customer: Or drag a group and change the order.
[00:41:53] Customer: Okay.
[00:41:56] Customer: Select a card to open it.
[00:41:59] Customer: But if we add a selection checkbox, selecting a card will not open its editor, right?
[00:42:12] KaramKhaddour: Maybe it only selects if you click the checkbox.
[00:42:16] KaramKhaddour: If you click the card itself, it will open.
[00:42:19] Customer: You click or tap the card.
[00:42:33] Customer: I think the verb should be different.
[00:42:36] Customer: Instead of "Select a card to open its editor", say "Click a card".
[00:42:42] Customer: Something like this.
[00:42:44] Customer: Cards can belong to more than one deck.
[00:42:47] Customer: Removing a deck does not erase their study history.
[00:42:54] Customer: Why should I know this?
[00:42:58] Customer: Why should I learn about this here?
[00:43:01] Customer: Cards can belong to more than one deck.
[00:43:05] Customer: Removing a deck does not erase their study history.
[00:43:08] Customer: I do not know why I should know this here.
[00:43:23] Customer: From here, yes.
[00:43:25] Customer: But I think this is a useful phrase.
[00:43:33] Customer: Please click a card.
[00:43:41] Customer: In the Decks section, you can put this phrase to explain what happens when they select more than one deck.
[00:43:58] KaramKhaddour: What will happen when they select more than one deck?
[00:44:01] Customer: Yes, or when they unselect a deck.
[00:44:05] Customer: This phrase explains that cards can belong to more than one deck.
[00:44:12] Customer: In the card editor, they can select more than one deck.
[00:44:20] KaramKhaddour: Maybe we can put the sentence in the editor?
[00:44:24] Customer: Yes.
[00:44:26] Customer: That is exactly what I suggest.
[00:44:31] Customer: This phrase is useful here, closer to the action on decks.
[00:44:40] Customer: Another place where it can be useful is when the user works with several selected cards.
[00:44:51] Customer: They have quick actions, such as adding them to several decks.
[00:44:58] Customer: It would be nice to explain it there as well.
[00:45:04] Customer: They can click a card to open its editor or select several cards to work on a group of cards.
[00:45:35] Customer: Select several cards to act on them together.
[00:45:41] Customer: There should be a phrase to explain what selecting several cards does.
[00:45:52] Customer: Or to work on them as a group.
[00:45:57] Customer: Okay.
[00:45:58] Customer: Select several cards to work on them as a group.
[00:46:02] Customer: Maybe like this.
[00:46:04] Customer: Then they can select cards or open the editor.
[00:46:10] Customer: They opened the editor and checked something.
[00:46:12] Customer: They selected cards and did something.
[00:46:15] Customer: How do they do this on a group of cards?
[00:46:21] Customer: How do they see the menu or panel of actions?
[00:46:26] KaramKhaddour: Maybe we can put actions here.
[00:46:30] KaramKhaddour: A trash can for Delete and an Archive button for Archive.
[00:46:36] KaramKhaddour: Maybe a plus sign for adding to decks.
[00:46:40] Customer: That might be an option.
[00:46:46] Customer: Yes.
[00:46:48] Customer: There could be a modal above the cards, or something floating with actions at the bottom of the screen.
[00:47:04] Customer: When they scroll the list of cards, it stays at the bottom of the screen.
[00:47:11] Customer: They see the actions they can perform on the cards.
[00:47:15] Customer: Another option is the area above this list, where they can perform actions on a group of cards.
[00:47:33] Customer: I think I would prefer the option where the actions on a group of cards are above the table.
[00:47:46] Customer: The place is predictable, and the actions do not overlap with the cards or hide anything written on them.
[00:48:01] Customer: There is enough space for everything they may want to do with the cards.
[00:48:11] Customer: I would also suggest adding the Regenerate button there.
[00:48:20] Customer: They may want to regenerate a group of cards.
[00:48:25] Customer: That would be it.
[00:48:28] Customer: Archive, regenerate, mark, delete.
[00:48:36] KaramKhaddour: Assign to the teacher.
[00:48:40] Customer: By "mark", I mean mark for rewrite.
[00:48:47] Customer: By the way, could you remind me what "To rewrite" means?
[00:48:54] Customer: It is after Regenerate.
[00:49:01] Customer: Rewrite one marked card.
[00:49:06] Customer: Okay.
[00:49:17] Customer: There will be two ways to select cards for rewriting.
[00:49:29] Customer: It is still nice to be able to regenerate an individual card.
[00:49:48] Customer: If they see all the actions they can perform on a group of cards, they will not be confused.
[00:50:01] Customer: Okay.
[00:50:09] Customer: If we add selection, I think we should remove the feature where they mark several cards using this arrow and then rewrite them in a batch.
[00:50:26] Customer: Otherwise, there will be two ways to rewrite several cards.
[00:50:35] Customer: I suggest that this arrow rewrites just a single card.
[00:50:45] Customer: Then we do not need the To rewrite tab, I guess.
[00:50:52] Customer: Or do we?
[00:50:54] Customer: What does it do, by the way?
[00:50:56] Customer: To rewrite?
[00:51:01] Customer: What would it show?
[00:51:04] Customer: Ah, cards marked for rewrite.
[00:51:08] Customer: Okay.
[00:51:19] Customer: I do not know.
[00:51:27] Customer: It would be nice to see the results of rewriting without scrolling through the whole list of cards.
[00:51:36] Customer: Let us skip this tab.
[00:51:41] Customer: Yes.
[00:51:45] Customer: We keep this tab.
[00:51:48] Customer: But please return to In study: rewrite one marked card.
[00:52:18] Customer: If several cards are selected, should we provide an action to mark them for rewrite?
[00:52:29] Customer: Or should we have only one way?
[00:52:33] KaramKhaddour: I think it could be useful to mark a group of cards for rewrite.
[00:52:45] Customer: They will have two ways to mark cards: using this arrow icon, or selecting several cards and marking them for rewrite.
[00:53:01] Customer: Okay.
[00:53:02] Customer: It duplicates the functionality a bit, but maybe...
[00:53:07] KaramKhaddour: We can remove this because they cannot do the same from here.
[00:53:15] Customer: What?
[00:53:16] Customer: Here they can act only on one card, right?
[00:53:21] KaramKhaddour: Yes, so maybe the action here can apply only to one card, to avoid duplicating the group actions.
[00:53:30] KaramKhaddour: We can remove anything from here that can be done from here.
[00:53:35] KaramKhaddour: Because this is for only one card.
[00:53:40] Customer: I think regeneration can stay here, and Listen can also stay here.
[00:53:48] Customer: Archive as well, because these are quick actions that can be used quite often.
[00:54:00] Customer: Regenerate with the default prompt.
[00:54:04] Customer: I can see a user wanting this.
[00:54:13] Customer: I would keep Regenerate, but marking for rewrite can move into the group actions.
[00:54:25] Customer: They select several cards and then either rewrite them or mark them for rewrite.
[00:54:39] Customer: Yes.
[00:54:41] Customer: Why would they want to mark them for rewrite in this case?
[00:54:52] Customer: The only use case is...
[00:55:05] Customer: Suppose I have 300 cards and select one card here, scroll 20 cards down and select another, then scroll 50 cards down and select another.
[00:55:29] Customer: They have three cards selected with large gaps between them.
[00:55:34] Customer: Then they click "Rewrite three marked cards".
[00:55:40] Customer: They want to see the results of rewriting.
[00:55:46] Customer: Right now, they can go to the To rewrite tab and see which cards were rewritten.
[00:56:00] Customer: See which cards were marked for rewrite.
[00:56:04] Customer: After rewriting them, they can see the results for all three cards without any gaps between them.
[00:56:21] Customer: They can iterate and rewrite them several times.
[00:56:26] Customer: This is very convenient.
[00:56:32] Customer: However, currently they can rewrite in place on this page, which keeps the gaps between the cards.
[00:56:54] Customer: Maybe we should not let them regenerate several cards in place, but just mark them for rewriting.
[00:57:08] Customer: Then they will have to go to the To rewrite tab and rewrite them there.
[00:57:20] Customer: But I am not sure that would be very user-friendly.
[00:57:29] Customer: Maybe a more user-friendly way is to show a filter here to view all cards marked for rewrite.
[00:57:45] Customer: View all marked cards.
[00:57:49] Customer: Then rewrite marked cards.
[00:57:54] Customer: I suggest removing the To rewrite tab and turning it into a filter on this In study page.
[00:58:08] Customer: The filter would be a checkbox to show either all cards or only cards marked for rewrite.
[00:58:31] Customer: This way, they can see the results of rewriting without any other cards between the marked cards.
[00:58:42] Customer: Okay.
[00:58:46] Customer: They rewrote some cards; what can they do next?
[00:59:03] Customer: They can go and study, right?
[00:59:06] Customer: Yes.
[00:59:07] Customer: What do they study?
[00:59:09] Customer: The whole deck?
[00:59:14] Customer: Or what is due today?
[00:59:17] Customer: What do they study?
[00:59:22] KaramKhaddour: From here, the deck.
[00:59:27] Customer: How is this session related to the scheduler?
[00:59:35] KaramKhaddour: I think it will affect the cards, right?
[00:59:42] KaramKhaddour: It will affect the score of the card you studied, so it will not appear in the same way as in today's study.
[00:59:57] Customer: Can you close this session?
[01:00:00] Customer: Go to the...
[01:00:03] KaramKhaddour: You see?
[01:00:04] Customer: How did I get there?
[01:00:06] Customer: I was in a deck, then I closed the tab and returned here.
[01:00:17] Customer: Why did I come here?
[01:00:19] KaramKhaddour: I should go back to Decks.
[01:00:23] Customer: Maybe, yes.
[01:00:31] Customer: Because I was studying just that deck, I guess.
[01:00:35] Customer: I should return to that deck.
[01:00:40] Customer: Here I see "Study three decks, 21 cards", but there were only 12 cards.
[01:00:48] KaramKhaddour: Yes, it was only one deck.
[01:00:50] Customer: I think I should return to that deck's page.
[01:00:54] Customer: Okay.
[01:00:57] Customer: Let us go back to that deck.
[01:01:03] Customer: Study 12.
[01:01:11] Customer: Why do I study 12?
[01:01:13] KaramKhaddour: You always study all the cards here.
[01:01:16] Customer: Study the whole deck?
[01:01:19] Customer: Kind of, okay.
[01:01:27] Customer: Okay.
[01:01:30] Customer: Honestly, it is a bit confusing.
[01:01:38] Customer: It would be better to write it in full: "Study the whole deck".
[01:01:44] Customer: Study the whole deck.
[01:01:49] Customer: Another option is not to let them study this deck here.
[01:01:58] Customer: They study decks only in the Today tab.
[01:02:06] Customer: However, the problem may be that they usually study three decks but then need to study one deck for an exam, for example.
[01:02:19] Customer: After the exam, they need to select the decks they studied before.
[01:02:29] Customer: Would that be too inconvenient?
[01:02:37] KaramKhaddour: I think it is okay.
[01:02:39] KaramKhaddour: It is not very hard to do.
[01:02:42] Customer: They had three decks selected, then unselected them and selected one deck to study for an exam.
[01:02:55] Customer: Travel by train, for example.
[01:02:59] Customer: They unselected "Shopping" and "At work".
[01:03:02] Customer: Mm-hmm.
[01:03:02] Customer: Then they studied just that deck.
[01:03:05] Customer: The next day, they added Shopping.
[01:03:07] Customer: Okay.
[01:03:08] Customer: Yes.
[01:03:10] Customer: That is it.
[01:03:22] Customer: I do not know if they should be able to study one deck on the deck page.
[01:03:31] Customer: It does not provide these useful statistics.
[01:03:44] Customer: It shows the number of cards to study, but not how many are left, how many reviews are left, and so on.
[01:03:53] Customer: I would suggest not letting them study there.
[01:03:58] Customer: Remove the Study button from the deck.
[01:04:04] Customer: What do you think?
[01:04:06] KaramKhaddour: Okay.
[01:04:06] KaramKhaddour: We can make it redirect to the Today page.
[01:04:14] KaramKhaddour: A Study button without the 12, which brings them here to study.
[01:04:21] Customer: That is a good idea.
[01:04:25] Customer: Here they can select what to study.
[01:04:28] Customer: Okay.
[01:04:33] Customer: Okay.
[01:04:34] Customer: Okay.
[01:04:39] Customer: I do not know.
[01:04:43] Customer: Back to study.
[01:04:47] Customer: Back to study today.
[01:04:56] Customer: Study, study today.
[01:04:58] Customer: Study this deck today.
[01:05:05] Customer: This is also a false promise.
[01:05:10] Customer: We can redirect them, but why?
[01:05:18] KaramKhaddour: Why not?
[01:05:24] Customer: I mean, open the deck page.
[01:05:28] Customer: Click it.
[01:05:32] Customer: Okay.
[01:05:36] Customer: This will not be an action on the deck, just a redirect.
[01:05:48] KaramKhaddour: Maybe we can redirect them and select the deck.
[01:05:54] KaramKhaddour: Yes.
[01:05:56] Customer: But this may surprise them because they remember selecting three decks.
[01:06:04] Customer: Here, only one deck is selected.
[01:06:08] Customer: Okay.
[01:06:09] Customer: What happened?
[01:06:11] Customer: I am not sure.
[01:06:14] Customer: Maybe we should just tell them that they can go and study.
[01:06:21] Customer: Go to Today, select this deck, and study it, without selecting the deck for them.
[01:06:42] Customer: Now you can go to Study, select this deck, and study it.
[01:06:48] Customer: Maybe something like this.
[01:06:53] Customer: But we do not perform any actions for them.
[01:06:59] Customer: This is one way.
[01:07:00] Customer: Another way is to show all these deck statistics, such as new cards, cards to study today, and reviews, on the deck page.
[01:07:11] Customer: Then they can study and see something similar to this.
[01:07:26] Customer: The selection of decks here will remain intact when they come back.
[01:07:37] Customer: Honestly, I think I like this option even better.
[01:07:43] Customer: Can you?
[01:07:47] Customer: Maybe let us do it like this.
[01:07:51] Customer: On the deck page, they should see statistics similar to those here, but for that one deck.
[01:08:02] Customer: The study session will include only cards from that deck.
[01:08:14] Customer: When we introduce the limits, they will apply just to that one deck.
[01:08:26] Customer: I guess this will be logical.
[01:08:32] Customer: Or not.
[01:08:37] KaramKhaddour: Let us try it, and next week we can...
[01:08:40] Customer: Okay.
[01:08:42] KaramKhaddour: I need to ask you some questions for next week's assignment.
[01:08:47] KaramKhaddour: I do not think we have German speakers or learners easily available.
[01:08:58] KaramKhaddour: We have many Russian learners and speakers here.
[01:09:05] KaramKhaddour: For our usability test, we are planning to test with five Russian learners who speak English.
[01:09:22] KaramKhaddour: Their level in Russian is between A1 and B1.
[01:09:27] KaramKhaddour: This is our target group for testing.
[01:09:33] KaramKhaddour: Is this okay?
[01:09:36] Customer: Not quite.
[01:09:39] Customer: I would still want people who learn German to be represented in the sample.
[01:09:48] Customer: I will share a chat of people learning German at the university.
[01:10:01] Customer: I think we can recruit some people there.
[01:10:04] Customer: Okay.
[01:10:06] KaramKhaddour: When we give each learner the application, we want to see whether they can add text, generate two cards, and study them.
[01:10:20] KaramKhaddour: This is a flow we expect a learner to complete without difficulty.
[01:10:26] KaramKhaddour: Should we add any other metrics that we want to observe?
[01:10:38] Customer: Could you repeat the scenario?
[01:10:41] KaramKhaddour: Mm-hmm.
[01:10:42] KaramKhaddour: One second.
[01:10:45] KaramKhaddour: I have it here.
[01:10:46] KaramKhaddour: For each person, we want them to make two cards.
[01:10:49] KaramKhaddour: Mm-hmm.
[01:10:50] KaramKhaddour: Study the cards.
[01:10:52] KaramKhaddour: Regenerate a card.
[01:10:54] KaramKhaddour: And add text.
[01:10:56] KaramKhaddour: Adding text is part of creating a card.
[01:11:05] Customer: Create two cards.
[01:11:06] Customer: But they first need to add text, right?
[01:11:10] KaramKhaddour: Yes.
[01:11:10] KaramKhaddour: Add text.
[01:11:11] KaramKhaddour: Create the cards.
[01:11:15] KaramKhaddour: Study the cards.
[01:11:17] Customer: Study, regenerate.
[01:11:20] Customer: Mm-hmm.
[01:11:21] Customer: Okay.
[01:11:23] Customer: What do they do with the regenerated cards?
[01:11:34] KaramKhaddour: I do not know.
[01:11:35] KaramKhaddour: Study them again.
[01:11:37] Customer: Mm-hmm.
[01:11:39] Customer: That is a good question.
[01:11:45] Customer: What happens to a card's progress when it is regenerated?
[01:11:54] KaramKhaddour: The progress should return to zero, right?
[01:11:59] Customer: To zero?
[01:12:01] KaramKhaddour: It is like a new card.
[01:12:04] Customer: That is one point of view.
[01:12:07] Customer: But another is that they already studied the word.
[01:12:17] Customer: They may have already studied the word.
[01:12:21] Customer: Their actual progress with that word is non-zero.
[01:12:28] KaramKhaddour: Mm-hmm.
[01:12:32] Customer: Okay.
[01:12:36] Customer: The simplest option is to keep the progress.
[01:12:41] Customer: Okay.
[01:12:46] Customer: Or let them reset the progress if they feel they need to.
[01:12:56] Customer: That would be nice.
[01:13:01] Customer: Maybe let them reset the progress in the card menu.
[01:13:10] KaramKhaddour: Okay.
[01:13:12] KaramKhaddour: Should we do any kind of testing on the people who will test the application?
[01:13:20] KaramKhaddour: Should we create a survey for them, for example?
[01:13:26] KaramKhaddour: Have you used Anki before?
[01:13:29] KaramKhaddour: How long have you been studying the language?
[01:13:34] Customer: That is up to you.
[01:13:36] Customer: You need to select relevant people through screening.
[01:13:45] Customer: Then you need to learn about them what you want to learn.
[01:13:52] KaramKhaddour: Is there anything specific we should learn?
[01:13:56] Customer: Mm-hmm.
[01:14:00] KaramKhaddour: For example.
[01:14:01] Customer: It would be nice to find people who have not used Anki.
[01:14:10] Customer: I would love to see whether they understand the flashcard concept at all.
[01:14:20] Customer: Users who have used Anki probably know what a deck is.
[01:14:27] Customer: Those who have not used it may not know.
[01:14:34] Customer: Okay.
[01:14:34] Customer: Yes.
[01:14:42] Customer: It would be nice to ask whether they have used Anki, even during screening, for background information.
[01:14:54] Customer: Who should go there?
[01:15:06] Customer: Familiar with the deck concept.
[01:15:10] Customer: Maybe ask it like this.
[01:15:14] Customer: Mm-hmm.
[01:15:17] Customer: Are you familiar with flashcards?
[01:15:21] Customer: Or do you remember what a flashcard is?
[01:15:28] Customer: You can ask this during screening.
[01:15:31] Customer: But maybe some people use Anki and cannot really explain what a flashcard or a deck is.
[01:15:44] Customer: Maybe they do not know what it is called in English.
[01:15:49] Customer: But they can still give useful input.
[01:15:54] KaramKhaddour: Okay.
[01:15:55] KaramKhaddour: I think most people here are Russian or speak Russian.
[01:15:59] KaramKhaddour: We can do the survey in Russian, right?
[01:16:04] Customer: Yes, if you have teammates who can conduct the survey in Russian.
[01:16:12] Customer: Yes.
[01:16:12] Customer: Yes.
[01:16:13] KaramKhaddour: Okay.
[01:16:17] KaramKhaddour: When we give you the results of our tests, what is a success metric?
[01:16:27] KaramKhaddour: For example, if we test five or ten people and 60 percent can generate cards and study, is that a satisfactory result for the application?
[01:16:52] Customer: If 60 percent can generate a card, not really.
[01:17:04] Customer: I think it should be closer to 80 or 90 percent.
[01:17:10] KaramKhaddour: Okay.
[01:17:11] KaramKhaddour: Should we do any kind of post-test or ask them questions after they use the application?
[01:17:23] Customer: Yes, I think you should learn how intuitive it was and where they got stuck while completing the tasks.
[01:17:33] Customer: Maybe ask them for improvement ideas.
[01:17:41] KaramKhaddour: Okay.
[01:17:47] KaramKhaddour: For our MVP, we have three essential user stories: adding text, choosing a word from the text, and generating a card from that word.
[01:18:05] KaramKhaddour: Are they enough for the MVP?
[01:18:08] KaramKhaddour: Or do we need to add more essential user stories?
[01:18:16] Customer: It was adding text and generating a card from text?
[01:18:23] KaramKhaddour: Yes, choosing a word in the text and generating a card from it.
[01:18:27] Customer: Generating a card from text.
[01:18:32] Customer: Generating a card from text goes with adding the card to a deck.
[01:18:41] Customer: Generating a card for a selected word in the text implies that it is added to a deck.
[01:18:49] Customer: It is like adding decks.
[01:18:52] Customer: I think it is not enough.
[01:18:57] Customer: Where is the review?
[01:19:01] Customer: Where is reordering cards?
[01:19:11] Customer: Or reordering the decks?
[01:19:13] Customer: I think more scenarios should work.
[01:19:17] Customer: The core scenario should be similar to what we described, but it should also include a study session and a second study session.
[01:19:36] Customer: They studied today.
[01:19:38] Customer: The next day, they return.
[01:19:40] Customer: They come back and see another study plan.
[01:19:51] Customer: Okay.
[01:19:52] Customer: They complete it as well.
[01:19:55] Customer: In this case, we can say that the system works.
[01:20:01] Customer: We can complete the basic scenario.
[01:20:16] KaramKhaddour: For example, if they want to learn Russian and do not know their level, is a placement test enough for them?
[01:20:23] KaramKhaddour: Or should we add another helper?
[01:20:31] Customer: I think the placement test is enough, and the score is understandable to them.
[01:20:41] KaramKhaddour: Should the learner be able to assign a card to one teacher or multiple teachers?
[01:20:55] KaramKhaddour: We also have a security question.
[01:21:05] KaramKhaddour: Here you can add your own LLM API key, and it is stored only in your browser.
[01:21:13] KaramKhaddour: It is not in our database.
[01:21:16] KaramKhaddour: Should we prove that we are not storing the key in our database?
[01:21:26] Customer: Yes, if there is a way to prove that we do not have code that sends the API key to the server.
[01:21:36] KaramKhaddour: Okay.
[01:22:02] KaramKhaddour: When we generate cards and want to understand whether our LLM generates useful cards, what metric can we use?
[01:22:11] KaramKhaddour: Should we use only the number of regenerations the learner performs as an indication of generated-card quality?
[01:22:37] Customer: We could use another metric based on teacher activity because the teacher is an expert.
[01:22:56] Customer: But not all students will have a teacher, so maybe the number of regenerations is a more viable option.
[01:23:15] Customer: We need to decide whether it should be the total number of regenerations, the mean number per card, or the median among cards with non-zero regenerations.
[01:23:42] Customer: I am not sure.
[01:23:48] Customer: For the percentage of cards requiring regeneration, should we sample from cards that were studied or from the total set of cards?
[01:24:06] KaramKhaddour: Maybe an average for each student, because a student might not be very good and might regenerate a lot, so we should not take them into consideration.
[01:24:21] Customer: They can have a deck with a thousand cards and regenerate just ten of them.
[01:24:34] Customer: Which average do you mean?
[01:24:38] KaramKhaddour: This is one average: the percentage of regenerated cards among generated cards.
[01:24:49] KaramKhaddour: We also want to see the average across all our users.
[01:24:58] KaramKhaddour: If we have very low or very high outliers, they do not affect everyone's average.
[01:25:05] Customer: If a user regenerates only ten cards out of a thousand, will we use that ten in the average among users, or what will we use?
[01:25:26] KaramKhaddour: Yes.
[01:25:29] Customer: The percentage, ten divided by a thousand?
[01:25:34] Customer: A thousand, okay.
[01:25:37] Customer: We will take the average.
[01:25:39] Customer: What will this average tell us?
[01:25:44] Customer: We do not know how many cards they reviewed.
[01:25:52] Customer: If they reviewed only ten cards and regenerated all ten, it might mean all of them were awful.
[01:26:09] Customer: But if they reviewed all thousand cards and regenerated only ten, it might mean that the LLM is very good.
[01:26:24] Customer: Only one percent needed regeneration.
[01:26:31] KaramKhaddour: The problem is that LLM quality depends on the instructions given by the user, right?
[01:26:38] KaramKhaddour: Yes.
[01:26:39] KaramKhaddour: It is not something we can fully control.
[01:26:46] Customer: Should we measure this at all?
[01:26:51] KaramKhaddour: Is there any way to measure the quality of regenerated cards, or should we not look at it?
[01:27:09] Customer: We can conduct tests: generate 50 or 20 prompts that a user could supply and try regenerations using our prompts.
[01:27:32] Customer: I do not know how it works on your side.
[01:27:44] Customer: I assume you take the user's text, embed it in your text, get a prompt, and send it to the LLM.
[01:27:58] Customer: You concatenate several texts and send them to the LLM.
[01:28:05] Customer: You can only control your part of the prompt sent to the LLM.
[01:28:12] Customer: If you can change it so that it works better for 20 random user prompts, it will show that you are improving something on your side.
[01:28:33] Customer: If it does not improve generation, it is hard to tell whether the fault is in your part or the user's prompt.
[01:28:55] Customer: Honestly, I would test with several user prompts and see whether changes on your side can improve generation.
[01:29:10] Customer: But for this, you need an expert or an oracle.
[01:29:17] Customer: Okay.
[01:29:19] Customer: To assess the generation results.
[01:29:23] Customer: Apologies, one minute.
[01:29:26] Customer: Okay.
[01:29:49] KaramKhaddour: Okay.
[01:29:53] Customer: So.
[01:30:02] Customer: Let me be the expert.
[01:30:05] Customer: If 70 or 80 percent of the cards are all right, then it is a success.
[01:30:15] Customer: If it is less, then it is not a success.
[01:30:19] Customer: When I was generating my deck, about 40 percent of the cards were bad.
[01:30:30] Customer: If it improves to 70 or 80 percent, let us take 80 percent.
[01:30:37] Customer: If 80 percent are all right, then it is a success.
[01:30:42] Customer: Okay.
[01:30:46] KaramKhaddour: Are there any qualities you want from the deployment, such as a specific response time or deployment software?
[01:31:01] KaramKhaddour: Do you have any preference?
[01:31:03] Customer: Mm-hmm.
[01:31:08] Customer: Right now, it is deployable on a Linux machine, right?
[01:31:14] Customer: Yes.
[01:31:16] Customer: How much memory does it take?
[01:31:23] Customer: Does it take under 10 gigabytes of memory?
[01:31:28] KaramKhaddour: Yes.
[01:31:28] KaramKhaddour: Probably, yes.
[01:31:30] KaramKhaddour: I do not remember the exact amount, but the VM provided by the university is not very big.
[01:31:36] KaramKhaddour: I think so.
[01:31:37] Customer: Yes.
[01:31:38] Customer: Okay.
[01:31:40] Customer: Yes.
[01:31:41] Customer: By default, it is 16 gigabytes, but I think your system should require less.
[01:31:51] Customer: Let us set it at 10 gigabytes of RAM.
[01:31:57] Customer: Okay.
[01:31:59] KaramKhaddour: Oh, RAM.
[01:32:01] KaramKhaddour: No, I think our VM has [inaudible].
[01:32:04] KaramKhaddour: Okay.
[01:32:05] KaramKhaddour: I think it is about 20, but [inaudible].
[01:32:09] Customer: Okay.
[01:32:14] Customer: That is below the threshold, so it is all right.
[01:32:20] KaramKhaddour: Okay.
[01:32:22] Customer: Regarding response time, all responses from your system should take one second at most.
[01:32:37] Customer: I think that is achievable.
[01:32:40] Customer: What your system...
[01:32:45] KaramKhaddour: The only part we cannot control is the response from the LLM.
[01:32:54] Customer: Yes.
[01:32:56] Customer: There is also audio generation.
[01:33:02] Customer: How did you decide to handle it?
[01:33:05] KaramKhaddour: I am still using Chrome, the browser, or the operating system's default library.
[01:33:19] Customer: Mm-hmm.
[01:33:21] Customer: Got it.
[01:33:23] Customer: I think...
[01:33:26] Customer: But the text-to-speech quality in Firefox is awful.
[01:33:33] Customer: It would be very nice to implement audio generation for the MVP.
[01:33:41] KaramKhaddour: Yes.
[01:33:42] KaramKhaddour: Is it essential for the MVP or for the future?
[01:33:47] Customer: Very nice.
[01:33:50] Customer: No, it is essential.
[01:33:53] Customer: I have to listen to the cards to study them effectively.
[01:34:02] Customer: Okay.
[01:34:08] Customer: Okay.
[01:34:09] Customer: What else?
[01:34:11] Customer: Okay.
[01:34:12] Customer: Another thing is responses from an LLM.
[01:34:15] Customer: You can wait for them for some time, and then you should stop waiting.
[01:34:26] Customer: Waiting for an LLM response should take no longer than one minute, I guess.
[01:34:35] Customer: I think that will be enough.
[01:34:38] Customer: Okay.
[01:34:39] KaramKhaddour: Should we make backups of the data?
[01:34:46] Customer: Backups of the data.
[01:34:49] Customer: When you shut down the server, the database should not lose any data.
[01:35:03] Customer: Okay.
[01:35:04] Customer: I mean the VM itself.
[01:35:07] Customer: You can restart it, and the data will still be there.
[01:35:14] Customer: Whether to make backups is up to you.
[01:35:18] Customer: But I would like a guarantee that restarting the VM, and therefore shutting down your system and all services, will not lose any data.
[01:35:38] KaramKhaddour: Okay.
[01:35:40] KaramKhaddour: I think that is all my questions for today.
[01:35:43] KaramKhaddour: Do you have any questions for us?
[01:35:54] Customer: Any questions?
[01:35:57] Customer: Not really.
[01:35:59] Customer: Yes.
[01:36:01] Customer: Okay.
[01:36:02] KaramKhaddour: Thank you for the meeting.
[01:36:04] KaramKhaddour: Yesterday, I sent you an invitation to a private GitHub repository for storing the consent forms we will send to our sample of users.
[01:36:25] KaramKhaddour: Please accept it.
[01:36:28] KaramKhaddour: Today, I will also send you an invitation to a folder, on Drive or something similar, for storing recordings of our users.
[01:36:42] Customer: Okay.
[01:36:42] Customer: Great.
[01:36:43] KaramKhaddour: Our sample.
[01:36:45] KaramKhaddour: That is it.
[01:36:46] KaramKhaddour: Thank you for your time and for the meeting.
[01:36:48] KaramKhaddour: See you next week.
[01:36:50] KaramKhaddour: Bye-bye.
[01:36:51] Customer: Thank you.
[01:36:51] Customer: Thank you for your effort and progress.
[01:36:54] Customer: Yes.
[01:36:54] Customer: Good luck.
[01:36:56] Customer: Bye.
[01:36:57] Customer: Bye-bye.
[01:36:57] Customer: Have a nice weekend.
[01:36:59] KaramKhaddour: You too.
