# Weeks 8 and 9 Customer Review Transcript

- **Date:** 2026-11-28.
- **Participants:** Customer, KaramKhaddour.

[00:00:01] KaramKhaddour: This week we did four usability tests.
[00:00:07] KaramKhaddour: I will tell you about them and the scores we got.
[00:00:14] KaramKhaddour: We may be able to do one more test today, depending on whether the participant and I are available.
[00:00:23] KaramKhaddour: We ran the usability test with four people.
[00:00:27] KaramKhaddour: Three are learning Russian, and one is learning German.
[00:00:31] KaramKhaddour: All of them are beginners in their learning languages, at A2 at most.
[00:00:39] KaramKhaddour: Some had flashcard experience, and some did not.
[00:00:46] KaramKhaddour: We gave them three tasks.
[00:00:49] KaramKhaddour: The first task was to add a text, select two words to learn, and create two cards from those words.
[00:00:58] KaramKhaddour: The second task was to study the cards.
[00:01:02] KaramKhaddour: The third task was to generate a new sentence, or rewrite it.
[00:01:11] KaramKhaddour: All four people were able to generate cards.
[00:01:18] KaramKhaddour: Three out of four did it without help, and I needed to help one of them.
[00:01:27] KaramKhaddour: The task was to save a text in our application, but he did not understand what that meant or what a text meant.
[00:01:51] KaramKhaddour: I told him that he needed to add a text and asked him to explore the page and think about where it would make sense to add one.
[00:02:07] KaramKhaddour: He did not see it.
[00:02:08] KaramKhaddour: So I told him it was in the Texts section.
[00:02:15] KaramKhaddour: Three of them were able to study the cards.
[00:02:22] KaramKhaddour: Three were able to complete that task.
[00:02:23] KaramKhaddour: One did not understand how to study.
[00:02:27] KaramKhaddour: He also did not have flashcard experience.
[00:02:35] KaramKhaddour: He probably did not understand the concept of studying cards.
[00:02:44] KaramKhaddour: All four were able to rewrite the sentences.
[00:02:48] KaramKhaddour: The only failed task was one participant's task of studying the cards.
[00:02:58] KaramKhaddour: After each task, we asked one question to rate the task from one to seven.
[00:03:05] KaramKhaddour: One means very difficult, and seven means very easy.
[00:03:08] KaramKhaddour: The middle rating was six for every task.
[00:03:13] KaramKhaddour: It was six for making cards, six for studying, and six for replacing sentences.
[00:03:20] KaramKhaddour: After all the tasks, we gave them ten statements.
[00:03:25] KaramKhaddour: Each statement had a score.
[00:03:29] KaramKhaddour: Each statement was rated from one to five.
[00:03:34] KaramKhaddour: One means strongly disagree, and five means strongly agree.
[00:03:42] KaramKhaddour: The four scores were 92.5, 90, 85, and 50.
[00:03:48] KaramKhaddour: The score of 50 came from the person who was not able to study the cards.
[00:03:53] KaramKhaddour: The middle score was 87.5, and the average was 79.
[00:04:01] KaramKhaddour: Anything above 68 counts as above average.
[00:04:05] KaramKhaddour: We have three above average and one below average.
[00:04:10] KaramKhaddour: We also checked everything in our system.
[00:04:10] KaramKhaddour: One second, I will share the other tab.
[00:04:41] KaramKhaddour: Okay.
[00:04:47] KaramKhaddour: Okay.
[00:04:48] KaramKhaddour: We checked that everything exists here in OpenPanel.
[00:05:04] KaramKhaddour: We can filter by the participant's code.
[00:05:14] KaramKhaddour: What is this?
[00:05:24] Customer: Yes.
[00:05:25] KaramKhaddour: For example, here we have participant P-05.
[00:05:31] KaramKhaddour: Sorry, that is wrong.
[00:05:43] KaramKhaddour: I can go from here.
[00:05:46] KaramKhaddour: We can see the card_regeneration_completed event.
[00:05:52] KaramKhaddour: We can see word_marked, text_added, llm_usage_recorded, and study_review_completed.
[00:06:00] Customer: Is this for one user?
[00:06:03] KaramKhaddour: Yes, one user.
[00:06:04] KaramKhaddour: We can change this to P-04.
[00:06:09] KaramKhaddour: This was the German learner.
[00:06:11] KaramKhaddour: We also have P-06 and P-07.
[00:06:15] KaramKhaddour: These are also participants.
[00:06:21] KaramKhaddour: P-900 is our dry run.
[00:06:25] KaramKhaddour: That is not from the users.
[00:06:27] KaramKhaddour: What else?
[00:06:30] Customer: What did this tell you?
[00:06:33] Customer: These events?
[00:06:36] Customer: How did you use them?
[00:06:38] KaramKhaddour: These events?
[00:06:39] Customer: Yes.
[00:06:44] KaramKhaddour: It was mainly about making sure that everything was being recorded and that we could see it here.
[00:06:55] Customer: Maybe use another time period here.
[00:07:01] KaramKhaddour: Let's see.
[00:07:08] KaramKhaddour: Why is it not working?
[00:07:17] KaramKhaddour: That is weird.
[00:07:41] KaramKhaddour: I am not sure why this is not working.
[00:07:44] KaramKhaddour: It was tested at the previous stage and was working.
[00:07:55] KaramKhaddour: Maybe there is a problem because I just redeployed production.
[00:08:06] KaramKhaddour: Maybe I affected this.
[00:08:08] KaramKhaddour: I am not sure.
[00:08:09] KaramKhaddour: The useful information we mainly got was about what to add or change in our application.
[00:08:21] KaramKhaddour: I noticed that it is working.
[00:08:30] KaramKhaddour: This is OpenObserve.
[00:08:32] KaramKhaddour: The other one was OpenPanel.
[00:08:34] KaramKhaddour: Sorry, you cannot see it.
[00:08:36] KaramKhaddour: You can only see this.
[00:08:44] KaramKhaddour: OpenObserve is working, but the other one is not.
[00:08:50] KaramKhaddour: I will check it after the meeting.
[00:08:53] KaramKhaddour: The first finding concerns what happens after generating cards.
[00:08:57] KaramKhaddour: When someone does not understand the concept of flashcards, they are usually not able to see where the cards are being generated.
[00:09:07] KaramKhaddour: It is written in our application.
[00:09:10] KaramKhaddour: It is written here.
[00:09:14] KaramKhaddour: If we go to this text, it says "Generated into" here.
[00:09:19] KaramKhaddour: From my observations, most people do not notice that at all.
[00:09:28] KaramKhaddour: It probably just needs better highlighting.
[00:09:34] Customer: What exactly happens?
[00:09:38] Customer: They selected the words?
[00:09:41] Customer: Yes.
[00:09:41] KaramKhaddour: They selected words.
[00:09:44] KaramKhaddour: Yes.
[00:09:45] KaramKhaddour: They generated the cards, because doing this becomes really difficult.
[00:09:51] KaramKhaddour: They generated the cards.
[00:09:53] KaramKhaddour: After generation, the second task is to study those cards.
[00:09:58] KaramKhaddour: I found that most of them did not read where the cards were generated.
[00:10:06] KaramKhaddour: They go to Decks and start searching inside the decks, wondering where they might have generated the cards.
[00:10:15] KaramKhaddour: They do not have that in mind.
[00:10:17] KaramKhaddour: For example, they do not think, "I generated them into this deck."
[00:10:20] Customer: Yes.
[00:10:21] KaramKhaddour: There is probably so much information that they skip it.
[00:10:35] KaramKhaddour: The second finding concerns studying.
[00:10:35] KaramKhaddour: Two of them did not understand the ratings here.
[00:10:51] KaramKhaddour: They did not understand what these mean.
[00:10:54] KaramKhaddour: Again, Hard, Good, and Easy.
[00:10:57] KaramKhaddour: They did not understand whether it was about the word or the sentence.
[00:11:03] KaramKhaddour: What was it about?
[00:11:04] KaramKhaddour: They needed more instructions.
[00:11:07] KaramKhaddour: We did not give them instructions; we got this information from the questions we asked afterwards.
[00:11:16] KaramKhaddour: We also asked some open-ended questions.
[00:11:21] KaramKhaddour: One participant told us that Mark to rewrite and Rewrite now are confusing.
[00:11:35] KaramKhaddour: When we asked them to regenerate a card, they came here and tried to click this to regenerate it.
[00:11:46] KaramKhaddour: This does not regenerate it; it only marks it to rewrite later.
[00:11:53] KaramKhaddour: They were confused between the two.
[00:11:57] KaramKhaddour: Yes.
[00:12:08] KaramKhaddour: That is most of what we found.
[00:12:08] KaramKhaddour: Some users suggested a tutorial, where the application says, "Here you can add a text," and takes you through a predefined sequence of actions.
[00:12:42] KaramKhaddour: One suggested that kind of tutorial, and another suggested an About page that teaches you how things work.
[00:12:54] Customer: Yes.
[00:12:55] KaramKhaddour: Those are most of the suggestions.
[00:13:01] Customer: Okay.
[00:13:02] Customer: I think the tutorial idea is good, and the About page may not be very good.
[00:13:12] Customer: If some of them did not even notice which deck they generated cards into, an About page may be even more confusing.
[00:13:30] Customer: Would they read instructions, go back to the tabs to complete them, and then return to About, switching between About and the tabs where they can do something?
[00:13:54] Customer: A tutorial for the main task, starting from a text and finishing with a study session, may be more valuable and intuitive to follow.
[00:14:13] KaramKhaddour: Okay.
[00:14:15] KaramKhaddour: The application's usability requirement was that at least 80% of people complete the main task.
[00:14:23] KaramKhaddour: We tested four, and three completed it, so that is 75%.
[00:14:23] KaramKhaddour: Should we consider it a failed usability test, or do you accept 75%?
[00:14:48] Customer: Since it is below the threshold we established, it is a failure with this number of participants.
[00:14:48] Customer: You also mentioned that you might meet another participant.
[00:15:05] KaramKhaddour: Yes.
[00:15:06] Customer: You may be able to reach 80%, and it may pass.
[00:15:12] Customer: Yes.
[00:15:14] Customer: For now, it is a failure.
[00:15:19] KaramKhaddour: We need to ask you two questions.
[00:15:33] KaramKhaddour: We need to ask about story acceptance.
[00:15:33] KaramKhaddour: I showed you that the events are tracked and registered in our system.
[00:15:51] KaramKhaddour: Do you accept that our product records the main events, such as adding a text, marking words, and generating cards?
[00:16:03] Customer: You showed it, but can you show it live?
[00:16:14] Customer: Are events being captured?
[00:16:17] Customer: Yes.
[00:16:19] KaramKhaddour: I will move to staging.
[00:16:21] KaramKhaddour: Not [inaudible].
[00:16:24] KaramKhaddour: You can see the screen, right?
[00:16:26] Customer: Yes.
[00:16:27] KaramKhaddour: Okay.
[00:16:41] KaramKhaddour: Okay.
[00:16:42] KaramKhaddour: I have P-900 here.
[00:16:45] KaramKhaddour: It will be easy to track.
[00:16:48] KaramKhaddour: Let's try to add a text.
[00:16:58] KaramKhaddour: Let's try to learn this word and this one.
[00:17:29] Customer: One of them was generated, though.
[00:17:34] KaramKhaddour: Okay.
[00:17:35] KaramKhaddour: Maybe.
[00:17:38] KaramKhaddour: Oh, okay.
[00:17:40] KaramKhaddour: I think the problem is what I tried to do.
[00:17:46] KaramKhaddour: I even put it in German instead of Russian.
[00:17:50] KaramKhaddour: Okay.
[00:18:07] KaramKhaddour: Let's say, okay.
[00:18:18] KaramKhaddour: Yes.
[00:18:26] KaramKhaddour: Okay.
[00:18:40] KaramKhaddour: Let's go here.
[00:18:42] KaramKhaddour: Test.
[00:18:46] KaramKhaddour: If you can see, we have events from just now.
[00:18:49] KaramKhaddour: If we apply the filter, yes.
[00:19:04] KaramKhaddour: Yes.
[00:19:05] KaramKhaddour: Those are the events we just generated: study_review_completed, [inaudible], word_marked, text_added, and text_added twice.
[00:19:18] KaramKhaddour: Okay.
[00:19:19] KaramKhaddour: Do you accept the story?
[00:19:21] Customer: Yes.
[00:19:22] Customer: Okay.
[00:19:22] Customer: Yes.
[00:19:23] Customer: It works great.
[00:19:24] KaramKhaddour: The second story is about observability.
[00:19:38] KaramKhaddour: Okay.
[00:19:39] KaramKhaddour: As you can see here, the second story is observability.
[00:19:46] KaramKhaddour: The server reports request response times and errors, which you saw.
[00:19:50] KaramKhaddour: Yes.
[00:19:52] KaramKhaddour: Here we have request duration, [inaudible], and so on.
[00:20:03] KaramKhaddour: This is the method.
[00:20:04] KaramKhaddour: Let's go to the operator view.
[00:20:09] KaramKhaddour: Yes.
[00:20:10] KaramKhaddour: You can see request volume over time.
[00:20:15] KaramKhaddour: This is for the past 24 hours.
[00:20:18] KaramKhaddour: Let's try the past 15 minutes.
[00:20:22] KaramKhaddour: We have server errors here.
[00:20:24] KaramKhaddour: Currently, we have no errors.
[00:20:27] KaramKhaddour: Slowest routes.
[00:20:30] KaramKhaddour: Yes.
[00:20:31] KaramKhaddour: All the requests.
[00:20:34] KaramKhaddour: We are recording generation requests and [inaudible].
[00:20:44] KaramKhaddour: Do you accept that our server reports request response times and errors?
[00:20:52] Customer: Yes.
[00:20:56] Customer: Okay.
[00:20:57] Customer: It does.
[00:20:58] Customer: You have P95, and there are some slow bars.
[00:21:07] Customer: I can see them at the bottom.
[00:21:11] Customer: Why?
[00:21:14] Customer: Generation takes up to eight seconds.
[00:21:20] Customer: Okay.
[00:21:23] Customer: What about other endpoints?
[00:21:27] KaramKhaddour: Yes.
[00:21:32] Customer: Okay.
[00:21:37] Customer: It is normal for generation to take eight seconds.
[00:21:42] Customer: What is this?
[00:21:46] Customer: Yes.
[00:21:47] Customer: Glosses.
[00:21:48] Customer: What is this?
[00:21:52] KaramKhaddour: I am not completely sure.
[00:21:58] KaramKhaddour: Okay.
[00:21:59] KaramKhaddour: This one is audio, and we are now generating it using a local model on the VM.
[00:22:10] KaramKhaddour: It makes sense that it takes some time.
[00:22:13] KaramKhaddour: Yes.
[00:22:17] KaramKhaddour: Glosses.
[00:22:18] KaramKhaddour: I am not sure.
[00:22:20] Customer: Okay.
[00:22:21] KaramKhaddour: It could be word translation, because translating words also uses the LLM.
[00:22:33] KaramKhaddour: Generating sentences uses the LLM.
[00:22:37] KaramKhaddour: When we select a word to learn and [inaudible], it is first translated into English and then generated.
[00:22:58] KaramKhaddour: Maybe that is the reason.
[00:23:03] KaramKhaddour: Yes.
[00:23:06] Customer: Do you agree, or [inaudible]?
[00:23:09] Customer: Yes.
[00:23:10] Customer: I was just asking what exactly happens.
[00:23:15] Customer: Yes.
[00:23:16] KaramKhaddour: I can check and send you the answer.
[00:23:23] Customer: Okay.
[00:23:24] KaramKhaddour: I think that is all for the Week 8 questions.
[00:23:29] KaramKhaddour: We will also ask some questions about the Week 9 assignment, because the deadline is tomorrow.
[00:23:38] KaramKhaddour: Okay.
[00:23:41] KaramKhaddour: Okay.
[00:23:47] KaramKhaddour: Okay.
[00:23:48] KaramKhaddour: As I understand it, for Week 9 we need you to do some tasks.
[00:23:56] KaramKhaddour: Then we will ask whether they pass or fail.
[00:24:02] KaramKhaddour: Yes.
[00:24:04] KaramKhaddour: You can do it here.
[00:24:10] KaramKhaddour: This is production.
[00:24:15] Customer: I will open it on my device.
[00:24:16] Customer: Are you connected to the university network?
[00:24:25] KaramKhaddour: Yes.
[00:24:27] Customer: Okay.
[00:24:33] KaramKhaddour: I think this is the first user.
[00:24:42] KaramKhaddour: Could you share your screen?
[00:24:49] Customer: Yes, I am sharing it.
[00:24:54] Customer: Which user should I use right now?
[00:24:57] KaramKhaddour: I think the first task is as a learner.
[00:25:02] Customer: Okay.
[00:25:09] Customer: The demo learner account.
[00:25:17] Customer: You are there.
[00:25:23] Customer: Oh, okay.
[00:25:25] KaramKhaddour: Okay.
[00:25:26] KaramKhaddour: Can you add a Russian text, mark two words to learn, choose a deck, and generate cards for those two words?
[00:25:40] Customer: Okay.
[00:25:41] Customer: I add a text, mark two words, and generate two cards to learn.
[00:25:46] Customer: Yes.
[00:25:48] KaramKhaddour: Text.
[00:25:50] KaramKhaddour: Yes.
[00:25:53] Customer: Okay.
[00:25:54] Customer: I will Google some Russian text.
[00:26:05] Customer: Okay.
[00:26:10] Customer: I should change the text language to Russian.
[00:26:29] Customer: Next, where it is from: Google.
[00:26:36] Customer: I am not sure whether there is validation.
[00:26:41] Customer: Okay.
[00:26:42] Customer: Let's see.
[00:26:44] Customer: Please enter a URL.
[00:26:46] Customer: Okay.
[00:26:47] Customer: Anyway, it is optional.
[00:26:51] Customer: I choose two words.
[00:26:55] Customer: I choose one word to learn.
[00:26:59] Customer: Another word to learn.
[00:27:02] KaramKhaddour: Then you can choose a deck.
[00:27:07] Customer: So I can.
[00:27:09] Customer: I see.
[00:27:11] Customer: Yes.
[00:27:13] Customer: Generate cards.
[00:27:14] Customer: Choose a translation language.
[00:27:17] Customer: I am translating into, okay.
[00:27:21] Customer: For example, German.
[00:27:23] Customer: Choose a deck.
[00:27:24] Customer: New deck.
[00:27:26] Customer: Okay.
[00:27:37] Customer: Choose a level.
[00:27:42] Customer: Okay.
[00:27:44] Customer: Some level.
[00:27:45] Customer: Learning Russian.
[00:27:49] Customer: Translated into German.
[00:27:56] Customer: I am not sure what it means.
[00:27:58] Customer: I know Russian.
[00:28:01] KaramKhaddour: Yes, but you added a Russian text.
[00:28:04] Customer: Yes.
[00:28:06] Customer: Yes.
[00:28:07] Customer: Yes.
[00:28:08] Customer: I am learning Russian.
[00:28:12] Customer: But I know English.
[00:28:20] Customer: I am confused.
[00:28:23] Customer: Generate cards.
[00:28:24] Customer: Translate into German.
[00:28:27] Customer: So I know [inaudible].
[00:28:30] Customer: Okay.
[00:28:31] Customer: For example, I know German.
[00:28:32] Customer: Okay.
[00:28:37] Customer: Choose a deck.
[00:28:38] Customer: New deck.
[00:28:39] Customer: Choose a level.
[00:28:40] Customer: One.
[00:28:41] Customer: No.
[00:28:42] Customer: Other.
[00:28:44] Customer: Create deck.
[00:28:53] Customer: Okay.
[00:28:54] Customer: Generate two cards.
[00:29:04] Customer: Two cards added to the deck.
[00:29:08] KaramKhaddour: You can open the deck and make sure the cards exist there.
[00:29:16] KaramKhaddour: Okay.
[00:29:16] KaramKhaddour: How did I do that?
[00:29:19] Customer: Um.
[00:29:20] Customer: You clicked on it.
[00:29:21] Customer: Oh, sorry.
[00:29:22] Customer: In Texts, I got this thing.
[00:29:31] Customer: Then, after generation [inaudible].
[00:29:35] KaramKhaddour: It had a link to take you there.
[00:29:41] Customer: Okay.
[00:29:42] Customer: Generate one card.
[00:29:46] Customer: Writing sentences.
[00:29:48] Customer: Okay.
[00:29:50] Customer: This is a link.
[00:29:53] Customer: This is also a link.
[00:29:56] Customer: Okay.
[00:29:57] Customer: This is a link.
[00:29:58] Customer: It does not look like one.
[00:30:02] Customer: Okay, I followed the link.
[00:30:11] Customer: I created even more cards than necessary.
[00:30:18] Customer: Then I see...
[00:30:23] KaramKhaddour: No, you generated them into a different deck.
[00:30:30] KaramKhaddour: You did not generate them into the deck that you...
[00:30:33] Customer: Sorry, into my deck.
[00:30:35] Customer: I should have generated...
[00:30:39] Customer: I had to...
[00:30:43] KaramKhaddour: Because...
[00:30:45] Customer: I am confused.
[00:30:47] Customer: I have this deck.
[00:30:52] Customer: Can I...
[00:30:53] Customer: I cannot generate into this deck.
[00:30:59] Customer: Why can I not generate into this deck?
[00:31:01] KaramKhaddour: Because you did not choose a word first.
[00:31:05] Customer: But I did choose the words.
[00:31:08] KaramKhaddour: They have already been generated.
[00:31:10] Customer: But they were generated into another deck.
[00:31:21] Customer: Okay.
[00:31:22] Customer: I will choose three other words.
[00:31:33] Customer: No, two words.
[00:31:34] Customer: That is enough.
[00:31:39] Customer: Now I can generate one card.
[00:31:46] Customer: One of the selected words already has a card in another deck.
[00:31:54] Customer: So I cannot quickly add existing cards to a new deck from here, right?
[00:32:09] Customer: Okay.
[00:32:13] Customer: This one exists as well.
[00:32:17] Customer: Let's select one.
[00:32:21] Customer: Generate two cards.
[00:32:30] Customer: Okay.
[00:32:34] Customer: Now click the link.
[00:32:38] Customer: Now I am here.
[00:32:40] Customer: I am here.
[00:32:42] Customer: I have four words here.
[00:32:48] Customer: I think I generated some of them before.
[00:32:54] Customer: Yes, "мужика" and...
[00:32:58] Customer: Yes, I guess.
[00:33:02] Customer: Okay.
[00:33:02] Customer: What is expected in the test now?
[00:33:11] KaramKhaddour: You should see one new card for each word.
[00:33:17] KaramKhaddour: Each should have a new sentence.
[00:33:19] KaramKhaddour: No, no.
[00:33:22] KaramKhaddour: Studying is the next test.
[00:33:25] KaramKhaddour: Inside the deck you created, you should see that each selected word has one card, a new sentence, the sentence translation, and the word translation.
[00:33:38] Customer: Yes, I see that.
[00:33:41] KaramKhaddour: Did that work as expected?
[00:33:44] KaramKhaddour: Do you give it a pass or a fail?
[00:33:50] Customer: Yes, it works as expected.
[00:33:53] KaramKhaddour: Okay.
[00:33:55] KaramKhaddour: Now you can choose one deck to study.
[00:33:58] KaramKhaddour: Answer three cards in that deck and play the word's pronunciation.
[00:34:06] KaramKhaddour: You should only see cards from that deck.
[00:34:08] KaramKhaddour: The sound should play, and your answers should be saved.
[00:34:15] Customer: Could you repeat that?
[00:34:18] Customer: I choose a deck.
[00:34:19] KaramKhaddour: You need to study three cards and play the sound to check it.
[00:34:26] Customer: Yes, I heard it.
[00:34:28] Customer: Okay.
[00:34:29] Customer: Nice.
[00:34:30] Customer: I heard the word and the sentence.
[00:34:34] KaramKhaddour: Then you need to click the card to see the answer and answer it.
[00:34:45] Customer: Tap to show the answer or press Space.
[00:34:48] Customer: I pressed Space.
[00:34:49] Customer: Now I can, okay.
[00:34:57] Customer: Wow, the pronunciation is pretty good.
[00:35:11] Customer: This one is easier.
[00:35:18] Customer: Easier.
[00:35:27] Customer: The Russian is not very good.
[00:35:30] Customer: Is it wrong?
[00:35:32] Customer: What is it called?
[00:35:36] Customer: [inaudible].
[00:35:39] Customer: Check again.
[00:35:42] Customer: Emphasis, or...?
[00:35:44] Customer: I do not remember what it is called in English.
[00:35:47] Customer: Check again.
[00:35:49] Customer: Back to Today.
[00:35:51] Customer: I studied the cards.
[00:35:57] KaramKhaddour: As you can see, yes.
[00:36:03] KaramKhaddour: You only saw cards from your deck, right?
[00:36:07] KaramKhaddour: Yes.
[00:36:08] KaramKhaddour: Your answers should be saved.
[00:36:11] KaramKhaddour: I guess we do not really show that.
[00:36:15] KaramKhaddour: We only show that you have nothing new or left to review, because everything was marked Easy.
[00:36:22] Customer: I cannot see the date when a card will be shown again.
[00:36:34] Customer: I cannot tell whether that information was saved.
[00:36:41] Customer: Maybe you can check in the database, but that is not really at the user level.
[00:36:53] Customer: What can I check?
[00:36:56] KaramKhaddour: I can show you in OpenPanel that it was saved.
[00:37:07] KaramKhaddour: Would showing OpenPanel work as a check for this test?
[00:37:21] Customer: Technically, yes.
[00:37:26] KaramKhaddour: I will share the screen.
[00:37:28] Customer: Okay.
[00:37:30] KaramKhaddour: Can you stop sharing your screen?
[00:37:33] Customer: Yes, I am switching.
[00:37:34] KaramKhaddour: Here you can see the production environment.
[00:37:44] KaramKhaddour: This is study_review_completed.
[00:37:47] KaramKhaddour: If we go here, we can see that you marked it Easy.
[00:37:54] KaramKhaddour: I have another one here.
[00:37:58] KaramKhaddour: Easy.
[00:38:05] Customer: You received this event, but did you save the information somewhere?
[00:38:11] Customer: I mean the actual state of the cards, not the events.
[00:38:20] Customer: I assume you do not store that in OpenPanel.
[00:38:24] KaramKhaddour: Yes, I understand your point.
[00:38:30] KaramKhaddour: Your point is that here we are reading information from the request rather than storing it, right?
[00:38:46] Customer: Okay.
[00:38:49] Customer: I think you stored the information in a database.
[00:38:56] KaramKhaddour: Yes.
[00:38:56] Customer: Maybe you have a client for that database.
[00:38:59] Customer: We could make an SQL query and demonstrate it.
[00:39:05] Customer: Technically, you can show that.
[00:39:11] KaramKhaddour: Okay.
[00:39:12] Customer: Let me reload the page and log in again.
[00:39:21] Customer: Can I sign out?
[00:39:24] KaramKhaddour: Yes.
[00:39:26] Customer: If the information was saved, I will see it.
[00:39:33] Customer: I will share my screen again.
[00:39:39] Customer: The right screen.
[00:39:45] Customer: Where is it?
[00:39:50] KaramKhaddour: Yes.
[00:39:51] KaramKhaddour: It was entered incorrectly, right?
[00:39:57] Customer: Yes, I will fix it.
[00:39:59] Customer: Learner.
[00:40:01] Customer: The demo learner, I think.
[00:40:07] Customer: Okay.
[00:40:08] Customer: Now I go to Decks, see my deck, and see that there are zero cards to study.
[00:40:18] Customer: It preserved the information.
[00:40:22] KaramKhaddour: This is a pass, right?
[00:40:25] Customer: Yes, this is a pass.
[00:40:27] KaramKhaddour: The final test is to share one deck with the teacher account as a learner.
[00:40:36] KaramKhaddour: As a teacher, open the shared deck, correct one card's sentence, and save it.
[00:40:42] KaramKhaddour: Then return as the learner and see the teacher's change.
[00:40:50] Customer: By the way, can I be my own teacher?
[00:40:58] KaramKhaddour: I do not know.
[00:41:00] Customer: Okay.
[00:41:01] KaramKhaddour: I do not remember whether we check that you cannot assign yourself.
[00:41:06] Customer: I opened a deck for the teacher, but there are no cards.
[00:41:13] Customer: I will mark some cards.
[00:41:17] KaramKhaddour: First, you need to share the deck with the teacher account.
[00:41:20] Customer: Marked it.
[00:41:22] Customer: Okay.
[00:41:24] Customer: I will share it with the teacher account you sent.
[00:41:33] Customer: Share, and then, no, that is a password.
[00:41:47] Customer: I shared it.
[00:41:50] Customer: Now I should log in as a teacher.
[00:41:55] Customer: Can I log in through another window?
[00:42:01] KaramKhaddour: Should I...?
[00:42:02] KaramKhaddour: No.
[00:42:06] KaramKhaddour: Yes.
[00:42:07] KaramKhaddour: You can log in using an incognito window.
[00:42:10] Customer: In a new incognito window?
[00:42:14] Customer: It should work in incognito.
[00:42:16] Customer: Let's check.
[00:42:18] Customer: No.
[00:42:20] Customer: It is per browser.
[00:42:23] Customer: I can try another browser.
[00:42:27] Customer: Okay.
[00:42:29] Customer: I will sign in as a teacher.
[00:42:37] Customer: Okay.
[00:42:39] Customer: No, thanks.
[00:42:42] Customer: My first deck.
[00:42:44] Customer: Your decks.
[00:42:48] Customer: What did I select?
[00:42:51] Customer: I selected my deck.
[00:42:55] KaramKhaddour: Yes.
[00:42:56] KaramKhaddour: So...
[00:42:57] Customer: I should see it here in Teaching.
[00:43:02] KaramKhaddour: Yes.
[00:43:03] Customer: I am the learner.
[00:43:06] Customer: I am this learner, right?
[00:43:09] KaramKhaddour: Yes.
[00:43:10] Customer: Okay.
[00:43:11] Customer: I see the deck.
[00:43:14] Customer: Nice.
[00:43:15] Customer: I have a quick-action button to approve or check.
[00:43:22] Customer: Okay.
[00:43:23] Customer: As a student, did I have to select some words for the teacher?
[00:43:32] KaramKhaddour: You can assign a specific card to the teacher if you want.
[00:43:36] KaramKhaddour: It will...
[00:43:37] Customer: How do I do that?
[00:43:40] Customer: Ask the teacher to check.
[00:43:41] Customer: Okay.
[00:43:46] Customer: Then, as a teacher, I can...
[00:43:50] Customer: Okay.
[00:43:52] Customer: I reload, and it asks to check.
[00:43:56] Customer: Okay.
[00:43:58] Customer: So...
[00:43:58] KaramKhaddour: Okay.
[00:43:59] KaramKhaddour: You need to correct one sentence or card and save it as the teacher.
[00:44:08] KaramKhaddour: Then check from the learner account.
[00:44:14] Customer: I will.
[00:44:26] Customer: I edited the meaning.
[00:44:30] Customer: Can I regenerate it as a teacher?
[00:44:37] Customer: Rewrite now.
[00:44:40] Customer: Okay.
[00:44:47] Customer: By the way, it is [inaudible].
[00:44:58] Customer: It is not there.
[00:45:00] Customer: Anyway, it was the article.
[00:45:04] Customer: Okay.
[00:45:08] Customer: Great.
[00:45:09] Customer: It regenerated.
[00:45:10] Customer: It showed me a preview.
[00:45:13] Customer: I need to make sure.
[00:45:20] Customer: Regeneration.
[00:45:22] Customer: Did this save my changes?
[00:45:27] Customer: Rewrite.
[00:45:29] KaramKhaddour: Yes.
[00:45:30] Customer: Rewriting.
[00:45:34] Customer: I do not need to click anything.
[00:45:37] Customer: It looks right.
[00:45:42] Customer: Okay.
[00:45:42] Customer: I checked this.
[00:45:45] Customer: Then...
[00:45:47] KaramKhaddour: You can go to the learner account.
[00:45:50] Customer: Yes.
[00:45:51] Customer: I will go to the learner account.
[00:45:54] Customer: I see [inaudible].
[00:46:03] Customer: No cards here.
[00:46:06] Customer: The teacher has checked everything I marked.
[00:46:11] Customer: This is a built-in check.
[00:46:15] Customer: In study.
[00:46:19] Customer: Okay.
[00:46:22] Customer: I do not...
[00:46:24] Customer: Okay, yes.
[00:46:28] Customer: I do not see the teacher's marks.
[00:46:31] Customer: I assume this card was checked.
[00:46:35] KaramKhaddour: I think you probably need to refresh the page.
[00:46:39] Customer: Okay.
[00:46:41] Customer: Refresh the page.
[00:46:44] Customer: Then I see here...
[00:46:48] Customer: Checked by the teacher.
[00:46:50] Customer: Nice.
[00:46:51] Customer: I see the status.
[00:46:53] Customer: We can even click a button.
[00:46:58] Customer: It is for the sentence.
[00:47:01] Customer: Okay.
[00:47:03] Customer: Then...
[00:47:07] KaramKhaddour: Okay.
[00:47:08] Customer: Yes.
[00:47:09] Customer: It was about...
[00:47:12] Customer: It was about...
[00:47:18] Customer: I forgot the word in English.
[00:47:24] Customer: It was about plants.
[00:47:26] Customer: Now it is about people.
[00:47:28] Customer: The sentence is new.
[00:47:31] Customer: It is a new one.
[00:47:33] Customer: It is the same for the teacher and the student.
[00:47:38] Customer: It worked.
[00:47:40] KaramKhaddour: Okay.
[00:47:41] KaramKhaddour: It is a pass, right?
[00:47:42] Customer: Yes.
[00:47:43] Customer: Okay.
[00:47:44] KaramKhaddour: Those are the three acceptance tests on production.
[00:47:50] KaramKhaddour: Thank you.
[00:47:52] KaramKhaddour: Now, quality checks and project goals.
[00:47:55] KaramKhaddour: We have seven quality checks.
[00:47:57] KaramKhaddour: Three have passed.
[00:48:01] KaramKhaddour: The code checks run from a clean copy of the project.
[00:48:06] KaramKhaddour: The server restart check.
[00:48:09] KaramKhaddour: A failed request can be traced and diagnosed.
[00:48:13] KaramKhaddour: We can demonstrate that through OpenObserve.
[00:48:17] KaramKhaddour: For example, the server-error metrics.
[00:48:20] KaramKhaddour: One quality check has failed so far.
[00:48:24] KaramKhaddour: That is the usability test.
[00:48:25] KaramKhaddour: We have 75% against the 80% bar.
[00:48:30] KaramKhaddour: We will try to change that today with our fifth participant.
[00:48:36] KaramKhaddour: We have no results yet for the other quality checks.
[00:48:39] KaramKhaddour: The first is keeping each person's data and API key private.
[00:48:46] KaramKhaddour: If you remember, a user can put their API key in the browser.
[00:48:52] KaramKhaddour: I think we need to prove that.
[00:48:56] Customer: Yes.
[00:48:57] Customer: Or leave it as not dropped, but not achieved.
[00:49:04] KaramKhaddour: Okay.
[00:49:05] Customer: Not quite.
[00:49:07] KaramKhaddour: Okay.
[00:49:08] KaramKhaddour: The second is the quality of generated sentences.
[00:49:13] KaramKhaddour: That has not been checked either.
[00:49:20] KaramKhaddour: The final one is the layout on phones.
[00:49:23] KaramKhaddour: We have not proved whether that meets the requirement yet.
[00:49:30] KaramKhaddour: The quality on phones.
[00:49:37] KaramKhaddour: Okay.
[00:49:37] KaramKhaddour: Now, the goals.
[00:49:40] KaramKhaddour: Goal one.
[00:49:41] KaramKhaddour: Four learners outside the team turn their own texts into cards and study them on computers and phones, in Firefox and Chrome, then return another day to review.
[00:49:53] KaramKhaddour: That is the goal.
[00:49:54] KaramKhaddour: The goal was for four learners outside the team to try the product on phones and computers.
[00:50:02] KaramKhaddour: So far, four outside learners have tried it on computers.
[00:50:09] KaramKhaddour: No one has tried it on a phone.
[00:50:14] KaramKhaddour: We did not ask which browser they used.
[00:50:21] KaramKhaddour: We cannot really say whether the goal was successful.
[00:50:27] KaramKhaddour: We also could not ask them to return and try it another day.
[00:50:36] KaramKhaddour: Goal two.
[00:50:36] KaramKhaddour: At least 80% of first-generated cards are good enough to keep without editing, checked on 30 cards each in Russian, English, and German.
[00:50:47] KaramKhaddour: We did not carry out that goal.
[00:50:50] KaramKhaddour: We do not really have users interested in judging the quality of the cards they generate.
[00:51:03] KaramKhaddour: Goal three.
[00:51:04] KaramKhaddour: A teacher outside the team corrects a shared deck of ten cards.
[00:51:11] KaramKhaddour: The third test today showed that sharing and correcting work.
[00:51:15] KaramKhaddour: Without an outside teacher, this goal cannot pass either.
[00:51:27] KaramKhaddour: Yes.
[00:51:31] KaramKhaddour: Should we change these goals based on our resources?
[00:51:40] KaramKhaddour: The first goal was about...
[00:51:44] KaramKhaddour: Let's start with the last goal.
[00:51:46] KaramKhaddour: A teacher outside the team would try being a teacher in this application.
[00:51:53] Customer: You do not have access to a real teacher, I guess.
[00:51:59] Customer: You will not realistically achieve this goal.
[00:52:03] KaramKhaddour: Mm-hmm.
[00:52:08] Customer: Can we say that the project has failed because no teacher tried it?
[00:52:22] Customer: I think not; it can be tried later in a pilot with real students and teachers.
[00:52:33] KaramKhaddour: So...
[00:52:35] Customer: We can pretend you are going to check it later.
[00:52:39] Customer: We can either keep the goal open or drop it, depending on whether it will be included in the pilot.
[00:52:58] KaramKhaddour: Okay.
[00:53:00] Customer: What do you suggest?
[00:53:06] Customer: Assume you include it in the pilot and will test it there, or drop it?
[00:53:25] KaramKhaddour: I am not sure.
[00:53:27] KaramKhaddour: Maybe we can say we could test it as a pilot.
[00:53:31] KaramKhaddour: That could be a possibility.
[00:53:32] KaramKhaddour: Okay.
[00:53:34] KaramKhaddour: The second goal was for at least 80% of first-generated cards to be good enough to keep without editing, but that also needs interested users.
[00:53:51] KaramKhaddour: So...
[00:53:56] Customer: Okay.
[00:53:57] Customer: Did those goals have dates or deadlines by which you should achieve something?
[00:54:09] KaramKhaddour: I am not sure.
[00:54:10] KaramKhaddour: I am not sure whether they were attached to a specific milestone.
[00:54:15] Customer: You are naming the goals from the threshold of success, right?
[00:54:22] KaramKhaddour: Mm-hmm.
[00:54:23] Customer: Each goal must be SMART, so it should be time-bound.
[00:54:32] Customer: Yes.
[00:54:33] Customer: Did you make it time-bound?
[00:54:39] Customer: Can you check the file?
[00:54:41] Customer: Maybe it is written there.
[00:54:45] KaramKhaddour: To be honest, I am not sure, because I am reading from my meeting script.
[00:54:53] KaramKhaddour: Mm-hmm.
[00:54:54] KaramKhaddour: I need to go to GitHub and see whether my teammates have that information.
[00:55:07] Customer: Take your time.
[00:56:08] KaramKhaddour: I cannot find that information.
[00:56:11] KaramKhaddour: What difference does it make whether it is time-bound when deciding whether to drop it?
[00:56:21] Customer: We can just check whether it was achieved.
[00:56:27] Customer: I think I found the file.
[00:56:33] Customer: Do you see it?
[00:56:34] Customer: Threshold of success.
[00:56:36] Customer: I am sharing my screen.
[00:56:38] KaramKhaddour: Mm-hmm.
[00:56:39] Customer: Okay.
[00:56:40] Customer: You have three goals.
[00:56:43] Customer: You set three goals.
[00:56:45] KaramKhaddour: Nice.
[00:56:46] Customer: Let's follow the procedure strictly.
[00:56:49] Customer: Okay?
[00:56:50] Customer: You defined the threshold of success.
[00:56:53] Customer: You stated that the project counts as successful only when all three goals are achieved.
[00:57:00] KaramKhaddour: Mm-hmm.
[00:57:01] Customer: If one is not achieved, the project is not successful.
[00:57:07] Customer: Okay.
[00:57:19] Customer: Mm-hmm.
[00:57:21] Customer: Mm-hmm.
[00:57:37] Customer: Yes.
[00:57:39] Customer: I am sorry to say this, but you missed your own goal.
[00:57:53] Customer: We can check the other goals.
[00:57:57] Customer: Let's check them.
[00:57:59] KaramKhaddour: Goals two and three are also fake.
[00:58:01] KaramKhaddour: Yes.
[00:58:01] KaramKhaddour: Goal two needs real people to use it, I think, and goal three also needs real people to use it.
[00:58:09] Customer: Strictly speaking, you failed the project because you did not deliver on your goals.
[00:58:18] KaramKhaddour: Mm-hmm.
[00:58:19] Customer: Overall, you built a pretty solid MVP.
[00:58:24] Customer: I am pretty satisfied with it.
[00:58:27] Customer: But from the project point of view, you failed it.
[00:58:32] KaramKhaddour: Mm-hmm.
[00:58:34] Customer: Okay.
[00:58:38] KaramKhaddour: The problem was probably in our goals.
[00:58:42] Customer: Yes, goal setting and revising the goals.
[00:58:48] Customer: Yes.
[00:58:49] Customer: We could drop those goals and set some other ones now, but that would not be very honest.
[00:58:59] KaramKhaddour: Okay.
[00:59:00] Customer: We are in the last week of the project.
[00:59:03] KaramKhaddour: Mm-hmm.
[00:59:06] Customer: It is not punishable.
[00:59:08] Customer: It is okay that you missed some goals you set, but it is a lesson.
[00:59:14] Customer: Set realistic, achievable goals.
[00:59:21] Customer: Yes.
[00:59:23] Customer: Okay.
[00:59:24] KaramKhaddour: Okay.
[00:59:25] KaramKhaddour: Those are all my questions today.
[00:59:28] KaramKhaddour: I have some other questions, but I will probably send them to you in a file tomorrow.
[00:59:36] KaramKhaddour: Please answer them if you can.
[00:59:39] KaramKhaddour: Mm-hmm.
[00:59:40] Customer: Yes, I can.
[00:59:42] KaramKhaddour: Thank you.
[00:59:43] KaramKhaddour: That is all from our side.
[00:59:46] KaramKhaddour: Do you have any questions for us?
[00:59:49] Customer: No, not really.
[00:59:51] Customer: Thank you.
[00:59:52] Customer: Thanks for presenting your progress, and good luck on demo day and the exam.
