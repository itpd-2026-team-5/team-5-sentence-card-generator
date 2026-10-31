# Week 5 Customer Validation Transcript

- **Date:** 2026-10-31.
- **Participants:** Customer, KaramKhaddour, Byakko-san, Horokk1, saleemasekrea000.

[00:00:01] KaramKhaddour: Can we record the meeting?
[00:00:05] Customer: Yes, sure.
[00:00:06] KaramKhaddour: And share the transcript in our report?
[00:00:09] KaramKhaddour: Yes.
[00:00:10] KaramKhaddour: Okay, thank you.
[00:00:14] KaramKhaddour: First, we now have an interface language setting.
[00:00:19] KaramKhaddour: We didn't have this before.
[00:00:21] KaramKhaddour: You can choose which language the application works in: English, German, or Russian.
[00:00:27] KaramKhaddour: This is the first improvement.
[00:00:30] KaramKhaddour: For Teaching, I am currently logged into a teacher account, so I can see both the learner and teacher sides.
[00:00:42] KaramKhaddour: Here, for example, I tried to simplify the tables the teacher looks at.
[00:00:50] KaramKhaddour: First, we have the decks that students shared with the teacher.
[00:00:56] KaramKhaddour: And then if you enter one deck, you will see the cards.
[00:01:00] KaramKhaddour: If you open a card, you can see detailed information about it.
[00:01:08] KaramKhaddour: You can mark it as looking right, so it is okay for the student to study, or change whatever you want.
[00:01:16] KaramKhaddour: We also added pronunciation buttons for each section.
[00:01:24] KaramKhaddour: There is the sentence in German, the sentence in English, the word as it appears, and its meaning.
[00:01:32] KaramKhaddour: Currently, we still use a browser function for pronunciation.
[00:01:40] KaramKhaddour: We have not connected an external pronunciation service yet.
[00:01:47] KaramKhaddour: So we still have the same limitation as last time.
[00:01:51] KaramKhaddour: Different browsers or machines may produce slightly different pronunciation because it depends on the browser and operating system.
[00:02:06] KaramKhaddour: So we tried to make it simpler for the teacher to use the application.
[00:02:11] KaramKhaddour: Last time, it was very dense.
[00:02:13] KaramKhaddour: There were a lot of columns, and each column had a lot of information.
[00:02:17] KaramKhaddour: So now it's much simpler.
[00:02:19] KaramKhaddour: There is a card.
[00:02:20] KaramKhaddour: You can open the card and check it, and that's it.
[00:02:32] KaramKhaddour: One second, please, while I check my notes.
[00:02:50] KaramKhaddour: We also fixed some smaller UI elements that were not correct.
[00:02:55] KaramKhaddour: Some UI elements did not have the correct design, such as a dropdown list or the file chooser.
[00:03:01] KaramKhaddour: They were using the default behavior of the browser.
[00:03:05] KaramKhaddour: We changed the behavior of these UI elements.
[00:03:10] KaramKhaddour: And yes, we also had a bug.
[00:03:14] KaramKhaddour: Context from different languages was being sent to the LLM.
[00:03:22] KaramKhaddour: For example, if you were learning German and Russian, Russian context was being sent for German generation.
[00:03:29] KaramKhaddour: Now we keep them separate.
[00:03:31] KaramKhaddour: That fixes this bug.
[00:03:33] KaramKhaddour: We also tried to make the application more responsive on mobile.
[00:03:39] KaramKhaddour: Last time, many elements needed horizontal scrolling on mobile.
[00:03:48] KaramKhaddour: I tried to make it work.
[00:03:51] KaramKhaddour: I think we still need some time to make it fully responsive, but it is better than last time.
[00:03:57] KaramKhaddour: These are the main additions to the codebase since last week.
[00:04:05] KaramKhaddour: We also deployed the application.
[00:04:10] KaramKhaddour: saleemasekrea000, can you send the deployment link?
[00:04:22] KaramKhaddour: saleemasekrea000, can you hear me?
[00:04:23] KaramKhaddour: I sent you a Telegram message.
[00:04:26] KaramKhaddour: Okay, one second.
[00:04:29] KaramKhaddour: Unfortunately, it is not opening for me now, I think because I need to connect to...
[00:04:42] KaramKhaddour: Thank you, saleemasekrea000.
[00:04:44] KaramKhaddour: If you are connected to the university student network or the university network, you should be able to connect to the IP address.
[00:04:53] KaramKhaddour: Oh, okay.
[00:04:53] KaramKhaddour: It also connects for me.
[00:04:55] KaramKhaddour: Nice, nice.
[00:04:57] KaramKhaddour: Okay, I'll share my screen.
[00:05:00] KaramKhaddour: Yes, it works.
[00:05:03] KaramKhaddour: One second, please.
[00:05:06] KaramKhaddour: Yeah, it works.
[00:05:13] KaramKhaddour: One second, I will send you the credentials as well.
[00:05:22] KaramKhaddour: saleemasekrea000, can you send the credentials?
[00:05:26] KaramKhaddour: Yes.
[00:05:28] KaramKhaddour: Okay, thank you.
[00:05:40] Customer: Okay, this is...
[00:05:41] KaramKhaddour: Customer, you can see the credentials in the chat.
[00:05:50] Customer: Okay, I see.
[00:05:53] KaramKhaddour: Yes, for the teacher account.
[00:05:55] KaramKhaddour: Okay, teacher account.
[00:05:57] KaramKhaddour: This is demo data created by a script we have.
[00:06:10] KaramKhaddour: I added the script last week because you told me you could not create an account.
[00:06:16] KaramKhaddour: There was a problem creating an account because...
[00:06:20] KaramKhaddour: The application was not deployed yet.
[00:06:23] KaramKhaddour: That is why I created a script to generate seed data.
[00:06:27] KaramKhaddour: So the application is usable.
[00:06:32] KaramKhaddour: I think those are all the additions to the codebase since last week.
[00:06:45] KaramKhaddour: Do you have any questions for us?
[00:06:49] Customer: Right now I am looking at the application on mobile.
[00:07:00] Customer: It seems pretty responsive.
[00:07:04] Customer: Yeah.
[00:07:09] Customer: I think I will switch to the desktop version for now.
[00:07:16] Customer: Okay.
[00:07:18] Customer: So what happens when you switch the interface language?
[00:07:25] KaramKhaddour: It should switch the names of...
[00:07:30] KaramKhaddour: Yes, can you see my screen?
[00:07:34] Customer: Okay.
[00:07:35] KaramKhaddour: Russian, thanks.
[00:07:40] Customer: Great.
[00:07:42] Customer: Okay, let's switch to English.
[00:07:47] Customer: What if you switch to German, like Deutsch?
[00:07:50] Customer: Does it?
[00:07:53] KaramKhaddour: The translation is AI-generated, so it needs testing by people.
[00:08:03] Customer: Honestly, I don't know what the best UX practices are regarding switching the language.
[00:08:14] Customer: Right now the interface is in German.
[00:08:16] Customer: If you click Deutsch, please...
[00:08:22] Customer: Should other language names be in German as well?
[00:08:27] Customer: Or should they be like this?
[00:08:32] KaramKhaddour: I think each language should be written in its own language, because the application might be in English when you do not speak English.
[00:08:45] KaramKhaddour: When you search for your language, you should be able to recognize it.
[00:08:51] KaramKhaddour: Maybe you speak Russian, but you don't speak English.
[00:08:55] KaramKhaddour: If Russian is also written in English, you might not know it is Russian, right?
[00:09:01] Customer: Right.
[00:09:04] Customer: But if you do not know Russian and see "Ruski", how do you know it is Russian?
[00:09:16] KaramKhaddour: I think you should just stick to your language in this case, no?
[00:09:25] KaramKhaddour: For example, when you search for a language in a mobile operating system, it is usually written in that language.
[00:09:43] Customer: Okay, let me check in Linux.
[00:09:51] Customer: Okay, Linux.
[00:09:53] Customer: Yeah, Linux shows not German, but Deutsch.
[00:09:59] Customer: It also shows "Ruski" rather than "Russian".
[00:10:04] Customer: Okay, let's keep it like this.
[00:10:10] Customer: I do not see a case where users need to switch the interface to a language they do not know.
[00:10:21] Customer: An unknown language.
[00:10:23] Customer: Rather, they would want to switch it back to a known language.
[00:10:28] Customer: Okay, so I agree with the current design for languages.
[00:10:36] Customer: Okay, regarding languages for new decks.
[00:10:40] Customer: Here, German is in English.
[00:10:42] Customer: That seems right.
[00:10:47] Customer: Because it aligns with the interface.
[00:10:51] Customer: It says, "Also learning Russian", "New decks use the pair above", and "A deck can use any language you learn".
[00:11:00] Customer: So, yeah, why do you need this setting?
[00:11:06] KaramKhaddour: Let us say you choose German and your level in German.
[00:11:12] KaramKhaddour: When you create a new deck, we assume you will use that.
[00:11:15] KaramKhaddour: The default will be this pair.
[00:11:18] KaramKhaddour: It will use the language pair and level you chose.
[00:11:22] KaramKhaddour: When you create a new deck, you can override the default.
[00:11:31] KaramKhaddour: Because the default will be what you put in the settings.
[00:11:34] KaramKhaddour: If you want to override the defaults, you can put that in the specific deck instructions.
[00:11:47] Customer: Yeah, I remember this mechanism.
[00:11:51] Customer: But could you please go to settings?
[00:11:55] Customer: So here I see languages for new decks.
[00:12:00] Customer: So my question is, why do I need this?
[00:12:05] Customer: Like, the UI could be a bit different.
[00:12:10] Customer: If you want to collect proficiency levels for specific languages, the language selection could be in the "Your level in each language" card.
[00:12:29] Customer: But right now, there are two or three languages visible here.
[00:12:35] Customer: German and Russian; is English visible here?
[00:12:41] KaramKhaddour: For the languages you want to learn?
[00:12:44] Customer: Your level in each language.
[00:12:47] KaramKhaddour: No, a language level appears only for the languages you want to learn.
[00:12:54] Customer: Yeah.
[00:12:57] KaramKhaddour: Okay.
[00:13:08] KaramKhaddour: Okay, I don't understand.
[00:13:20] Customer: I still do not understand why you need this "Languages for new decks" card, or module, or whatever it is called.
[00:13:32] Customer: I see the explanation here.
[00:13:36] Customer: New decks use the pair above.
[00:13:38] Customer: A deck can use any language you learn.
[00:13:42] Customer: So decks are created from cards that come from text.
[00:13:50] Customer: Texts are written in particular languages, so a pair may not apply to a text.
[00:13:57] Customer: Why do we need this language-pair setting?
[00:14:04] KaramKhaddour: When you insert a text and want to generate cards, you choose which deck to put the cards in.
[00:14:18] KaramKhaddour: The deck has a language pair, such as German to English.
[00:14:25] KaramKhaddour: We need to know that you speak English, or at least the deck should behave as though you speak English.
[00:14:35] KaramKhaddour: If you want to use a new deck, we use the defaults.
[00:14:43] KaramKhaddour: Let us say you want to generate cards in a new deck without any instructions.
[00:14:51] KaramKhaddour: We use the defaults from Settings.
[00:14:55] Customer: But a deck cannot exist without information about its language pair.
[00:15:08] Customer: I would put a couple of filters here, such as German to English, and filter the available decks by that pair.
[00:15:22] Customer: If no deck is available and the list is empty, users can create a new deck if they want.
[00:15:31] KaramKhaddour: We would tell them to create a new deck and take them to the new-deck page.
[00:15:37] KaramKhaddour: After they do that, would we tell them to create the text?
[00:15:42] KaramKhaddour: Or create the cards.
[00:15:45] Customer: Yeah, maybe like that.
[00:15:53] Customer: Or you could create a new deck with the selected words and language pair.
[00:16:03] Customer: They select the source and destination, or known and target languages.
[00:16:13] Customer: Then they click "Generate sentences", or whatever you call it.
[00:16:20] Customer: And like, and they select new deck.
[00:16:23] Customer: The generated card goes into that new deck, for example.
[00:16:29] Customer: And the deck already gets this pair of languages.
[00:16:35] Customer: Okay.
[00:16:39] Customer: I think this should simplify deck creation and choosing a deck for new cards.
[00:16:55] Customer: Okay.
[00:16:57] Customer: Okay.
[00:17:05] Customer: Okay, let's go back to the settings, please.
[00:17:09] Customer: [inaudible]
[00:17:11] Customer: Yeah.
[00:17:17] Customer: If we remove "Languages for new decks", language selection can move to "Your level in each language".
[00:17:32] Customer: There are no other places where you need that information about the languages they study or know.
[00:17:41] Customer: Here, they can select each language and its level.
[00:17:50] Customer: Okay, sentence length.
[00:17:56] Customer: I think some vertical-alignment issues remain here.
[00:18:06] Customer: The word "to" between the input fields is aligned to the bottom.
[00:18:15] Customer: Maybe it should move a bit higher.
[00:18:19] Customer: Okay, and so, okay, great.
[00:18:21] Customer: There is some sound setting.
[00:18:23] Customer: Read each sentence aloud when the card appears.
[00:18:26] Customer: You can also switch during study with the speaker button.
[00:18:34] Customer: Great.
[00:18:37] Customer: So they can disable sound.
[00:18:41] Customer: If they disable sound here, it will be disabled by default in the decks, right?
[00:18:46] KaramKhaddour: Yes.
[00:18:47] KaramKhaddour: The current default is that you hear the card when you open it.
[00:18:56] Customer: If they override the setting during study, will the override persist between sessions?
[00:19:12] KaramKhaddour: It should not, no.
[00:19:14] KaramKhaddour: If you override it during study, it should not change the default.
[00:19:21] KaramKhaddour: It's only for one session.
[00:19:22] KaramKhaddour: You change it inside your study session.
[00:19:27] Customer: Okay.
[00:19:34] Customer: I'm not sure I agree with you.
[00:19:37] Customer: Like, this is a global setting.
[00:19:39] Customer: Mm-hmm.
[00:19:41] Customer: If they want sound off by default for some decks but not others, having to override it every session could be inconvenient.
[00:20:07] Customer: Okay.
[00:20:08] Customer: So.
[00:20:14] Customer: On the other hand, actually, how does it look on mobile?
[00:20:26] Customer: Like, could you switch to the mobile version of this site?
[00:20:32] Customer: Uh-huh.
[00:20:36] Customer: And scroll down, please.
[00:20:38] Customer: Go to the home screen.
[00:20:42] Customer: Or, like, where is it?
[00:20:44] Customer: Somewhere at the bottom, I guess.
[00:20:48] Customer: Oh, there's a problem.
[00:20:53] KaramKhaddour: Oh, okay.
[00:20:54] KaramKhaddour: There's a problem.
[00:20:58] KaramKhaddour: It should appear, but it is not appearing.
[00:21:01] KaramKhaddour: It should appear at the bottom.
[00:21:04] Customer: Oh.
[00:21:05] KaramKhaddour: It should appear here so you can switch between sections.
[00:21:13] Customer: Okay.
[00:21:14] Customer: I wonder whether we should put the sound setting here at the top of the screen.
[00:21:20] Customer: Mm-hmm.
[00:21:21] Customer: In the right corner.
[00:21:23] Customer: They could switch it off, and it would apply to any session while it is off.
[00:21:36] Customer: Okay.
[00:21:37] Customer: It would be easy to discover.
[00:21:40] Customer: And I think, yeah, okay.
[00:21:47] Customer: Then we could avoid persisting overrides.
[00:21:52] Customer: If sound is switched off globally, it is off in every deck.
[00:22:09] Customer: If it is switched on, overrides apply only to one session.
[00:22:19] Customer: Or should they?
[00:22:20] Customer: Or should they be kept between sessions?
[00:22:25] Customer: I'm not sure.
[00:22:26] KaramKhaddour: If we put it here as a global setting, it will persist between sessions.
[00:22:33] KaramKhaddour: If we change it inside a study session, we keep it only for that session.
[00:22:42] Customer: Mm-hmm.
[00:22:42] Customer: Maybe we do not even need a study-session override.
[00:22:47] Customer: We could put the setting in one place.
[00:22:52] Customer: Then we would not let users turn off sound during a study session.
[00:23:01] Customer: Would that be okay?
[00:23:03] Customer: Or there are some cases when they need to quickly turn off the sound?
[00:23:08] KaramKhaddour: I think there are some cases, right?
[00:23:12] Customer: Maybe, yeah.
[00:23:13] Customer: They might be in a public place, someone talks to them, and they need to turn off sound quickly.
[00:23:26] Customer: Let us keep the override and apply it to a single session only.
[00:23:36] Customer: The default state will follow the global setting.
[00:23:44] Customer: Okay, could you please switch back to the desktop version and go to settings?
[00:23:53] Customer: Okay, so who writes the sentences, the service?
[00:24:00] Customer: Well, yeah, you demonstrated this last time.
[00:24:04] Customer: Sixteen cards kept as generated, regenerated...
[00:24:08] Customer: You moved the counters here, nice.
[00:24:11] Customer: Edited by hand, archived, deleted.
[00:24:15] Customer: Okay.
[00:24:16] Customer: Okay.
[00:24:18] Customer: It says "Tokens as the provider reported them": zero in, zero out.
[00:24:24] Customer: Okay, I don't know.
[00:24:28] Customer: Maybe tokens should not be reported.
[00:24:34] Customer: [inaudible]
[00:24:37] Customer: Yeah, this may be removed, actually.
[00:24:42] Customer: Okay, then we can proceed to teaching.
[00:24:52] Customer: So, you improved something.
[00:25:00] Customer: So, weren't you in a teacher's account?
[00:25:04] KaramKhaddour: I was in a teacher account when I shared my local screen, but after saleemasekrea000 shared the deployed version, I entered the learner account.
[00:25:17] Customer: But I still saw Teaching...
[00:25:21] KaramKhaddour: Teaching appears for everyone.
[00:25:23] Customer: Oh, got it.
[00:25:25] Customer: Good, yeah.
[00:25:27] Customer: So, should we make a difference?
[00:25:36] Customer: I don't think so.
[00:25:43] Customer: Let us keep Teaching, because everyone can become a teacher at some point.
[00:25:50] Customer: A student shares a deck with you by your email.
[00:25:56] Customer: You see only the decks they share.
[00:25:59] Customer: You can correct every card in them.
[00:26:01] Customer: So, what does it show when you have no students?
[00:26:09] KaramKhaddour: Okay, let's switch to the learner account, and you'll see.
[00:26:33] Customer: It shows the same phrase and "No shared decks yet".
[00:26:41] Customer: Share it with your email.
[00:26:44] Customer: What is my email?
[00:26:46] KaramKhaddour: The email you used to create your account.
[00:26:50] Customer: I think it might be convenient to show it somewhere here.
[00:26:56] Customer: Okay.
[00:26:57] Customer: I would not know I need to go to Settings to remind myself of the email.
[00:27:05] Customer: Where can I see my email in settings, by the way?
[00:27:10] Customer: Oh, okay, somewhere at the bottom.
[00:27:13] Customer: It is not a very intuitive place.
[00:27:16] Customer: I mean for this particular teaching case.
[00:27:21] Customer: Overall, I guess it is where it is usually placed on various sites.
[00:27:34] Customer: Somewhere at the bottom, like, sign out.
[00:27:37] Customer: Okay.
[00:27:40] Customer: Go back to teacher account.
[00:27:42] Customer: Yeah, let's go back.
[00:27:58] Customer: Nice, two students.
[00:28:01] Customer: Ah, one student.
[00:28:03] Customer: Two different decks.
[00:28:04] Customer: Yes.
[00:28:07] Customer: Cards, Asked, Left to check: five.
[00:28:10] Customer: Cards is the total number of cards, right?
[00:28:15] KaramKhaddour: Yes, Asked means the student is mentioning you on a card and telling you something about it.
[00:28:26] KaramKhaddour: And what is left to check.
[00:28:29] Customer: And one is what?
[00:28:30] KaramKhaddour: For example, the student shared this deck with you.
[00:28:41] KaramKhaddour: They asked you to look at this particular card.
[00:28:45] KaramKhaddour: They opened the card, selected "Ask teacher", and perhaps wrote you a note.
[00:28:52] KaramKhaddour: That is why you have one here.
[00:28:55] KaramKhaddour: Left to check is because you have already checked this one.
[00:28:59] KaramKhaddour: You only have these three left to check.
[00:29:06] Customer: Okay, so, left to check.
[00:29:14] Customer: Why do zero and one look different?
[00:29:22] KaramKhaddour: Here?
[00:29:23] Customer: Yeah.
[00:29:25] KaramKhaddour: Here, the student did not ask you to check anything in this deck.
[00:29:30] KaramKhaddour: Let us say you have this state.
[00:29:36] KaramKhaddour: Okay, that's not a good example.
[00:29:40] KaramKhaddour: One second, please.
[00:29:42] KaramKhaddour: Let us go through the whole session here.
[00:29:54] KaramKhaddour: For the title, we will put some text in German.
[00:30:19] KaramKhaddour: Okay, that's annoying.
[00:30:24] KaramKhaddour: I created a text.
[00:30:37] KaramKhaddour: I will learn this text.
[00:30:39] KaramKhaddour: Generate one card.
[00:30:46] KaramKhaddour: Okay, that's a problem.
[00:30:48] KaramKhaddour: The deployed version cannot reach the cloud API.
[00:30:55] Customer: Yeah, because we're in Russia.
[00:30:59] KaramKhaddour: That is different from my localhost, where I can reach the cloud API without a VPN.
[00:31:08] KaramKhaddour: That's weird, right?
[00:31:12] KaramKhaddour: Okay, so I'll show you an account.
[00:31:19] Customer: Maybe you can switch to localhost if you really want to demonstrate this.
[00:31:24] Customer: I think it will be the same.
[00:31:29] KaramKhaddour: Let us say I have no teacher for this deck.
[00:31:36] KaramKhaddour: I will go inside it and enter your name.
[00:31:42] KaramKhaddour: [redacted]
[00:31:48] KaramKhaddour: So now I'm sharing the whole deck with you.
[00:31:52] KaramKhaddour: But I might want you to look at this particular card.
[00:31:59] KaramKhaddour: I open the card and select "Ask teacher".
[00:32:06] KaramKhaddour: For example, I will say, "This is very hard".
[00:32:17] KaramKhaddour: Now this card will get more of the teacher's attention.
[00:32:25] KaramKhaddour: If we go to the teacher account, we should see the changes.
[00:32:48] KaramKhaddour: Now we have three.
[00:32:50] KaramKhaddour: We changed this one and added this one.
[00:32:53] KaramKhaddour: You can see we did this.
[00:32:56] KaramKhaddour: As I remember, yes.
[00:32:59] KaramKhaddour: The student request.
[00:33:00] KaramKhaddour: "This is very hard for me".
[00:33:03] KaramKhaddour: You can change the sentence, rewrite it, and so on.
[00:33:12] KaramKhaddour: That is the difference between having the whole deck shared with you and being asked about one card in that deck.
[00:33:32] Customer: That zero was not formatted in any particular way.
[00:33:41] KaramKhaddour: This one?
[00:33:42] Customer: It means this deck does not contain any cards that need my attention.
[00:33:50] Customer: Basically.
[00:33:51] Customer: Okay.
[00:33:55] Customer: Okay.
[00:34:02] Customer: There is some inconsistency in the formatting, but I understand.
[00:34:12] Customer: When you open a deck where the student has not asked you to review anything...
[00:34:18] KaramKhaddour: You can still do everything.
[00:34:21] KaramKhaddour: You can still [inaudible] the cards, and so on.
[00:34:29] Customer: Okay, we'll review it.
[00:34:32] Customer: Requests from the student appear first.
[00:34:36] Customer: You can edit cards, but you cannot reorder them, right?
[00:34:42] Customer: In the deck.
[00:34:44] KaramKhaddour: No, you cannot.
[00:34:44] Customer: Okay, okay.
[00:34:52] Customer: Can a student reorder cards in their deck?
[00:34:58] Customer: Like you have decks here.
[00:34:59] Customer: Yeah.
[00:35:01] KaramKhaddour: But what is the benefit of that?
[00:35:11] Customer: I do not quite remember how cards are scheduled in your case.
[00:35:16] Customer: Which cards go first?
[00:35:18] KaramKhaddour: I think it should follow the algorithm.
[00:35:21] KaramKhaddour: FS...
[00:35:21] KaramKhaddour: I forgot the name of the algorithm, but do you know what I mean?
[00:35:30] Customer: Yeah, FSRS.
[00:35:33] Customer: Something like free spaced repetition.
[00:35:39] Customer: Okay, yeah.
[00:35:42] Customer: That's for the cards that I studied.
[00:35:45] Customer: Yeah.
[00:35:47] KaramKhaddour: I think the older ones appear at the beginning and the new ones at the bottom.
[00:35:55] Customer: Okay.
[00:36:00] Customer: But as a student, I would sometimes like to learn some words earlier.
[00:36:08] Customer: What do I do in this case?
[00:36:13] Customer: Can I reorder the cards in the deck?
[00:36:17] KaramKhaddour: No, I think no, you cannot.
[00:36:19] KaramKhaddour: Should we add that?
[00:36:22] Customer: It would be very nice to add it, because I am curious.
[00:36:25] KaramKhaddour: If you change the order of the cards, would that also change the order in which they are learned?
[00:36:39] Customer: You keep the progress and just change the order.
[00:36:45] KaramKhaddour: Would changing the order only affect the UI, or would it affect the study session?
[00:37:01] Customer: It's a good question.
[00:37:04] Customer: So there are two ways.
[00:37:10] Customer: It would definitely affect the study session.
[00:37:16] Customer: Okay, there are two ways.
[00:37:18] Customer: One option is not to allow reordering cards the student has already studied, and to show them when they are due.
[00:37:31] Customer: Another option is to allow reordering those cards, so new cards can appear before cards they have already studied.
[00:37:46] Customer: Then those older cards would need to be rescheduled somehow.
[00:37:52] Customer: So this is a good question, we can discuss it.
[00:37:58] Customer: Which approach should we pursue?
[00:38:04] KaramKhaddour: You said Anki has it, right?
[00:38:06] KaramKhaddour: Maybe we can follow its behavior for the first version of this feature.
[00:38:16] Customer: As far as I remember, Anki does not have it.
[00:38:21] Customer: It lets you study cards in the order they were added.
[00:38:37] Customer: I do not know whether it allows a custom order.
[00:38:44] Customer: There have been some recent Anki updates, so maybe they added something like that.
[00:38:49] Customer: When I used Anki, each card had a unique numeric identifier and some learning progress associated with it.
[00:39:09] Customer: When I wanted to reorder cards, I needed to change that numeric identifier.
[00:39:19] Customer: That was so I could put a card between two others.
[00:39:24] Customer: For example, I had cards numbered two and three.
[00:39:31] Customer: One, two, three, four.
[00:39:33] Customer: I had studied cards one and two.
[00:39:36] Customer: I wanted to study card four before card three.
[00:39:43] Customer: I could move card four between two and three.
[00:39:50] Customer: But which number is between two and three?
[00:39:53] Customer: I had to change a card's identifier.
[00:40:02] Customer: If I wanted to move it between one and two, I would need something like 1.5.
[00:40:18] Customer: We do not know how many cards we might want to insert this way.
[00:40:24] Customer: We would probably keep dividing those intervals in half.
[00:40:30] Customer: First, we divide the interval between two and three in half.
[00:40:33] Customer: We get two and a half.
[00:40:35] Customer: To insert another card in that interval, we split it in two again.
[00:40:44] Customer: And so on.
[00:40:46] Customer: Since floating-point numbers have finite precision, you cannot do this indefinitely.
[00:40:57] Customer: You cannot keep inserting new cards indefinitely.
[00:41:02] Customer: Reordering in Anki is a nightmare.
[00:41:11] Customer: In your case, we are not constrained by that problem.
[00:41:20] Customer: We should at least keep the order separate from card identifiers.
[00:41:28] Customer: This should allow us to freely move cards.
[00:41:42] Customer: Okay, but what about the progress of cards that you studied before?
[00:41:49] Customer: If you move new cards before an old card, the old card will be studied later than scheduled.
[00:42:01] Customer: And I'm not quite sure what to do with this.
[00:42:05] Customer: Maybe just accept this.
[00:42:11] Customer: You planned to show it at a particular time, but newer cards pushed it back through reordering.
[00:42:26] Customer: And you just show it later.
[00:42:30] Customer: And that's it.
[00:42:32] Customer: You would not show when it is due, because you do not know exactly when it will be scheduled with those new cards.
[00:42:49] Customer: You just show cards in the order they appear in the queue.
[00:42:59] KaramKhaddour: As I understand it, we will let users change the card order.
[00:43:08] KaramKhaddour: When studying, the algorithm will be the most important factor.
[00:43:14] KaramKhaddour: If two cards have the same score from the algorithm, we show them in the order the user chose in the deck.
[00:43:29] KaramKhaddour: Correct?
[00:43:30] KaramKhaddour: For example, "delay" and "platform" might have the same score from the algorithm.
[00:43:37] KaramKhaddour: If this one appears first, we show it first.
[00:43:40] KaramKhaddour: The most important weight will be the algorithm's score.
[00:43:48] KaramKhaddour: If the user rates this one medium and that one easy, we would show this one first.
[00:43:56] KaramKhaddour: Is this correct?
[00:44:01] Customer: Yes, but if the user then moves the second card before the first, they will see the second card first.
[00:44:31] Customer: I am exploring card rescheduling with another team.
[00:44:39] Customer: If it looks too complicated, we can explore other parts of the interface.
[00:44:49] Customer: For example, student-teacher interaction, which I am not exploring with the other team.
[00:45:00] Customer: We will focus on an offline application there.
[00:45:10] Customer: We can decide whether reordering is important for your project.
[00:45:22] Customer: And whether it's doable at all.
[00:45:29] KaramKhaddour: So it is a possible future feature, rather than something we need to work on next sprint, correct?
[00:45:40] Customer: Yeah, I think so.
[00:45:46] Customer: Okay.
[00:45:51] Customer: Good, okay.
[00:45:52] Customer: Let us postpone reordering and focus on what we have here.
[00:45:58] Customer: So there are two check labels.
[00:46:02] Customer: What do they mean?
[00:46:05] KaramKhaddour: It's left to check.
[00:46:08] Customer: Those are the ones you have not checked.
[00:46:10] Customer: Okay.
[00:46:12] Customer: When I open a card, what happens?
[00:46:15] Customer: The teacher opens the card.
[00:46:17] Customer: Okay.
[00:46:19] Customer: Looks right.
[00:46:20] Customer: Sentence.
[00:46:22] Customer: Translation.
[00:46:28] Customer: Why did you decide to put sentence and translation into the sidebar rather than on the card?
[00:46:38] KaramKhaddour: Initially, all the information was in the table, but the table became very large.
[00:46:44] KaramKhaddour: I simplified the table because otherwise you need to scroll horizontally.
[00:46:54] KaramKhaddour: And this is not a good idea.
[00:46:56] KaramKhaddour: Now all the information is in one place.
[00:47:02] Customer: But okay, you need to horizontally scroll on mobile, right?
[00:47:13] KaramKhaddour: I am not sure, but hopefully not in the future.
[00:47:18] KaramKhaddour: The goal is that we do not need to.
[00:47:21] KaramKhaddour: The goal is to avoid horizontal scrolling.
[00:47:28] Customer: Got it.
[00:47:30] Customer: If you put the sentence in the table, the teacher will definitely have to scroll on mobile because the screen is narrower than on a PC.
[00:47:54] Customer: Yes.
[00:47:54] Customer: But how would it look on desktop?
[00:47:58] Customer: Will the teacher still have to scroll?
[00:48:01] Customer: What do you think?
[00:48:05] KaramKhaddour: I don't know.
[00:48:06] Customer: If the sentence was in the table.
[00:48:11] KaramKhaddour: I think it could fit.
[00:48:15] KaramKhaddour: It could fit without horizontal scrolling.
[00:48:19] Customer: I am thinking about busy teachers who just want to look at the sentences and check that they are correct, without reading everything on each card.
[00:48:35] Customer: Opening every card and searching for its sentence on the right side of the screen might be inconvenient.
[00:48:47] Customer: And then click a button and so on.
[00:48:51] Customer: I think they would prefer to see everything in the table.
[00:48:57] Customer: I mean the commonly used information.
[00:49:10] Customer: The information they need to check.
[00:49:13] Customer: So they need to check the sentence.
[00:49:17] Customer: And its translation.
[00:49:19] Customer: And they need to approve.
[00:49:21] Customer: I would expect them to want the sentences here and an approval button.
[00:49:30] Customer: If they need more information, they can open a card.
[00:49:35] Customer: What do you think?
[00:49:36] KaramKhaddour: Okay.
[00:49:38] KaramKhaddour: We can do this.
[00:49:41] Customer: Great.
[00:49:42] Customer: Okay.
[00:49:48] Customer: I think that assumption is reasonable.
[00:49:50] Customer: So yeah, please do.
[00:49:52] Customer: Okay, open card.
[00:49:56] Customer: In study, the student's request...
[00:50:03] Customer: Yeah, so the teacher probably knows both languages.
[00:50:09] Customer: And they don't need to listen to the sound immediately.
[00:50:15] Customer: You can keep the sound buttons here without putting them in the table.
[00:50:22] Customer: That would help declutter it.
[00:50:28] Customer: Meaning here, push button, delay...
[00:50:35] Customer: Where did the word come from?
[00:50:38] Customer: What is there?
[00:50:39] Customer: The text.
[00:50:46] Customer: For some texts, you could go to the text, right?
[00:50:53] Customer: But texts are stored in the student's account, right?
[00:50:57] Customer: The teacher cannot go to the text.
[00:51:00] Customer: Okay.
[00:51:04] Customer: New sentence.
[00:51:06] Customer: What was wrong?
[00:51:12] Customer: So that's...
[00:51:13] Customer: What is this?
[00:51:15] Customer: Oh, what was wrong?
[00:51:17] KaramKhaddour: If you want AI to regenerate it, you tell the AI what was wrong.
[00:51:24] Customer: Okay.
[00:51:26] Customer: Instructions: "This card was written with..."
[00:51:33] Customer: Okay, those are different inputs.
[00:51:39] Customer: Should the instructions be editable, by the way?
[00:51:46] KaramKhaddour: These instructions are only for this card.
[00:51:49] KaramKhaddour: They will not affect anything.
[00:51:53] KaramKhaddour: They only affect the current generation.
[00:51:56] KaramKhaddour: Generation of the new card.
[00:51:59] Customer: Yes.
[00:52:01] Customer: So this is editable by the teacher, right?
[00:52:09] Customer: Where is it set?
[00:52:11] Customer: Like, on the student's side, in the deck?
[00:52:18] KaramKhaddour: The instructions, yes.
[00:52:19] Customer: Yeah.
[00:52:21] KaramKhaddour: Students technically share the same view.
[00:52:25] KaramKhaddour: They can also add instructions when regenerating a card.
[00:52:34] KaramKhaddour: There are deck instructions for generating cards for the deck.
[00:52:38] KaramKhaddour: If you want more control when regenerating a sentence, you can add new instructions for it.
[00:52:49] Customer: So you can put instructions for each card, right?
[00:52:55] Customer: Different instructions for different cards.
[00:52:59] KaramKhaddour: But this, I think, would be...
[00:53:01] KaramKhaddour: I think that would be very niche.
[00:53:07] KaramKhaddour: I do not think people will really set instructions for every card.
[00:53:11] Customer: Yeah.
[00:53:12] KaramKhaddour: It takes a lot of time.
[00:53:14] Customer: Okay.
[00:53:26] Customer: So a card can belong to multiple decks.
[00:53:33] Customer: Yeah, and it's the same card, right?
[00:53:36] Customer: Each deck has its own instructions.
[00:53:39] Customer: So which instructions are shown?
[00:53:41] Customer: Ah, okay.
[00:53:42] Customer: The instructions used to generate this card.
[00:53:50] Customer: Mm-hmm.
[00:53:51] Customer: Okay.
[00:53:53] Customer: Would they be mutable or immutable?
[00:53:58] Customer: I don't know.
[00:54:07] Customer: Maybe you want to move the card to another deck, where the other cards have...
[00:54:16] Customer: That deck is about another topic.
[00:54:20] Customer: The cards there have a different prompt or instructions.
[00:54:28] Customer: Then you should be able to edit the instructions.
[00:54:32] Customer: Okay.
[00:54:33] Customer: But should the teacher be able to edit it?
[00:54:36] Customer: The student did not really ask for that, I guess.
[00:54:43] Customer: They only asked to check the sentence.
[00:54:48] Customer: I think the teacher should not be able to edit the instructions.
[00:55:00] Customer: But "What was wrong" can be editable.
[00:55:04] Customer: The teacher should be able to control how the card is generated.
[00:55:09] Customer: Okay.
[00:55:12] Customer: The student controls the deck's topic and how its cards are generated.
[00:55:19] Customer: Like, yeah, the instructions.
[00:55:25] Customer: Okay.
[00:55:26] Customer: Then you click "Rewrite now", and it rewrites the card.
[00:55:30] Customer: And what do you see?
[00:55:34] Customer: Where do...
[00:55:35] Customer: You see the result somewhere at the top, right?
[00:55:41] KaramKhaddour: Yes, I think there is a bug here.
[00:55:46] KaramKhaddour: You should see the result at the top.
[00:55:49] KaramKhaddour: But here you should not be able to delete it, I think.
[00:55:56] KaramKhaddour: I do not think Archive and Delete should appear here.
[00:56:01] KaramKhaddour: The problem is that I am reusing the view for opening a card inside a deck.
[00:56:08] KaramKhaddour: Some features should not appear when you are a teacher, I think.
[00:56:13] KaramKhaddour: For example, "Delete for good".
[00:56:14] Customer: Yeah, I agree.
[00:56:16] Customer: And this is a bug.
[00:56:18] Customer: It is up to the user to archive.
[00:56:29] Customer: But how does the teacher...
[00:56:33] Customer: Should the teacher be able to delete cards somehow?
[00:56:38] Customer: Or tell the student to delete the card?
[00:56:43] Customer: Or should they do everything to save the card and make it good?
[00:56:50] Customer: Or not delete it.
[00:57:00] KaramKhaddour: I think they might need to be able to delete it.
[00:57:10] KaramKhaddour: Should we let them delete and archive it?
[00:57:19] Customer: Probably, yes.
[00:57:20] Customer: There could be concerns if we delete a card and then realize it should not have been deleted.
[00:57:36] Customer: Maybe just let teachers archive a card and leave deletion to the student.
[00:57:47] Customer: Let them decide.
[00:57:52] Customer: But archive can be useful.
[00:58:02] Customer: The word appears to have been here.
[00:58:10] Customer: One problem with this layout and sidebar is that I cannot see a preview of what was generated after clicking "Rewrite now".
[00:58:29] Customer: Yeah, I know.
[00:58:31] Customer: I have to scroll to it.
[00:58:36] Customer: I'm not sure that this should remain a sidebar.
[00:58:45] Customer: You have so much space in the middle of the screen.
[00:58:48] Customer: Maybe use a two-column view or another desktop layout where everything is visible.
[00:59:03] Customer: The buttons, sentence previews, and other actions.
[00:59:14] Customer: Yeah, what happens on mobile, I'm not sure.
[00:59:18] Customer: Maybe the buttons should move near the top of the sidebar or the screen where you edit the card.
[00:59:30] Customer: There should definitely be a preview of the generated result, so you can regenerate it again if it is wrong.
[00:59:44] Customer: A teacher wants quick feedback.
[00:59:48] Customer: I think that is all about the sidebar.
[00:59:52] Customer: Okay.
[00:59:56] Customer: So.
[01:00:00] Customer: What are your plans right now?
[01:00:03] KaramKhaddour: I think next week we should focus mainly on the UI, making it easy to use and suitable for mobile.
[01:00:19] KaramKhaddour: I think this is probably the main concern.
[01:00:23] KaramKhaddour: We have most of the functionality, but its presentation needs to improve on desktop and mobile, particularly mobile.
[01:00:37] KaramKhaddour: Do you think that is okay?
[01:00:40] Customer: Yes, I think that is okay, and we should also ensure that audio and the LLM APIs work on the VMs where you deploy.
[01:01:01] Customer: If you want to migrate to an external VM outside the university network, you should ensure that there too.
[01:01:13] Customer: I think I saw a project that aggregates free LLM APIs.
[01:01:22] Customer: If I find it, I will share it with you.
[01:01:25] Customer: Maybe some of them will work in your case.
[01:01:29] KaramKhaddour: I will see whether we can choose a Chinese LLM that might work.
[01:01:41] Customer: My question was actually about this meeting.
[01:01:47] Customer: We discussed the UI most of the time.
[01:01:51] Customer: Do you have any other questions?
[01:01:53] Customer: I still have time.
[01:01:55] Customer: If you also have time, we can continue discussing what you planned.
[01:02:02] KaramKhaddour: I do not have any more questions for this meeting.
[01:02:10] KaramKhaddour: Do you have any questions, everyone?
[01:02:19] KaramKhaddour: saleemasekrea000, your voice is not very clear.
[01:02:23] saleemasekrea000: Can you hear me?
[01:02:25] saleemasekrea000: Yes, speak louder.
[01:02:27] saleemasekrea000: I can barely hear you.
[01:02:35] KaramKhaddour: saleemasekrea000, your voice is very quiet.
[01:02:45] saleemasekrea000: Can you hear me now?
[01:02:47] Customer: Yes.
[01:02:49] saleemasekrea000: I was asking about the current submission, since this API key did not work for the cloud API.
[01:02:56] saleemasekrea000: Can we submit it and show an already created card, then change the API or use a Chinese API key or something else?
[01:03:18] Customer: You showed me the deployed version, right?
[01:03:23] Customer: Yes.
[01:03:25] Customer: It is sufficient to submit this version.
[01:03:31] Customer: You can try other API providers next week, in the next sprint.
[01:03:37] saleemasekrea000: Okay, thank you.
[01:03:42] KaramKhaddour: I think that is all from our side.
[01:03:56] KaramKhaddour: Thank you for the meeting, and if you have time, please check the deployed application and give us your feedback.
[01:04:08] KaramKhaddour: We will send the links and credentials in the group.
[01:04:15] Customer: Okay, thank you.
[01:04:17] Customer: Thank you very much for your work.
[01:04:19] Customer: I appreciate it, and good luck with your project.
[01:04:24] KaramKhaddour: Thank you.
[01:04:25] KaramKhaddour: Thank you.
[01:04:26] Customer: Bye-bye.
