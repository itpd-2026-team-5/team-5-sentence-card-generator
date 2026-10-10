# Customer meeting transcript

- **Date:** 2026-10-09
- **Participants:** Customer, Byakko-san, Horokk1, KaramKhaddour, saleemasekrea000.

[00:00:00] KaramKhaddour: Thank you.
[00:00:00] KaramKhaddour: Share my screen for the prototype.
[00:00:00] KaramKhaddour: Can you see my screen?
[00:00:12] Customer: Yes.
[00:00:14] KaramKhaddour: Okay, so our project was about sentence generating for people who want to learn new languages.
[00:00:14] KaramKhaddour: So, what we did was, we did mostly two designs.
[00:00:14] KaramKhaddour: First we started with a design like this, similar to...
[00:00:39] Customer: Okay.
[00:00:52] KaramKhaddour: So, firstly we started with this design, which is very similar to Anki, but then we saw that it was not very user-friendly, so we moved to this design.
[00:00:52] KaramKhaddour: It's more like nicer to look at.
[00:00:52] KaramKhaddour: First, a student will come here to settings of the profile and set up basically their context, their general context, what they speak, what they want to learn.
[00:00:52] KaramKhaddour: You can see my screen, right?
[00:00:52] KaramKhaddour: You can see the...
[00:01:26] Customer: Yes.
[00:01:28] KaramKhaddour: And then their level.
[00:01:28] KaramKhaddour: Then, as I said, their profession, interest, why they are learning the language, and any instructions they want.
[00:01:28] KaramKhaddour: For any instruction, it's basically the additional prompt that we will send to the LLM.
[00:01:28] KaramKhaddour: Then they can set the length of the sentence.
[00:01:28] KaramKhaddour: So, what the shortest and longest lengths are.
[00:01:28] KaramKhaddour: After they set the settings, they can come to library where they can add a new text.
[00:01:28] KaramKhaddour: For example, let's say, word.
[00:01:28] KaramKhaddour: In the title, we put any title we want, then we put the sentence or the article.
[00:02:22] Customer: Okay.
[00:02:24] KaramKhaddour: Let's say, I love ice cream, and we add it.
[00:02:24] KaramKhaddour: When we add this text, we have the sentence, which is article or anything that we want from social media, from a book, et cetera.
[00:02:24] KaramKhaddour: We click on words, and then we choose either to learn this word or to ignore it.
[00:02:24] KaramKhaddour: When we set, generate a card, then we generate a card for this word that we choose to learn, basically.
[00:02:24] KaramKhaddour: This is the idea.
[00:02:24] KaramKhaddour: When we want to generate a card, how we generate a card, we take our context from profile.
[00:02:24] KaramKhaddour: We take this word that we choose.
[00:02:24] KaramKhaddour: We ignore any, we send to the LLM the list of words that we want to ignore.
[00:02:24] KaramKhaddour: So, for example, if I ignore this, then any new sentence will not generate this word.
[00:02:24] KaramKhaddour: But we kept the number of words that we, we also send the words that the user already knows, but we don't send everything because it will be very huge.
[00:02:24] KaramKhaddour: So, we kept it to, 150 latest words that they learned.
[00:02:24] KaramKhaddour: And this is a whole idea for now, for generation.
[00:02:24] KaramKhaddour: After we generate the cards, you can see here's the generated cards, for example.
[00:02:24] KaramKhaddour: They can come here to study.
[00:02:24] KaramKhaddour: When they study, we start the session.
[00:02:24] KaramKhaddour: First, they will see the sentence in German because they want to learn German, then they will see it in English.
[00:02:24] KaramKhaddour: And then they will choose easy, good, hard, again, or too hard.
[00:02:24] KaramKhaddour: When it's too hard, then we will remove the card from the study session.
[00:02:24] KaramKhaddour: They will finish this study session, and we are using the algorithm that we talked about to sort the number of cards, number of frequencies the card will show, FSRS.
[00:02:24] KaramKhaddour: The only problem for now that we didn't yet complete is generating, currently is generating the card is not correct.
[00:02:24] KaramKhaddour: The problem currently is that we don't have yet the API to connect it to LLM.
[00:02:24] KaramKhaddour: So, and we are trying to decide when we use an LLM like Claude or ChatGPT, for example, or it's better to use an LLM that is locally, we can locally install it and has open weights and we just use it.
[00:02:24] KaramKhaddour: So we are trying to decide which one is better to use because we need to understand how much it will cost to generate each card and who will pay for this generation.
[00:02:24] KaramKhaddour: Like if it's a real product, who will pay?
[00:02:24] KaramKhaddour: Will the student pay?
[00:02:24] KaramKhaddour: Will we have, for example, ads, et cetera?
[00:02:24] KaramKhaddour: So this is our current prototype for the design.
[00:02:24] KaramKhaddour: Yes, do you have any last thoughts?
[00:05:47] Customer: Yeah, I do have some thoughts about it.
[00:05:47] Customer: So do you use VS Code?
[00:05:55] Customer: Yes.
[00:05:56] Customer: Could you share this prototype, like open the port so that they can connect?
[00:05:56] Customer: You know how to do that?
[00:06:06] KaramKhaddour: No.
[00:06:06] KaramKhaddour: Like you will be able to connect to my local host?
[00:06:13] Customer: Yeah, basically, hopefully, let's check.
[00:06:13] Customer: Okay.
[00:06:13] Customer: If we can, if it's okay to spend like a couple of minutes, maybe five.
[00:06:24] Customer: Yes.
[00:06:24] Customer: Okay, go to VS Code and then like you open the terminal, like do like that.
[00:06:24] Customer: And there is ports to the left of the terminal, like about- Okay, forward the port.
[00:06:24] Customer: Yeah.
[00:06:24] Customer: And then enter the port number.
[00:06:47] KaramKhaddour: One, five, one, seven, four.
[00:06:47] KaramKhaddour: Okay.
[00:06:47] KaramKhaddour: Okay.
[00:07:03] saleemasekrea000: [redacted], I don't know if you have ngrok installed, but you can use ngrok.
[00:07:10] Customer: It's like ngrok, but built into VS Code.
[00:07:14] saleemasekrea000: Okay, okay.
[00:07:15] KaramKhaddour: Yeah, he's telling me starting for a port forwarding system.
[00:07:20] saleemasekrea000: Yeah, I think it's the same, okay.
[00:07:20] saleemasekrea000: So I have the link, let's see.
[00:07:36] KaramKhaddour: Can you try this thing with me for a second?
[00:07:49] Customer: You've got the link?
[00:07:52] KaramKhaddour: Yes, one second.
[00:07:52] KaramKhaddour: Will this work?
[00:07:57] Customer: I'm checking.
[00:07:59] KaramKhaddour: Okay.
[00:08:23] Customer: Maybe it needs VPN.
[00:08:27] KaramKhaddour: No, I think I have to, but it's not connecting.
[00:08:27] KaramKhaddour: Maybe visibility, I need to change visibility.
[00:08:40] Customer: I think the problem will be on my side then.
[00:08:44] KaramKhaddour: No, I think, one second.
[00:08:44] KaramKhaddour: I changed visibility to public, so maybe not to work.
[00:08:52] Customer: Okay, let's try.
[00:09:02] KaramKhaddour: Yes, no, I think maybe it works.
[00:09:02] KaramKhaddour: Did it work?
[00:09:09] Customer: But my browser can't discover it.
[00:09:09] Customer: And ping doesn't work.
[00:09:09] Customer: Same on my screen.
[00:09:09] Customer: Okay.
[00:09:20] KaramKhaddour: So it's working on my side because it's on my laptop.
[00:09:26] Customer: Could you send it to Telegram?
[00:09:30] KaramKhaddour: Yes.
[00:09:49] Customer: Yeah, it loads with VPN.
[00:09:49] Customer: Okay, nice.
[00:09:49] Customer: Okay, but the problem is that I need to share the screen from mobile phone.
[00:10:11] KaramKhaddour: Okay, should I stop sharing?
[00:10:18] Customer: I think I will reconnect from my phone to the meeting.
[00:10:18] Customer: Yeah, could you please stop sharing?
[00:10:18] Customer: I'll try to reconnect.
[00:10:29] Customer: Okay.
[00:11:09] Customer: Okay, there is a problem.
[00:11:14] KaramKhaddour: Problem with the website or?
[00:11:17] Customer: With the setup.
[00:11:17] Customer: Okay, anyway, I'll try to use the mobile version and comment on it.
[00:11:17] Customer: Sorry if it's not, if the version for the PC differs too much, then some of my comments may be irrelevant.
[00:11:17] Customer: But like my primary user base will probably be mobile phone users.
[00:11:17] Customer: So the comments can be still relevant.
[00:11:17] Customer: Okay, I'll try to share my screen.
[00:11:17] Customer: Move from mobile.
[00:11:17] Customer: Will you give me a second?
[00:11:17] Customer: No.
[00:11:17] Customer: Okay, it requires an application.
[00:11:17] Customer: Sorry.
[00:11:17] Customer: Okay.
[00:11:17] Customer: Okay, now the experiment didn't work.
[00:11:17] Customer: So I think I should comment on what you feel because I can't- Please share screen.
[00:13:09] KaramKhaddour: For my device.
[00:13:10] Customer: Yeah, please share the screen.
[00:13:10] Customer: Sorry for this technical difficulties.
[00:13:17] KaramKhaddour: If you want, you can do like this so you can see them while screening.
[00:13:25] Customer: Okay.
[00:13:25] Customer: Okay, I see your mobile version.
[00:13:25] Customer: So the user starts at the setting screen, right?
[00:13:25] Customer: Or here?
[00:13:41] KaramKhaddour: They are already logged in, they will start here.
[00:13:45] Customer: Okay.
[00:13:45] Customer: Your session is ready for today.
[00:13:45] Customer: Okay.
[00:13:45] Customer: Where can we, which scenarios would you like to consider?
[00:13:45] Customer: Which user stories, maybe?
[00:14:05] KaramKhaddour: The user stories that we are considering are that the user can start a study session with their cards from here.
[00:14:05] KaramKhaddour: A user also can go to library and add new text.
[00:14:05] KaramKhaddour: This is the second user story.
[00:14:05] KaramKhaddour: Third user story is that the user can go to settings and update their context.
[00:14:05] KaramKhaddour: However, we are still missing some user stories that are very crucial to our product, which are the teacher, the story.
[00:14:05] KaramKhaddour: A teacher needs to be able to access the student cards, and we need to work on, like LLM can generate good sentences based on the user context.
[00:15:02] Customer: Okay, but like for a prototype, it's enough.
[00:15:02] Customer: Like you test three user stories.
[00:15:02] Customer: Okay, so entering the session.
[00:15:02] Customer: Four to review and three new.
[00:15:02] Customer: Scheduled by FSRS.
[00:15:02] Customer: So they can enter, and what do they see there?
[00:15:32] KaramKhaddour: Currently, I am considering everyone having the same session.
[00:15:32] KaramKhaddour: I didn't do the authentication yet.
[00:15:39] Customer: Yeah, it's okay.
[00:15:39] Customer: So when they click Start studying, what do they see?
[00:15:44] KaramKhaddour: They will see the card.
[00:15:44] KaramKhaddour: The card will have the sentence, and technically it should be in German, but this one is not correct, and they will see the translation, and then they will be able to see, to select what is the difficulty of the card.
[00:15:44] KaramKhaddour: Hard, easy.
[00:15:44] KaramKhaddour: This is for the algorithm.
[00:15:44] KaramKhaddour: So it determines the number of repeats, and we are also, we'll try to connect it with like a voice model, so it can generate also the pronunciation.
[00:16:24] Customer: Okay, in Anki, the cards have a template, and the template that I consider convenient is that the German phrase, like if it's shown on the front side of the card, then it's shown in the same place on the back side of the card.
[00:16:24] Customer: If you show me a card, for example.
[00:16:52] KaramKhaddour: Okay, I understand.
[00:16:52] KaramKhaddour: So, yes, okay, I understand your point.
[00:17:02] Customer: And in your case, it seems like the German version goes somewhere down inside the card.
[00:17:11] KaramKhaddour: Yeah, it should be the same, but the English should be under it.
[00:17:16] Customer: Yeah, so, yeah, front version is above, like always, and the back version is just added below it.
[00:17:16] Customer: Okay.
[00:17:16] Customer: Okay, then they can click a button, right?
[00:17:38] KaramKhaddour: To determine that.
[00:17:40] Customer: Yeah.
[00:17:40] Customer: Okay, big buttons.
[00:17:40] Customer: Why are there numbers, one, two, three, four?
[00:17:40] Customer: Is it necessary in mobile version?
[00:17:40] Customer: I don't think so, really.
[00:17:57] KaramKhaddour: Okay, I will look up.
[00:18:00] Customer: Okay, again, hard, good, easy.
[00:18:00] Customer: Can there be misclicks?
[00:18:00] Customer: Yes, of course.
[00:18:00] Customer: Or will the user get used to this order?
[00:18:00] Customer: I don't know.
[00:18:00] Customer: Okay, in Anki, they're just in the same row at the bottom.
[00:18:00] Customer: But, okay, this layout might work.
[00:18:30] KaramKhaddour: In the desktop version, they are in the same row, but in the mobile version here, they are not in the same row.
[00:18:40] Customer: Got it.
[00:18:40] Customer: Okay.
[00:18:40] Customer: So, after, when you show a card, the sound should play, because sometimes you review on the go and you don't have a chance to read what is written, and you can only listen.
[00:18:40] Customer: So, you want the word?
[00:19:06] KaramKhaddour: Okay, so the sound should be automatic.
[00:19:09] Customer: Yeah, the word is not pronounced, I'm telling about my experience.
[00:19:09] Customer: So, in my cards, only the sentence is pronounced.
[00:19:09] Customer: The word is shown above the sentence, and it's not pronounced.
[00:19:09] Customer: And there is some meta-information, that is under a spoiler on the card, the original sentence, where the word comes from, the index of the word in the database, the, yeah, I think that's basically, maybe the name of the text, where the word comes from, just to know the topic.
[00:19:09] Customer: Okay.
[00:19:09] Customer: And, yeah, there is no formatting, basically, just plain sentence, in big font, the word in a smaller font.
[00:19:09] Customer: Yeah, no quotation marks.
[00:19:09] Customer: Okay.
[00:20:18] Customer: Is it the same?
[00:20:18] Customer: Is that what you're talking about?
[00:20:18] Customer: Okay.
[00:20:21] Customer: Yes, yes.
[00:20:21] Customer: I think, yeah, I just recollected that I have an example of the card in the repository with the proof of concept.
[00:20:21] Customer: We can look up how they look like.
[00:20:21] Customer: Okay, let's move on.
[00:20:21] Customer: So, the first story is about entering the review, and we looked at it.
[00:20:21] Customer: Basically, could you please move forward?
[00:20:21] Customer: So, 10 cards.
[00:20:21] Customer: Yeah, I see 10 cards.
[00:20:21] Customer: What is it, total, or what?
[00:21:03] KaramKhaddour: Yes, this is total number of cards, total number of topics, what you studied today, and this is LLM tokens.
[00:21:03] KaramKhaddour: We can keep it or not keep it, depends on, I think, if it's paid or not paid model.
[00:21:24] Customer: Yes, I'm not sure it's needed, right here.
[00:21:24] Customer: Okay.
[00:21:24] Customer: I think it should move somewhere to, settings, some expenses, or something like that.
[00:21:24] Customer: Okay, and I also see the progress ring.
[00:21:24] Customer: Could you please move the page?
[00:21:24] Customer: Yeah, so, seven cards left.
[00:21:24] Customer: I see the progress is at 50%.
[00:21:24] Customer: What does it mean?
[00:22:07] KaramKhaddour: I don't think this is correct.
[00:22:07] KaramKhaddour: This is among, yes, it should be, the progress should be the number of cards left until you finish everything you need to study today.
[00:22:07] KaramKhaddour: So, technically, you need 14 cards to have seven cards left as 50%, but I think this is mock data.
[00:22:36] Customer: Okay, maybe it can show the new cards left and studied.
[00:22:36] Customer: So, it can show more segments to show, how many new cards were studied, how many new cards are left, how many are.
[00:22:56] KaramKhaddour: Okay, so you mean to have different, not one, setting, not one, okay.
[00:23:04] Customer: Not one color.
[00:23:04] Customer: Kind of.
[00:23:04] Customer: Okay, let's proceed.
[00:23:04] Customer: Yeah, by the way, this models, or how to call them, below the today's session.
[00:23:04] Customer: Like, seven studied today.
[00:23:04] Customer: Is it a button, or what is it?
[00:23:29] KaramKhaddour: No, it's just your, okay.
[00:23:29] KaramKhaddour: Maybe we can make it a button.
[00:23:37] Customer: Sorry.
[00:23:37] Customer: So, six text is also not a button.
[00:23:37] Customer: So, how do I go to my texts?
[00:23:45] KaramKhaddour: This is the button, yeah.
[00:23:47] Customer: Ah.
[00:23:48] KaramKhaddour: Text is a button, but it's inside library, but this are not buttons.
[00:23:48] KaramKhaddour: But this are the topics, so.
[00:24:01] saleemasekrea000: It's it's kind of statistics, what you have.
[00:24:04] Customer: Yeah, yeah.
[00:24:05] saleemasekrea000: So, it should be not a button, I think.
[00:24:10] Customer: Yeah, might be not a button, or might be a button.
[00:24:10] Customer: I'm not sure right now.
[00:24:10] Customer: Maybe we can try it a bit later.
[00:24:10] Customer: Okay, so, keep reading, what is that?
[00:24:27] KaramKhaddour: Keep reading doesn't mean anything, but the text are what you created, and each text have cards inside of it, depending on the topics that you choose.
[00:24:27] KaramKhaddour: So, this one will have these two cards, basically.
[00:24:46] Customer: But, these two cards, okay, I'm lost here.
[00:24:46] Customer: Okay, so, this keep reading, and below it are buttons, right?
[00:24:46] Customer: With text, for texts.
[00:25:05] Customer: Yes.
[00:25:09] Customer: Are those buttons for texts, or for decks, like?
[00:25:09] Customer: For decks, basically.
[00:25:09] Customer: Yeah.
[00:25:09] Customer: Uh-huh.
[00:25:09] Customer: Yes.
[00:25:09] Customer: Okay, so, by spiel is a deck.
[00:25:09] Customer: Okay, and when you open the deck, the first one, for example, then you see, click a word, or to learn it, or ignore it.
[00:25:09] Customer: Once you leave one, what do you see?
[00:25:39] KaramKhaddour: So, first here, we have, basically, the sentences inside your card.
[00:25:39] KaramKhaddour: In each word, you can learn it, or ignore it.
[00:25:39] KaramKhaddour: Then, here, we can see which cards we have, and we can edit these cards, if you want.
[00:25:59] Customer: Okay.
[00:25:59] Customer: For example, if you would choose this.
[00:25:59] Customer: Why do you need this here?
[00:26:09] KaramKhaddour: Why we need it inside of the first page?
[00:26:13] Customer: Inside the deck.
[00:26:13] Customer: I don't understand.
[00:26:22] KaramKhaddour: Yeah.
[00:26:22] KaramKhaddour: Maybe we can go different way for it.
[00:26:25] Customer: Yeah, no, the intention should be, my intention was different, in what I envisioned.
[00:26:25] Customer: So, basically, there is a number of texts, and you select words that you want to learn inside these texts.
[00:26:25] Customer: Okay?
[00:26:25] Customer: And then, cards are generated for these words.
[00:26:25] Customer: They are added to a deck.
[00:26:25] Customer: And what is generated inside the deck is studied as this.
[00:26:25] Customer: So, you don't need to select some words inside the deck, because you have already generated sentences with the words that you wanted to learn.
[00:26:25] Customer: And if you don't like any cards, any generated cards, then you can just remove them.
[00:27:33] KaramKhaddour: Okay, but you cannot add any words, right?
[00:27:33] KaramKhaddour: You can only remove them.
[00:27:39] Customer: You can add cards to a deck, or you can remove cards from a deck.
[00:27:39] Customer: But you don't select words inside the deck, like you show right now.
[00:27:39] Customer: Maybe we're confused here.
[00:27:39] Customer: So, maybe this is a text.
[00:27:39] Customer: So, if it is a text, then it's okay that you can select a word, to learn or to ignore.
[00:27:39] Customer: But if it's a deck, there should be no such functionality.
[00:27:39] Customer: Inside the deck, you can just mark, a card.
[00:27:39] Customer: I don't want to learn it, basically.
[00:27:39] Customer: Like, regenerate it.
[00:28:24] KaramKhaddour: Okay, so I think where we are confused is how is a text connected to a deck?
[00:28:32] Customer: Yeah, that's a good question.
[00:28:32] Customer: I think I only thought about a single deck.
[00:28:32] Customer: So, every chosen word goes to the single deck.
[00:28:46] KaramKhaddour: You think decks could, have, each deck could have one topic, maybe.
[00:28:46] KaramKhaddour: So, we could, separate.
[00:28:46] KaramKhaddour: For me, for example, in Russian, when I'm learning Russian, then I could have one deck for, [inaudible], or one deck for, I don't know, SVA and NSVA verbs, or something.
[00:28:46] KaramKhaddour: So, each deck could have one topic, for example.
[00:28:46] KaramKhaddour: And maybe after we generate cards, we can assign these cards to different decks.
[00:29:31] Customer: Yeah, that might be an option.
[00:29:31] Customer: So, your suggestion is basically to, for each card to choose a deck that it belongs to, or what?
[00:29:46] KaramKhaddour: Yes, maybe.
[00:29:48] Customer: Maybe this is gonna be an option.
[00:29:48] Customer: Uh-huh.
[00:29:48] Customer: Can a card belong to several decks?
[00:29:57] KaramKhaddour: It could be, also.
[00:29:57] KaramKhaddour: It could make sense, yes.
[00:30:02] Customer: So, we should have some place where we can select decks for a card.
[00:30:02] Customer: Or maybe bulk add cards to a deck somehow.
[00:30:02] Customer: And now I assume we are inside a text.
[00:30:26] KaramKhaddour: Yes, we are inside a text.
[00:30:33] Customer: Okay, if it's a text, then we select the words that we want to learn.
[00:30:33] Customer: And then we, you, there is word tray.
[00:30:33] Customer: Okay, in the word tray, I see the words, generate one card.
[00:30:53] KaramKhaddour: It did not work out because I chose this one new one.
[00:30:53] KaramKhaddour: That's why I cannot generate new cards.
[00:31:05] Customer: No new words to generate.
[00:31:05] Customer: Okay.
[00:31:05] Customer: And cards from this text.
[00:31:05] Customer: So, basically generated some cards.
[00:31:05] Customer: And then there is edited cards.
[00:31:05] Customer: What does it do?
[00:31:33] KaramKhaddour: Okay, this is not correct.
[00:31:33] KaramKhaddour: I think we should directly go here.
[00:31:33] KaramKhaddour: We could be able to change the card ourselves, like change the translation, change the sentence.
[00:31:33] KaramKhaddour: We can ask for a new sentence if you want and send it to the AI again, for example.
[00:32:02] Customer: Yeah, this is a very good idea.
[00:32:02] Customer: So, this menu, this dialog opens.
[00:32:02] Customer: When what happens?
[00:32:14] KaramKhaddour: If we click on one card, like we are here inside of cards.
[00:32:14] KaramKhaddour: So, if we click on one card, we can edit this card.
[00:32:14] KaramKhaddour: We have the sentence in German, the translation, what word we are learning inside of the sentence.
[00:32:14] KaramKhaddour: And then if we want, we can write more context to the AI if we don't like the sentence and regenerate it.
[00:32:44] Customer: Okay.
[00:32:44] Customer: If I want to mark a card as bad, like more quickly.
[00:32:44] Customer: Okay.
[00:32:44] Customer: Can I do it from the previous page?
[00:32:44] Customer: From the page with all cards?
[00:33:00] KaramKhaddour: No.
[00:33:02] Customer: Yeah, okay.
[00:33:02] Customer: Needs check.
[00:33:02] Customer: Needs check shows.
[00:33:02] Customer: What does it show?
[00:33:02] Customer: If you click mark bad, then it will go to Needs check?
[00:33:27] KaramKhaddour: No, it will go to mark bad.
[00:33:27] KaramKhaddour: Needs check, maybe after we generate it, we can put it here so we can check it, for example.
[00:33:27] KaramKhaddour: I am not 100% sure.
[00:33:27] KaramKhaddour: I think we can remove this.
[00:33:27] KaramKhaddour: Or maybe we can have Needs check to, if we want to ask the teacher about specific sentences, for example, then we can add something in here for the teacher as, note to the teacher and we can then mark it somehow so the teacher can see our sentences that we have problems with and can comment on them, for example.
[00:34:15] Customer: Okay.
[00:34:15] Customer: So, but, the trigger will be what?
[00:34:15] Customer: Some input?
[00:34:15] Customer: Yeah.
[00:34:15] Customer: Do we flag it somehow or write some text or, a question, maybe?
[00:34:15] Customer: And that will become Needs check, basically.
[00:34:42] KaramKhaddour: Yes.
[00:34:42] KaramKhaddour: Okay.
[00:34:42] KaramKhaddour: I think we need to mark it as Needs check from the teacher.
[00:34:48] Customer: Okay, done.
[00:34:48] Customer: Inside the cards, I see sentences, but can I listen to the pronunciation of the sentence?
[00:35:01] KaramKhaddour: Currently, no.
[00:35:01] KaramKhaddour: Or the word?
[00:35:01] KaramKhaddour: Yes.
[00:35:07] Customer: Okay.
[00:35:07] Customer: So, there is a German word, but no English word, right?
[00:35:21] KaramKhaddour: Yes, currently.
[00:35:24] Customer: So, I can't quickly see the translation.
[00:35:24] Customer: Okay.
[00:35:32] KaramKhaddour: So, you want to see the translation of one word, right?
[00:35:32] KaramKhaddour: The words that you are learning.
[00:35:38] Customer: Yes, I can search it inside the sentence, but, more quickly way will be to just see the translation.
[00:35:38] Customer: And the translation should be, should match the sentence.
[00:35:38] Customer: Context.
[00:35:57] KaramKhaddour: The English, yeah, the context.
[00:36:02] Customer: All right.
[00:36:02] Customer: What does write a new sentence mean?
[00:36:12] KaramKhaddour: Based on your new context, if you want, you can generate this new sentence.
[00:36:18] Customer: So, it will immediately generate.
[00:36:20] KaramKhaddour: So, you are changing the sentence.
[00:36:21] Customer: Uh-huh.
[00:36:21] Customer: And, okay, and this, it will be generated in place.
[00:36:21] Customer: They can review again.
[00:36:21] Customer: Okay.
[00:36:21] Customer: This is quite nice.
[00:36:21] Customer: Yeah, in my approach, there was bulk generation.
[00:36:21] Customer: So, I just marked the bad cards and then all of them, the seed data, the word in German was sent, the words in German were sent to LLM and then generated multiple sentences at once.
[00:36:21] Customer: But this approach also seems convenient.
[00:37:07] KaramKhaddour: Maybe we can also add, generate a new sentence for the same word, for example.
[00:37:07] KaramKhaddour: What do you think?
[00:37:17] Customer: Write a new sentence for the same word?
[00:37:20] KaramKhaddour: So, for example, we could have, regenerate the sentence.
[00:37:20] KaramKhaddour: And we could also have generate a new sentence.
[00:37:20] KaramKhaddour: So, one of them is to replace a sentence, old one, and one of them to have multiple sentences for the same word.
[00:37:20] KaramKhaddour: So, we are getting more practice for the same word, for example.
[00:37:42] Customer: And then, but then there will be multiple cards for a single word.
[00:37:52] KaramKhaddour: I think this makes sense because we usually need to hear the same word used in different sentences to be able to learn it correctly.
[00:38:04] Customer: Right.
[00:38:04] Customer: Yeah, this is a good point.
[00:38:04] Customer: From the point of view of the data, do you store some super card that supports, several sentences?
[00:38:04] Customer: Or do you store just multiple cards?
[00:38:23] KaramKhaddour: We store multiple cards.
[00:38:25] Customer: Okay.
[00:38:25] Customer: Yeah, that will be easier.
[00:38:31] KaramKhaddour: To have super card with multiple sentences?
[00:38:37] Customer: I mean, in Anki, you can kind of tell it, what will be, which text can substitute a placeholder.
[00:38:37] Customer: And it can generate several cards from a single card.
[00:38:37] Customer: Like, automatically.
[00:38:37] Customer: Like, without you manually duplicating the card.
[00:38:37] Customer: Okay.
[00:38:37] Customer: So, yeah, maybe this is a good idea to add a button, generate a new card for this word or something like this.
[00:39:22] KaramKhaddour: Yes, and maybe we can generate cards and we can select the number of cards we want to generate, one, two, three.
[00:39:28] Customer: Yeah.
[00:39:28] Customer: Yeah.
[00:39:28] Customer: Yeah.
[00:39:28] Customer: Okay, and you, there is progress in FSRS.
[00:39:28] Customer: So, how many times you reviewed the card, when.
[00:39:28] Customer: And the progress would be different for each card, I guess.
[00:39:28] Customer: Yes.
[00:39:48] KaramKhaddour: Even if they have the same word.
[00:39:48] KaramKhaddour: [inaudible].
[00:39:53] Customer: Sure.
[00:39:53] Customer: Well, it looks, not very well.
[00:39:53] Customer: The progress we need.
[00:40:06] KaramKhaddour: So, maybe we can say, like.
[00:40:08] Customer: Because it's, several dates and, sometimes, sometimes times.
[00:40:18] KaramKhaddour: We can say, for example, you will relearn it after seven days.
[00:40:18] KaramKhaddour: You will relearn it after, five minutes, for example, maybe.
[00:40:28] Customer: Sounds good.
[00:40:28] Customer: Yeah, that might be.
[00:40:28] Customer: Okay.
[00:40:28] Customer: Yeah, this card will be shown then.
[00:40:28] Customer: Okay.
[00:40:28] Customer: I think that's it with the cards.
[00:40:49] KaramKhaddour: Do you have settings?
[00:40:50] Customer: Okay, yeah.
[00:40:50] Customer: Let's have a look at settings.
[00:40:50] Customer: Every sentence is written for this profile.
[00:40:50] Customer: Your level, your interests, and the words you already know.
[00:40:50] Customer: Okay.
[00:40:50] Customer: I speak English.
[00:40:50] Customer: I'm learning German.
[00:40:50] Customer: Your level, A2.
[00:40:50] Customer: Not sure.
[00:40:50] Customer: No placement test is linked for German yet.
[00:41:16] KaramKhaddour: Yes, we will link three placement tests in the future for the languages.
[00:41:16] KaramKhaddour: So, the user can take the test if they want.
[00:41:27] Customer: Okay.
[00:41:27] Customer: And right now they choose an arbitrary level?
[00:41:27] Customer: Yeah.
[00:41:27] Customer: Then about your profession or field of study.
[00:41:27] Customer: So, why do you need this about you?
[00:41:27] Customer: Do you collect my personal information?
[00:41:51] saleemasekrea000: Yes.
[00:41:51] saleemasekrea000: This is kind of a preference, user preference.
[00:41:51] saleemasekrea000: We can use it in context for the LLM while generating.
[00:42:07] Customer: I agree.
[00:42:07] Customer: But I think this about you element should have some description, why you need to provide this info.
[00:42:18] KaramKhaddour: Okay.
[00:42:23] Customer: Or maybe it should be called somehow.
[00:42:28] saleemasekrea000: We can have, some concept at the beginning so user can accept this term.
[00:42:39] Customer: Yeah.
[00:42:40] saleemasekrea000: Yeah.
[00:42:43] Customer: Okay, we just discussed the decks for topics.
[00:42:43] Customer: So, should this input go into decks or should they be global for an account?
[00:42:43] Customer: What do you think?
[00:43:06] KaramKhaddour: I think this in here about you is global, right?
[00:43:06] KaramKhaddour: It should go with every card.
[00:43:13] Customer: Yeah.
[00:43:13] Customer: But what if you don't want this info to poison the decks if they are dedicated to some topics?
[00:43:13] Customer: Okay.
[00:43:13] Customer: And you don't want, your interests to mix with the topic.
[00:43:32] KaramKhaddour: So, maybe we should have, a button to click if we want to, personalize the deck or not personalize the deck.
[00:43:48] Customer: Yeah, might be an option.
[00:43:48] Customer: But it may also overcomplicate the interface.
[00:43:48] Customer: Mm-hmm.
[00:43:48] Customer: Maybe we should go with instructions per each deck instead of such global inputs.
[00:43:48] Customer: So, I think about you is not really necessary.
[00:43:48] Customer: And it may make the person defensive because they don't want to share info about themselves with the web app.
[00:44:33] KaramKhaddour: Okay.
[00:44:33] KaramKhaddour: So, we can have the form inside the deck and if they want to choose, if they want to write, they can write there.
[00:44:42] Customer: Yeah.
[00:44:42] Customer: Okay.
[00:44:42] Customer: Or as a compromise or how to call it?
[00:44:42] Customer: Okay.
[00:44:42] Customer: Compromise.
[00:44:42] Customer: Compromise.
[00:44:42] Customer: Oh.
[00:44:42] Customer: Sorry, forgot the word.
[00:44:42] Customer: But, okay.
[00:44:42] Customer: I mean, you can keep this questionnaire, but repurpose it for analytics about your app.
[00:44:42] Customer: So, when the person signs in, if you want to understand why they use your app, what are their interests, you may ask.
[00:44:42] Customer: Maybe, yeah, maybe when you see, interests of your users, you may come up with, better prompts for decks.
[00:44:42] Customer: Like, maybe.
[00:44:42] Customer: I don't know.
[00:44:42] Customer: I mean, this questionnaire shouldn't be here.
[00:44:42] Customer: Just, I think so.
[00:44:42] Customer: Okay.
[00:44:42] Customer: Sentence length.
[00:44:42] Customer: Shortest in words, longest in words.
[00:44:42] Customer: The German language is known for very long words.
[00:44:42] Customer: And so, I thought that it might be better to limit the length in characters.
[00:44:42] Customer: Like, I should, there can be, three words, but, 100 characters.
[00:44:42] Customer: I think the limit should be in characters.
[00:44:42] Customer: It might be in words, too, but there should be an option to limit the length of a sentence in characters.
[00:46:41] KaramKhaddour: Maybe you have two options?
[00:46:44] Customer: Yeah, yeah.
[00:46:44] Customer: Maybe to the sentence length also.
[00:46:44] Customer: Like, the second input row.
[00:46:44] Customer: Okay.
[00:46:44] Customer: Or, I don't know.
[00:46:44] Customer: Okay.
[00:46:44] Customer: It can be the second.
[00:46:44] Customer: I'll find it anyway.
[00:46:44] Customer: Then there is, is there anything else in settings now?
[00:47:11] KaramKhaddour: No.
[00:47:14] Customer: Okay.
[00:47:14] Customer: Let's proceed then.
[00:47:14] Customer: So, the display button is for today's session?
[00:47:14] Customer: Or what does it do?
[00:47:24] KaramKhaddour: Go to, what you will learn now.
[00:47:24] KaramKhaddour: So, basically, the cards that are chosen by the algorithm that are ready for you to learn now.
[00:47:38] Customer: And which deck does it choose?
[00:47:42] KaramKhaddour: Now, every deck.
[00:47:42] KaramKhaddour: Now, every ready word from every deck.
[00:47:52] Customer: Every ready word?
[00:47:52] Customer: So, it collects all words from all decks and builds a session.
[00:47:52] Customer: Yes.
[00:47:52] Customer: Okay.
[00:47:52] Customer: Then there should be either a way to learn a single deck or, disable some decks.
[00:47:52] Customer: But if a person has multiple decks, then it's maybe not very convenient to disable them one by one.
[00:47:52] Customer: So, I think a more, coherent option is to let the person learn, one deck.
[00:47:52] Customer: Okay.
[00:47:52] Customer: I mean, this button shouldn't open any deck, a random deck, then.
[00:47:52] Customer: It should either provide a menu to select a deck, or I don't know what, I don't know.
[00:47:52] Customer: Should this button exist even?
[00:47:52] Customer: I mean, it may be a useful option to learn all ready words, all ready cards from all decks.
[00:47:52] Customer: But should this button be so prominent here at the bottom?
[00:47:52] Customer: Should it do exactly this?
[00:47:52] Customer: Maybe this button shouldn't be here.
[00:47:52] Customer: And the button to learn, all ready cards should be in the main menu, on the main page.
[00:47:52] Customer: Where is it?
[00:47:52] Customer: In the cards?
[00:47:52] Customer: So, here?
[00:49:43] KaramKhaddour: Start studying?
[00:49:44] Customer: Yeah, I think it should be today.
[00:49:44] Customer: Like, study, start studying.
[00:49:44] Customer: Start studying what?
[00:49:44] Customer: Which deck?
[00:49:44] Customer: Yeah.
[00:49:44] Customer: And then the statistics is also about all decks, or a single deck?
[00:49:44] Customer: Yes.
[00:49:44] Customer: Okay.
[00:49:44] Customer: In Anki, there is no such thing.
[00:49:44] Customer: The decks are separate.
[00:49:44] Customer: Completely.
[00:49:44] Customer: In Anki, you first choose a deck, and then decide what to do with it.
[00:50:25] KaramKhaddour: Should we do the same?
[00:50:25] KaramKhaddour: Should we separate the decks?
[00:50:27] Customer: Yeah, here I think you should do the same.
[00:50:27] Customer: First, you show the list of decks, and then the person chooses a deck to learn from.
[00:50:27] Customer: Or, maybe they select several decks, and then you can generate a session for today.
[00:50:27] Customer: From the cards that are ready, from all those decks.
[00:50:27] Customer: Okay.
[00:50:27] Customer: Then, then what?
[00:50:27] Customer: So, there were three user stories, yeah?
[00:50:27] Customer: Like, open review, enter text, input the text, and what else?
[00:51:25] KaramKhaddour: Yes, start review, create new cards, create new decks.
[00:51:25] KaramKhaddour: Or, it's not decks, it's decks and settings.
[00:51:35] Customer: Yeah, okay.
[00:51:35] Customer: So, how can I add a text?
[00:51:45] KaramKhaddour: Here.
[00:51:47] Customer: You want to add a text?
[00:51:47] Customer: Okay, yeah.
[00:51:47] Customer: I add a text.
[00:51:52] KaramKhaddour: Then there's text.
[00:51:52] KaramKhaddour: Enter text.
[00:51:57] Customer: Something, something.
[00:52:04] KaramKhaddour: Okay, you can save it.
[00:52:10] Customer: Okay.
[00:52:10] Customer: So, if I have a long text, like 1,000 characters long, what do I see here?
[00:52:10] Customer: Do I see the whole text?
[00:52:36] KaramKhaddour: Technically, yes.
[00:52:36] KaramKhaddour: You can see all.
[00:52:36] KaramKhaddour: Should we do some reprocessing for steps?
[00:52:53] Customer: Maybe, maybe some filtered view of the text.
[00:52:53] Customer: Like, there's only selected sentences.
[00:52:53] Customer: Like, I mean, the sentences that contain selected words.
[00:52:53] Customer: And then when you, when user clicks the text, they can view the whole text.
[00:53:15] KaramKhaddour: Okay, maybe we can generate, a summary for the text.
[00:53:15] KaramKhaddour: That is not more than, 50 words.
[00:53:15] KaramKhaddour: And then they can choose the words they want to learn.
[00:53:15] KaramKhaddour: And if they want, they can go and see the whole text.
[00:53:33] Customer: I didn't get the idea with the summary.
[00:53:36] KaramKhaddour: What does the summary do?
[00:53:36] KaramKhaddour: Let's say they entered a very big text.
[00:53:43] Customer: Okay.
[00:53:43] KaramKhaddour: And instead of showing the whole text, and they will need to go and see and read everything, we will create summary for them based on this text.
[00:53:43] KaramKhaddour: The summary is created using LLM, and the summary is suitable for their level.
[00:53:43] KaramKhaddour: And then they can choose what words they want to learn from the summary.
[00:53:43] KaramKhaddour: So the summary is for shortening the text so they don't need to read very much.
[00:54:14] Customer: Uh-huh.
[00:54:14] Customer: Okay, I got it.
[00:54:14] Customer: But, what if they want to learn a specific word in the text, and it does not occur in the summary?
[00:54:14] Customer: So why do they need the summary?
[00:54:34] KaramKhaddour: Yeah, I get this point as well.
[00:54:34] KaramKhaddour: Maybe they can either click on words, or maybe they can enter them manually.
[00:54:52] Customer: Enter them manually.
[00:54:52] Customer: And then what?
[00:54:52] Customer: Will it, show the word in the text?
[00:54:52] Customer: Or what?
[00:55:01] KaramKhaddour: No, it will use the text as a context for the LLM.
[00:55:06] Customer: Yeah, like the whole text?
[00:55:06] Customer: Like all 3,000 characters?
[00:55:12] KaramKhaddour: Maybe, yeah.
[00:55:12] KaramKhaddour: I think maybe probably we need to limit text so we don't use a lot of tokens.
[00:55:19] Customer: Uh-huh.
[00:55:19] Customer: Yeah.
[00:55:19] Customer: Right now my assumption is that it's enough to know the sentence where a word occurs, and use it as a context for the LLM generation.
[00:55:19] Customer: I might be wrong.
[00:55:19] Customer: Maybe, the previous sentence and the next sentence are needed in some cases, so that the context is right, is correct, and the LLM understands, which meaning of the word to use.
[00:55:19] Customer: So, let me think.
[00:55:19] Customer: So, I think we don't have to send the whole text, just, the surrounding context of a word.
[00:55:19] Customer: It may be one sentence, two sentences, or three sentences, depending on how, which context size is sufficient.
[00:55:19] Customer: What do you think?
[00:55:19] Customer: Like, should we send the whole text, or just the surrounding context of a word?
[00:56:42] KaramKhaddour: No, I think the surrounding context is enough.
[00:56:42] KaramKhaddour: But do we need to show the whole text for them to choose a word, or they can enter the word manually?
[00:56:52] Customer: How do they enter a word?
[00:56:52] Customer: Do they just type the text, or what?
[00:56:58] KaramKhaddour: Yes, I think so.
[00:56:58] KaramKhaddour: They type the word.
[00:57:04] Customer: That was the idea.
[00:57:04] Customer: So, there is, simple input field, and they just paste the text into that input field.
[00:57:04] Customer: And then they click, select words, and then they can work with this text.
[00:57:04] Customer: Like, select some words, mark them as to learn or to ignore, and so on.
[00:57:04] Customer: So, there should be a way to edit the added text.
[00:57:04] Customer: Then they can, throw out some parts of the text, or add some text.
[00:57:04] Customer: They can leave just the words that they want to learn without the context, or they can preserve the context, and so on.
[00:57:04] Customer: Okay.
[00:57:04] Customer: I think I don't hear you.
[00:58:05] KaramKhaddour: Okay.
[00:58:08] Customer: Now I hear, okay.
[00:58:08] Customer: Okay.
[00:58:08] Customer: So, there should be some tooling to extract the surrounding context of a word anyway.
[00:58:08] Customer: So, if a sentence is available, if the word is inside the sentence, then we should take the sentence and send it to the LLM to provide the right context so that it uses this word in the generated sentence with the right meaning.
[00:58:51] KaramKhaddour: So, basically, we need a way to edit the text, and a way to manually enter the sentence.
[00:58:51] KaramKhaddour: Sorry, the word.
[00:58:51] KaramKhaddour: So, they don't need to look at the word in the whole text.
[00:58:51] KaramKhaddour: And if the word exists inside of the sentence, inside of the text, then we take the sentence, and maybe the previous sentence and the sentence afterwards.
[00:59:18] Customer: Yes.
[00:59:18] Customer: By the way, maybe if we are able to split the text into sentences, then when they input a word, then we can provide this feature.
[00:59:18] Customer: So, they type a word somewhere in some input, and we suggest sentences that contain that word.
[00:59:18] Customer: Then they can pick sentences with that word.
[00:59:18] Customer: Maybe one, or maybe two, or more.
[00:59:18] Customer: So, this input should be separate from the original.
[01:00:00] Customer: Original text and the sentences come from that original text.
[01:00:07] KaramKhaddour: Okay, I got you.
[01:00:15] Customer: Okay, editing cards.
[01:00:15] Customer: Okay, and maybe this library menu should be renamed or maybe explain somewhere what is here.
[01:00:38] KaramKhaddour: Yeah, I think we need to change it because we need to add the idea of text.
[01:00:38] KaramKhaddour: And how decks are connected to texts.
[01:00:38] KaramKhaddour: I'm not going to make it to text here.
[01:00:49] Customer: Yeah, okay.
[01:00:52] Customer: Sorry, what we're talking about?
[01:00:57] KaramKhaddour: Yeah, so I think maybe as a general idea, first of all, when we enter the application, we need to see decks, correct?
[01:00:57] KaramKhaddour: We need to choose what decks we want to learn.
[01:00:57] KaramKhaddour: And then we learn the words or sentences from one deck.
[01:00:57] KaramKhaddour: We don't combine them.
[01:00:57] KaramKhaddour: Or from a subset if you choose.
[01:00:57] KaramKhaddour: This is the first idea, I think.
[01:00:57] KaramKhaddour: First user story.
[01:00:57] KaramKhaddour: So here we should have text.
[01:00:57] KaramKhaddour: After that, when we generate new sentences, we also need to generate them inside one deck.
[01:00:57] KaramKhaddour: Correct?
[01:00:57] KaramKhaddour: Like we write text and this text is connected to one deck.
[01:00:57] KaramKhaddour: And then every condition is inside the deck.
[01:01:44] Customer: Okay, yes.
[01:01:46] KaramKhaddour: Nice.
[01:01:46] KaramKhaddour: And okay, I think this is good.
[01:01:46] KaramKhaddour: And here we need to remove this word.
[01:01:46] KaramKhaddour: Or maybe we can keep it only for statistics about you.
[01:02:06] Customer: Yeah.
[01:02:06] Customer: And yes, display button.
[01:02:06] Customer: Yeah, but we discussed that.
[01:02:06] Customer: Yeah, I think the open question is then still about the cards.
[01:02:06] Customer: Can they belong to several decks?
[01:02:06] Customer: Like if your UI connects a deck to a single, connects a text to a single deck, then it will be contrary to the issue that the card may belong to several decks.
[01:02:49] KaramKhaddour: But I think it's, it will be very annoying for the user to like choose for each card which deck they want to, this card to go to.
[01:02:49] KaramKhaddour: So it's easier for them to have like one topic, which is a text.
[01:02:49] KaramKhaddour: Then everything inside this topic is going to one deck.
[01:02:49] KaramKhaddour: It's easier to use, I think.
[01:03:13] Customer: Yeah, maybe right.
[01:03:13] Customer: Right now, our cards are not strictly connected to the texts, right?
[01:03:29] KaramKhaddour: They are not strictly, they are generated from the text, but then we, like we don't care about the text anymore.
[01:03:29] KaramKhaddour: After generation, yeah, it's not important.
[01:03:48] Customer: Yes, probably yes.
[01:03:48] Customer: Because the text can be then edited arbitrarily by the user, and the word may disappear from the text.
[01:03:48] Customer: Unless there is some copy-on-write.
[01:03:48] Customer: Okay, let's detach cards from texts.
[01:03:48] Customer: We just saved the context, and now the card is independent.
[01:03:48] Customer: Okay, since it's independent from the text, it can belong to multiple decks, right?
[01:03:48] Customer: So, I mean, in the card, inside the card, could you please open the card?
[01:03:48] Customer: Okay, inside the card, I don't know which deck it belongs to right now, but maybe there should be some element that lets you choose the decks that the card belongs to.
[01:03:48] Customer: I mean, of course, you won't be doing this manually for each card.
[01:03:48] Customer: No, I mean, you won't manually add each card to a deck, like after generation.
[01:03:48] Customer: Cards should be initially generated for a specific deck, but there should be an option to add the cards to some deck, I guess, or to multiple decks.
[01:03:48] Customer: Or to remove from them, and the card should belong to at least one deck.
[01:03:48] Customer: Yep, and then, yeah, on the page where you can generate new cards, yeah, you should also state the deck that you generate them for, and then the UI will probably work as well.
[01:03:48] Customer: So, yeah, that's it from my side.
[01:06:28] KaramKhaddour: Okay, second, please.
[01:06:28] KaramKhaddour: So, we talked about what are the user stories, and for what we have now, and what we need to add, we need to add the authentication system, I think.
[01:06:28] KaramKhaddour: And I think maybe we need to discuss how the teacher will interact with the student, what they need to, what is the role of the teacher, basically.
[01:07:00] Customer: Yes.
[01:07:01] KaramKhaddour: Do you have any vision about that?
[01:07:09] Customer: So, the teacher should be able to edit the cards of a student, and it should be some convenient interface for editing the cards.
[01:07:09] Customer: The teacher will probably review, not from mobile, but from desktop version.
[01:07:39] KaramKhaddour: Should we assume that the teacher have many students?
[01:07:45] Customer: Yeah, they may have many students.
[01:07:45] Customer: Maybe the student should be able to invite the teacher to a deck, or maybe, I don't think the teacher should see all decks of a student.
[01:07:45] Customer: Or maybe the student should be able to share a deck with the teacher, yeah, the same thing as invite, but, okay, some mechanism for sharing.
[01:07:45] Customer: And then the teacher can review the cards, edit them, and directly, and probably there shouldn't be such a list that you showed, where each card takes, too much space, vertical space.
[01:07:45] Customer: Probably it should be a grid.
[01:07:45] Customer: Sorry, like a sheet in Excel, where everything is horizontal, and the teacher can scroll, if there are many cards, hundreds of them.
[01:07:45] Customer: And the start and end of each sentence are aligned with each other, to simplify reading, and to look at, to make it look neatly.
[01:07:45] Customer: Yeah, and then there should be some buttons for marking the card as bad, or, subject to regeneration, or immediately removing it.
[01:07:45] Customer: Maybe this comments field might also be [inaudible].
[01:07:45] Customer: The point is that everything should be in the same layer and immediately visible.
[01:07:45] Customer: There should be no need to click a card to edit it.
[01:07:45] Customer: The teacher will probably look at multiple cards at once, to speed up the process.
[01:07:45] Customer: So, all relevant information should be visible.
[01:07:45] Customer: So, yeah, when they're done, they should probably click a button to submit the results, and then, I don't know what should happen, should the regeneration process start immediately, or should the student trigger it, for the cards that were marked as bad.
[01:07:45] Customer: But I think we can think it through a bit later.
[01:10:55] KaramKhaddour: Okay, so for now, we can have, a similar version, which is a student will invite the teacher, and when they invite them, the teacher will be able to edit the card or mark it as bad.
[01:11:12] Customer: Yeah, something like that.
[01:11:12] Customer: Yeah, and regarding the...
[01:11:18] KaramKhaddour: They invite them to specific texts, they don't invite them to everything.
[01:11:25] Customer: Right, and regarding the API keys, so I think this service itself should not provide an API key, so it should be bring your own key.
[01:11:25] Customer: There must be a bring your own key option for a student.
[01:11:25] Customer: Maybe the service can provide a subscription, like 10 bucks a month, and you can generate cards.
[01:11:25] Customer: Yeah, and for the teacher, okay, there could be no functionality for transferring money to the teacher in our service.
[01:11:25] Customer: I think it should happen out of the service, the student contacts the teacher somehow and transfers money, because it's a bit hard to measure the work of the teacher, like whether they did a good job or not, and I think it shouldn't be there for the responsibility of our service.
[01:11:25] Customer: Okay, so if they want to trigger...
[01:11:25] Customer: Yeah, I think while editing the cards, the teacher should be able to trigger regeneration for specific cards to finally get the necessary result, yeah.
[01:11:25] Customer: Yeah, I think the teacher is responsible for generating valid cards, like better versions of cards, not the student.
[01:11:25] Customer: So the triggering the regeneration should be while editing the cards by the teacher, not afterwards, after submitting the results.
[01:11:25] Customer: So the teacher will often need an API key or may use some subscription.
[01:11:25] Customer: I think the student should not give an API key to the teacher, because they will have to pay them somehow.
[01:11:25] Customer: Yeah, or they can steal it, right.
[01:14:24] KaramKhaddour: Can we store the API key, the student API key, and then let the teacher use the student's API key?
[01:14:37] Customer: Sorry, what do we store?
[01:14:37] Customer: The student's API key?
[01:14:40] KaramKhaddour: We store the API key from the student.
[01:14:43] Customer: Okay.
[01:14:45] KaramKhaddour: And then the student will invite the teacher, and then we will allow the teacher to use the API key that the student is storing with us.
[01:14:59] Customer: So this API key, where does this API key come from?
[01:15:10] KaramKhaddour: It's usually, they need to pay for it, like for [inaudible], I think you need to like subscribe to their, what do you call it, not subscription, you need like an API key for your cloud account, I think, [inaudible] account.
[01:15:10] KaramKhaddour: And this API key, then you will be billed for this API key.
[01:15:36] Customer: Yeah.
[01:15:36] Customer: Okay, so you buy it from somewhere, from some provider.
[01:15:36] Customer: They advise you to use their API.
[01:15:36] Customer: And this key is this is what I refer to as bring your own key.
[01:15:36] Customer: So we have a service, you can enter your API key, and then you will make calls to an LLM, to the provider from which you obtain the API key.
[01:15:36] Customer: And the subscription inside our service is a different thing.
[01:15:36] Customer: We make requests on your behalf.
[01:15:36] Customer: We obtain the API key instead of you, and we can make requests, and we just send you the sentences, while your token limit is not exceeded.
[01:15:36] Customer: Yeah.
[01:15:36] Customer: And regarding sharing the key, so if a student brings their own key, they should be able to not share it with the teacher.
[01:15:36] Customer: The teacher may use some smarter model.
[01:15:36] Customer: They may want to use their own key, and so they may even not need the student's key.
[01:15:36] Customer: And the student would not be forced to use our subscription.
[01:15:36] Customer: Okay.
[01:15:36] Customer: And also, we should somehow prevent stealing the key in our service.
[01:15:36] Customer: It should be relatively secure.
[01:15:36] Customer: So the teacher should not be able to steal student's key.
[01:15:36] Customer: Ideally, the student's key could not even enter our service, like our servers.
[01:15:36] Customer: It should stay in the browser of the student, and the client in the student's browser should make requests, and this key should not be transferred anywhere.
[01:15:36] Customer: So if it is possible, then we can go with this, and then we will be able to promise the user that we don't steal your key or send it anywhere.
[01:15:36] Customer: Okay.
[01:15:36] Customer: Any more questions?
[01:18:28] KaramKhaddour: Guys, do you have any questions?
[01:18:28] KaramKhaddour: Okay, I think we have a clear vision for our next steps, and hopefully by next week, we could have like our MUP, and we can take it from there.
[01:18:28] KaramKhaddour: Okay.
[01:18:28] KaramKhaddour: Thank you very much.
[01:19:05] Customer: Yeah, thank you too.
[01:19:05] Customer: Very deep session.
[01:19:05] Customer: Thank you.
[01:19:11] KaramKhaddour: Thank you very much.
[01:19:11] KaramKhaddour: Bye-bye.
[01:19:11] KaramKhaddour: Thank you.
[01:19:11] KaramKhaddour: Bye-bye.
[01:19:16] Customer: Have a nice evening.
[01:19:16] Customer: You too.
