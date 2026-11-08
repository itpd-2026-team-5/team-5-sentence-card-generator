# Week 6 Customer Validation Transcript

- **Date:** 2026-11-08.
- **Participants:** Customer, KaramKhaddour, Byakko-san, saleemasekrea000.

[00:00:07] KaramKhaddour: This week was mainly about trying to make it as mobile-friendly as possible.
[00:00:20] KaramKhaddour: Unfortunately, we did not manage to deploy it.
[00:00:25] KaramKhaddour: We have not managed to deploy the new version on the VM yet, but we will before the assignment deadline.
[00:00:33] KaramKhaddour: When you review the assignment, you can access it from the VM's IP address.
[00:00:42] KaramKhaddour: Now I will show it to you from my localhost.
[00:00:46] KaramKhaddour: Last week, we talked about how it was not mobile-friendly or very responsive, so we tried to make it as responsive as possible.
[00:00:58] KaramKhaddour: We tried to get rid of horizontal scrolling, and if you remember, last week this list of items at the bottom did not appear.
[00:01:11] KaramKhaddour: We fixed this problem, and last week you also told us it would be nice to have the sound button visible at all times as a global setting.
[00:01:24] KaramKhaddour: The user does not need to go to Settings and set the sound from there.
[00:01:29] KaramKhaddour: We did this as well.
[00:01:32] KaramKhaddour: We also discussed that the language level is not important in Settings, as the user will set it inside the deck itself.
[00:01:42] KaramKhaddour: Now, if you do not know your level in the language, you can come here and take the placement test, and that is it.
[00:01:52] KaramKhaddour: It is just for your reference, not for card generation.
[00:02:06] KaramKhaddour: We will probably need to change the design a little so Russian looks like German, but this is the idea.
[00:02:19] KaramKhaddour: Last week, you also told us it would be better for the teacher to approve the sentence directly, so they do not need to go inside each card and approve it from there.
[00:02:36] KaramKhaddour: They can now approve it directly if they accept the sentence.
[00:02:45] KaramKhaddour: We did this this week, and we also started doing the telemetry.
[00:02:57] Customer: Give me a second to share the screen.
[00:03:01] KaramKhaddour: Okay, we have some dashboards about the product.
[00:03:20] KaramKhaddour: We are still experimenting with what we can put in them and what will be helpful and useful.
[00:03:32] KaramKhaddour: First, we have an idea for a product overview.
[00:03:39] KaramKhaddour: How many cards were generated?
[00:03:41] KaramKhaddour: How many sessions were completed?
[00:03:44] KaramKhaddour: Study sessions.
[00:03:46] KaramKhaddour: Currently, there are none, so there is no data.
[00:03:49] KaramKhaddour: How many cards were generated?
[00:03:51] KaramKhaddour: How many texts were added?
[00:03:54] KaramKhaddour: [inaudible]
[00:03:56] KaramKhaddour: Generation failure and teacher approval.
[00:04:01] KaramKhaddour: I think we need to divide it into more logical dashboards.
[00:04:07] KaramKhaddour: For example, one dashboard for the teacher part and maybe one for generation quality.
[00:04:16] KaramKhaddour: Generation quality will show how many cards were generated and how many were regenerated.
[00:04:26] KaramKhaddour: Maybe we can ask the user for a generation-quality rating: how satisfied they were with the card.
[00:04:40] KaramKhaddour: I think this could help us.
[00:04:50] Customer: Did you try it with real traffic?
[00:04:59] KaramKhaddour: Yes, this is connected to localhost.
[00:05:02] KaramKhaddour: That is why there is not a lot of data.
[00:05:10] KaramKhaddour: We are also setting up the logs in OpenObserve.
[00:05:14] KaramKhaddour: You have all the logs that you need.
[00:05:18] KaramKhaddour: Or not all the logs that you need, but all the logs in general.
[00:05:20] KaramKhaddour: Every request from the frontend to the backend is logged here.
[00:05:26] KaramKhaddour: You can create your queries.
[00:05:36] KaramKhaddour: We also have a dashboard for health.
[00:05:44] KaramKhaddour: We can call it health or an overview of the application.
[00:05:47] KaramKhaddour: Which routes were the slowest?
[00:05:50] KaramKhaddour: How many server errors do you have?
[00:05:54] KaramKhaddour: How many requests are you getting?
[00:05:59] KaramKhaddour: And the latency.
[00:06:01] KaramKhaddour: What is the latency of your application?
[00:06:02] KaramKhaddour: Of your requests, basically.
[00:06:08] KaramKhaddour: We are still experimenting with everything, with dashboards and telemetry, to see what we can provide and to provide something useful, not just dashboards.
[00:06:28] KaramKhaddour: I think this is what we have done so far this week.
[00:06:32] Customer: I am glad that it works.
[00:06:36] KaramKhaddour: Do you have any information in mind that we should show to the operator in the observability section?
[00:06:49] Customer: You managed to implement this P95 latency by outcome, right?
[00:07:00] Customer: You know that your requests execute in under some specific number of milliseconds, right?
[00:07:13] KaramKhaddour: Yes.
[00:07:15] KaramKhaddour: Here, 95 percent of them are within 100 milliseconds.
[00:07:27] Customer: Maybe the query should be corrected to show values rather than just the placeholders, route and outcome.
[00:07:47] Customer: Which exact route and which outcome.
[00:07:55] KaramKhaddour: Okay.
[00:07:58] Customer: Yes.
[00:08:01] Customer: Otherwise, it is great that you implemented it.
[00:08:08] KaramKhaddour: Thank you.
[00:08:11] KaramKhaddour: I was also thinking about adding a dashboard for LLM usage.
[00:08:18] KaramKhaddour: For the operator to understand the cost, because it is costly.
[00:08:30] Customer: What exactly are you going to track for LLM usage?
[00:08:39] KaramKhaddour: The LLM provider usually gives you the number of tokens you used in a request.
[00:08:47] Customer: Yes.
[00:08:48] Customer: Can you receive this number from the provider?
[00:08:54] KaramKhaddour: Yes.
[00:08:54] KaramKhaddour: Yes.
[00:08:55] Customer: Okay.
[00:08:57] KaramKhaddour: We receive this number, and we have, let us say, an average cost for each token.
[00:09:05] KaramKhaddour: We show them how much they need to pay, or how much it costs them.
[00:09:16] Customer: I think the real cost will probably not be provided.
[00:09:29] Customer: I am not sure.
[00:09:31] Customer: In OpenRouter, they can route your request dynamically to several providers, and each one charges a different amount for a request.
[00:09:49] Customer: I am not sure how to do this properly or whether you should handle this on your side.
[00:09:58] Customer: Maybe token spending, but if you do not handle it at all, it can be handled on the provider's side.
[00:10:12] KaramKhaddour: To see, for example, if Claude provides a cost for each request.
[00:10:20] Customer: Sorry?
[00:10:22] KaramKhaddour: You mean to see if Anthropic will provide the cost of each request?
[00:10:29] Customer: If who will provide it?
[00:10:31] KaramKhaddour: Anthropic, for example.
[00:10:33] KaramKhaddour: If we are using Claude.
[00:10:35] Customer: Ah, Anthropic.
[00:10:36] Customer: Okay.
[00:10:38] Customer: I am not sure.
[00:10:40] Customer: If you use Anthropic, they may provide the cost.
[00:10:46] Customer: I am not sure if you can get it from OpenRouter.
[00:10:50] Customer: The operator may not want to use Anthropic.
[00:10:56] Customer: They may want to use another provider.
[00:11:01] Customer: Some providers may give this number.
[00:11:08] Customer: Some may not give it.
[00:11:11] Customer: Through the API.
[00:11:12] Customer: Maybe they give it only after signing in to the site and going to the dashboard.
[00:11:19] Customer: I am not sure.
[00:11:20] Customer: If you can, then great.
[00:11:23] Customer: You may try to extract the expenses from the provider's responses.
[00:11:32] Customer: I am not sure if it will work for every provider.
[00:11:36] Customer: I think there are frameworks that aggregate multiple providers.
[00:11:42] Customer: The same interface for multiple providers.
[00:11:45] Customer: LightLLM, I guess.
[00:11:48] Customer: Something like this.
[00:11:50] Customer: Maybe they already have a feature to count the expenses.
[00:12:01] Customer: Or to request the expenses.
[00:12:07] Customer: Okay, maybe.
[00:12:09] Customer: I am just not sure whether it should be handled on your side.
[00:12:14] Customer: Whether it is really necessary.
[00:12:18] Customer: If you use a provider like OpenRouter, you can go there and see how many tokens are spent, how many remain before the limit is reached, and so on.
[00:12:37] Customer: What do you think?
[00:12:40] Customer: What could the operator need this for in this observability platform?
[00:12:49] KaramKhaddour: I think if we can do it in our section, it will be better.
[00:12:54] KaramKhaddour: You would have only one place to see everything.
[00:13:00] KaramKhaddour: It is better than having two places that you need to switch between.
[00:13:06] KaramKhaddour: A single source of control, basically.
[00:13:11] KaramKhaddour: Or a single source.
[00:13:12] KaramKhaddour: I think it will be more convenient.
[00:13:16] Customer: Okay.
[00:13:18] Customer: If you can get accurate information, it will not be a single source of truth because you already have the provider.
[00:13:36] KaramKhaddour: Yes, not a single source of truth, but yes.
[00:13:40] Customer: This might be useful if the operator switches providers completely.
[00:13:53] Customer: They used Anthropic, then switched to OpenRouter, then tried OpenAI.
[00:14:00] Customer: In this case, you will have all of these costs aggregated in the same dashboard.
[00:14:13] Customer: They can calculate the total for a month.
[00:14:17] Customer: For example, how much they spent on APIs.
[00:14:21] Customer: Okay, maybe.
[00:14:24] Customer: I agree that this might be a useful feature for this use case.
[00:14:32] KaramKhaddour: I will see if we can get this information.
[00:14:37] KaramKhaddour: Okay, I think that is all for this week.
[00:14:52] Customer: All right, so what is...
[00:14:56] Customer: Could you please show the mobile version?
[00:14:59] Customer: You have some progress.
[00:15:05] KaramKhaddour: Yes.
[00:15:08] KaramKhaddour: For example, in this text bar, when you went inside one of them, it was one big table that you needed to scroll through to see every column.
[00:15:22] KaramKhaddour: We tried to make it more mobile-friendly.
[00:15:31] KaramKhaddour: These are mainly the additions so far.
[00:15:44] KaramKhaddour: After we deploy it, we can give you the URL, and you can probably see it firsthand.
[00:15:52] KaramKhaddour: It would be more useful.
[00:15:55] Customer: Okay, but I have one comment right now.
[00:16:03] Customer: I think it was in Texts.
[00:16:08] Customer: No, maybe in Teaching.
[00:16:12] Customer: Please open one of the links.
[00:16:17] Customer: The English sentence is missing here.
[00:16:30] KaramKhaddour: Yes, I also know what this is.
[00:16:34] KaramKhaddour: This should probably be here.
[00:16:37] Customer: Yes, and I do not know.
[00:16:47] Customer: To check and approve.
[00:16:51] Customer: Maybe we can move the "To check" label and the Approve and Edit buttons to the upper-right corner of the card.
[00:17:08] Customer: Assuming the word is not so long that it reaches this label and the buttons.
[00:17:24] KaramKhaddour: Yes, if it is already checked, we can highlight it in green.
[00:17:34] KaramKhaddour: If it is not checked, there is no highlight.
[00:17:39] KaramKhaddour: Edit and Approve could be two buttons here.
[00:17:44] KaramKhaddour: Approve could be a checkmark.
[00:17:47] KaramKhaddour: Edit could be a pencil.
[00:17:53] KaramKhaddour: Instead of these buttons, we could have the English translation.
[00:18:00] Customer: Yes.
[00:18:01] Customer: Okay.
[00:18:04] Customer: Yes, we will try to do this.
[00:18:08] Customer: We can review the design later.
[00:18:11] Customer: If you would like feedback, you can send a screenshot in the chat.
[00:18:20] Customer: Or deploy it and ask for a review.
[00:18:23] Customer: When you click the Edit button, what happens?
[00:18:34] KaramKhaddour: Go outside.
[00:18:37] Customer: Okay.
[00:18:40] Customer: Okay.
[00:18:41] Customer: What is "In-study"?
[00:18:44] Customer: What does it mean?
[00:18:49] KaramKhaddour: It means a normal card, basically.
[00:18:52] KaramKhaddour: There are two different levels.
[00:18:55] KaramKhaddour: There is a new card.
[00:18:56] KaramKhaddour: It has never been studied before.
[00:18:59] KaramKhaddour: There is "In-study".
[00:19:00] KaramKhaddour: You have already studied it once, but you marked it as hard, medium, and so on.
[00:19:07] KaramKhaddour: There is a card.
[00:19:09] KaramKhaddour: I am not sure.
[00:19:12] KaramKhaddour: These are the levels for the card.
[00:19:16] Customer: Okay.
[00:19:19] Customer: Okay.
[00:19:23] Customer: I am confused.
[00:19:31] Customer: Maybe "The word as it appears" should go before the sentence.
[00:19:38] Customer: I would like to see exactly which word I am editing.
[00:19:54] Customer: Its meaning here should go before the translation, I guess.
[00:20:08] Customer: Okay.
[00:20:16] Customer: Or should it, for a teacher, maybe they should see the sentence.
[00:20:25] Customer: They do not need the word.
[00:20:29] Customer: Do they need it?
[00:20:31] Customer: I am not sure.
[00:20:34] Customer: Okay.
[00:20:36] Customer: In my version, they could see the word first, then its translation, then the sentence and its translation.
[00:20:57] Customer: Why?
[00:21:00] Customer: If the word translation is wrong, then the sentence is probably also wrong.
[00:21:11] Customer: If you correct the word translation, then later you can pick the sentence translation.
[00:21:23] Customer: Maybe, but I am not sure if it will be a very common use case.
[00:21:32] Customer: Maybe it is right to put the sentence and its translation first, because usually the translation is correct.
[00:21:44] Customer: For a teacher, it would be easier to fix the sentence first.
[00:21:51] Customer: Let us keep it like this.
[00:21:55] Customer: The sentence and translation first, and the word next.
[00:22:05] Customer: Okay.
[00:22:06] Customer: At least we see the word at the top of the screen.
[00:22:11] Customer: Okay.
[00:22:14] Customer: Is this the whole screen, or is there something else?
[00:22:20] Customer: No.
[00:22:20] Customer: Okay, so "Where the word came from"?
[00:22:25] Customer: Could you please click there?
[00:22:30] Customer: Okay.
[00:22:33] KaramKhaddour: Sentence.
[00:22:34] Customer: This is the original sentence.
[00:22:38] KaramKhaddour: Yes.
[00:22:41] Customer: Okay.
[00:22:50] Customer: The problem the teacher has to fix is that the sentence may not convey the meaning of the word.
[00:23:09] Customer: The generated sentence may not convey the initial meaning of the word.
[00:23:15] Customer: They would probably like to see the original sentence then.
[00:23:24] Customer: Not here, but maybe even before the generated sentence.
[00:23:35] Customer: I would suggest moving this higher on the screen, above the sentence.
[00:23:43] Customer: Keep it non-editable.
[00:23:49] Customer: I think it would be between "Looks good" and "Sentence".
[00:23:56] Customer: What is it called?
[00:23:59] Customer: The button.
[00:24:00] Customer: Okay.
[00:24:00] Customer: Yes, "Looks right" and "Sentence".
[00:24:01] Customer: "Looks right".
[00:24:03] Customer: So the teacher knows which meaning of the word to look at.
[00:24:09] Customer: It would also be nice if you could highlight the word inside that sentence so the teacher can quickly find the original sentence.
[00:24:29] Customer: And get its meaning.
[00:24:35] Customer: Okay.
[00:24:37] Customer: "New sentence".
[00:24:38] Customer: "What was wrong?"
[00:24:41] Customer: "New sentence".
[00:24:47] Customer: What does it rewrite it for?
[00:24:59] Customer: "What was wrong?"
[00:25:07] Customer: "New sentence".
[00:25:11] Customer: I think the section name is a bit...
[00:25:21] Customer: It lacks information.
[00:25:27] Customer: What happens when they click "Rewrite now"?
[00:25:35] Customer: Are both sentences regenerated?
[00:25:40] Customer: The German and English sentences.
[00:25:42] KaramKhaddour: Yes.
[00:25:45] Customer: Maybe call it "Regenerate a card" or something.
[00:25:52] Customer: "Regenerate the card", and then provide a short description below the section name that specifies a prompt for regenerating the card.
[00:26:10] Customer: Then it will be clear that "What was wrong" is one part of the prompt.
[00:26:19] Customer: "Instructions this card is written with" is another part of the prompt, and so on.
[00:26:24] Customer: I would like to see "Latest rewritten sentence".
[00:26:33] Customer: I would like to see some explanation of what this sentence is about and what those inputs mean.
[00:26:44] Customer: It is great that you put "Latest rewritten sentence" here, near regeneration, but it is a bit in reverse.
[00:27:02] Customer: I think it should be below the Regenerate button rather than above "What was wrong" and the prompts, because that is the natural flow.
[00:27:14] Customer: You see what you typed, the prompt, then click Regenerate, then see the result.
[00:27:21] Customer: I think it should move lower.
[00:27:24] Customer: Could you please scroll down a bit?
[00:27:30] Customer: "Mark to rewrite later".
[00:27:32] Customer: Yes.
[00:27:33] Customer: And Archive.
[00:27:34] Customer: "Archive keeps the card and its history, but stops studying it."
[00:27:41] Customer: "Delete removes it for good."
[00:27:43] Customer: I think this last sentence should be removed because we do not have the Delete button anymore.
[00:27:55] Customer: Otherwise, it is great that you clarified what Archive does.
[00:28:02] Customer: Okay.
[00:28:06] Customer: Could you please scroll to the top of the screen?
[00:28:28] Customer: Should we let the teacher edit the word?
[00:28:37] Customer: I have a question about articles or nouns.
[00:28:43] KaramKhaddour: They have...
[00:28:44] KaramKhaddour: Yes, they are specified by the LLM.
[00:28:49] Customer: Does the LLM provide articles or not?
[00:28:55] Customer: Yes.
[00:28:57] Customer: There is some bug here, because Anschluss is a noun, and it does not have an article here.
[00:29:10] Customer: The LLM did not provide an article.
[00:29:17] Customer: There is a problem in German that a noun can have a different meaning depending on the article.
[00:29:31] Customer: I think we had an example like "der Bank" and "die Bank", I guess, and if we let the teacher edit the word itself, they can break the meaning of the word by changing...
[00:30:06] Customer: I do not know, what else can they break?
[00:30:09] Customer: If they edit the word, what can break?
[00:30:21] Customer: Do you know?
[00:30:31] Customer: "The word as it appears", I mean.
[00:30:33] Customer: If they edit it and change it to a completely different word.
[00:30:40] KaramKhaddour: At least they should be able to change the meaning, right?
[00:30:45] KaramKhaddour: Yes, yes.
[00:30:47] Customer: The LLM might specify the wrong meaning.
[00:30:55] KaramKhaddour: I am not sure.
[00:30:57] KaramKhaddour: Maybe we can just not allow them to edit it?
[00:31:04] Customer: Maybe, but in this case, for example, the LLM did not find the right article.
[00:31:13] Customer: The teacher may specify it.
[00:31:19] KaramKhaddour: We can probably trust the teacher, right?
[00:31:23] Customer: Yes, probably, we should trust them.
[00:31:28] Customer: Okay, let us trust the teacher.
[00:31:37] Customer: We will let them edit all the fields.
[00:31:42] Customer: As a student, I trust the teacher.
[00:31:47] Customer: But as a developer, will something break if they change the word here?
[00:31:55] Customer: Or will nothing break?
[00:31:58] Customer: Will some cards disappear or get sorted in the wrong way?
[00:32:04] Customer: Or lose the progress?
[00:32:07] Customer: Have you handled this case?
[00:32:16] KaramKhaddour: No, I think we need to review more cases like this.
[00:32:21] Customer: Okay.
[00:32:24] Customer: Otherwise, I am okay with letting the teacher edit.
[00:32:31] Customer: Okay.
[00:32:33] Customer: All right.
[00:32:35] Customer: I think that is it for this screen.
[00:32:38] Customer: Let us edit it.
[00:32:44] Customer: Okay.
[00:32:47] Customer: We talked about the buttons and moving them.
[00:32:51] Customer: "Requests from the student appear first."
[00:33:07] Customer: Do you think the "To check" label is intuitive enough to match it with this instruction?
[00:33:18] Customer: "Requests from the student appear first."
[00:33:22] Customer: Or should there be some legend?
[00:33:29] KaramKhaddour: Yes, it shows.
[00:33:54] KaramKhaddour: I think if we go here.
[00:33:59] KaramKhaddour: And maybe ask the teacher for this.
[00:34:13] KaramKhaddour: Okay.
[00:34:42] KaramKhaddour: Yes, they appear first, "Asked to check".
[00:34:47] Customer: Yes.
[00:34:48] KaramKhaddour: Yes.
[00:34:57] Customer: There is a deck.
[00:35:04] Customer: A student has a deck.
[00:35:07] Customer: They ask a teacher to check the deck.
[00:35:13] Customer: The checked cards get this "Checked" label.
[00:35:20] Customer: Unchecked cards that were not requested for checking get this "To check" label.
[00:35:30] Customer: Cards that were requested for checking get this "Asked to check" label, right?
[00:35:39] KaramKhaddour: Yes.
[00:35:40] Customer: Okay.
[00:35:47] Customer: Okay.
[00:35:48] Customer: Maybe it is intuitive enough.
[00:35:51] Customer: I would still add a little legend at the top of this page to clarify what it means.
[00:36:03] KaramKhaddour: Okay.
[00:36:14] Customer: Or at least clarify it inside the sentence.
[00:36:22] Customer: "Requests from the student appear first."
[00:36:25] Customer: In parentheses, "Asked to check", "To check".
[00:36:33] Customer: Just like this, in plain text.
[00:36:37] Customer: Okay.
[00:36:38] Customer: "Open a card to listen."
[00:36:40] Customer: Edit or review it.
[00:36:45] Customer: Yes.
[00:36:47] Customer: What does it mean to open a card?
[00:36:51] KaramKhaddour: This.
[00:36:54] Customer: If they click this button, the card opens.
[00:36:57] Customer: And if they click somewhere else inside it?
[00:37:01] KaramKhaddour: It also opens.
[00:37:02] Customer: Ah, it also opens.
[00:37:04] Customer: Okay.
[00:37:10] Customer: Okay.
[00:37:21] Customer: Okay.
[00:37:23] Customer: I am not sure if it is necessary to duplicate the functionality.
[00:37:32] Customer: Clicking a card opens the card, and clicking the button opens the card.
[00:37:43] Customer: But I think...
[00:37:46] Customer: What do you think?
[00:37:52] Customer: Maybe it is for accessibility, but I do not know.
[00:38:00] KaramKhaddour: I do not know.
[00:38:03] KaramKhaddour: I think some people will not find it intuitive to just click the card.
[00:38:09] KaramKhaddour: Yes.
[00:38:09] KaramKhaddour: They will not think that something will happen when clicking the card.
[00:38:16] Customer: Yes.
[00:38:17] Customer: Even if we provide the instruction at the top, like "Click"?
[00:38:21] KaramKhaddour: Oh, yes.
[00:38:22] KaramKhaddour: Maybe, yes.
[00:38:23] KaramKhaddour: Maybe if we provide instructions, that is enough, right?
[00:38:27] Customer: Yes.
[00:38:29] Customer: But if they scroll past this instruction...
[00:38:34] KaramKhaddour: We can keep the instruction at the top and make it scrollable.
[00:38:41] KaramKhaddour: Only the cards scroll, so the instruction does not move.
[00:38:47] Customer: Oh, yes.
[00:38:48] Customer: Maybe we can do that.
[00:38:51] Customer: We will then, what is it called?
[00:38:56] Customer: Sacrifice some space for this instruction.
[00:39:02] Customer: Yes, but...
[00:39:03] KaramKhaddour: Everything will appear as it does now, but instead of everything moving, only the cards will move.
[00:39:12] Customer: Yes.
[00:39:13] Customer: They will see fewer cards at a time because the top of the screen will be fixed.
[00:39:23] KaramKhaddour: Yes.
[00:39:24] KaramKhaddour: Yes.
[00:39:26] Customer: Okay.
[00:39:27] Customer: Anyway, if it has useful actions and instructions, I think that is okay.
[00:39:37] Customer: Okay.
[00:39:39] Customer: Let us make the list of cards scrollable.
[00:39:43] KaramKhaddour: Yes.
[00:39:45] Customer: Okay.
[00:39:46] Customer: I think that is it for Teaching.
[00:39:50] Customer: Let us go to Texts.
[00:39:56] Customer: There is a text.
[00:40:00] Customer: Yes.
[00:40:00] Customer: Now I see this icon that shows that I can drag and drop.
[00:40:11] Customer: Okay.
[00:40:12] Customer: "A text is where you find words."
[00:40:14] Customer: "Paste one."
[00:40:15] Customer: How...
[00:40:16] Customer: I click Add text, and then...
[00:40:20] Customer: Yes.
[00:40:24] Customer: Add text.
[00:40:26] Customer: I am not sure what the best UX practice is.
[00:40:34] Customer: To put a button below the instructions or above them.
[00:40:43] Customer: After I read the instructions, I did not immediately notice the button.
[00:40:52] Customer: I just saw this table, this list.
[00:40:58] Customer: Yes.
[00:41:01] Customer: Okay.
[00:41:01] Customer: Anyway, if you click Add text, what happens?
[00:41:08] Customer: Yes.
[00:41:09] Customer: Specify the title, the text language, or load it.
[00:41:15] Customer: Okay.
[00:41:17] Customer: And some other metadata.
[00:41:20] Customer: Nice.
[00:41:20] Customer: "Notes never turn into cards."
[00:41:24] Customer: Yes.
[00:41:25] Customer: Some other information.
[00:41:27] Customer: Okay.
[00:41:29] Customer: "Add and pick words."
[00:41:33] Customer: Please click there.
[00:41:37] Customer: What happens with an empty text?
[00:41:41] Customer: Is there some...
[00:41:43] Customer: Yes.
[00:41:45] Customer: Okay.
[00:41:47] Customer: Type something in the title.
[00:41:49] Customer: But keep the text empty.
[00:41:51] Customer: What will happen?
[00:41:59] Customer: Oh, okay.
[00:42:02] Customer: Something should be there.
[00:42:08] Customer: Okay.
[00:42:09] Customer: Type something.
[00:42:13] Customer: Maybe.
[00:42:15] Customer: By the way, if you set the text language to German but type something in English, what happens?
[00:42:27] Customer: Okay.
[00:42:31] Customer: Can you...
[00:42:31] Customer: From here, you can edit the text, right?
[00:42:36] KaramKhaddour: Yes.
[00:42:38] Customer: Okay.
[00:42:42] Customer: Should we check or validate that the text matches the language?
[00:42:54] Customer: Or should we trust the user?
[00:42:56] Customer: What do you think?
[00:42:58] KaramKhaddour: I think it is very hard to check.
[00:43:04] Customer: Sorry?
[00:43:05] KaramKhaddour: You can write...
[00:43:10] Customer: I did not catch that.
[00:43:11] Customer: What did you say?
[00:43:13] KaramKhaddour: I think it is very hard to check the language from the text.
[00:43:18] Customer: Yes, I agree.
[00:43:21] Customer: It can contain some words from other languages.
[00:43:29] Customer: Sometimes there is German with some English words.
[00:43:37] Customer: Yes.
[00:43:38] Customer: Okay.
[00:43:40] Customer: Let us trust the user then.
[00:43:44] Customer: Okay.
[00:43:45] Customer: Then they can...
[00:43:47] Customer: What happens here?
[00:43:48] Customer: "Text language: German."
[00:43:51] Customer: "Word tray: zero."
[00:43:54] Customer: "Type a word to find its sentences."
[00:44:03] Customer: I do not quite understand the structure here.
[00:44:14] Customer: Could you please scroll to the top?
[00:44:20] Customer: Okay.
[00:44:23] Customer: "Text language: German."
[00:44:25] Customer: "Word tray: one."
[00:44:27] Customer: "Word tray: one."
[00:44:32] Customer: What does it mean?
[00:44:33] Customer: Words selected, or what?
[00:44:35] KaramKhaddour: Yes.
[00:44:36] Customer: Okay.
[00:44:41] Customer: Should it be phrased like this?
[00:44:46] Customer: Can it be phrased in a more intuitive way?
[00:44:51] KaramKhaddour: Okay.
[00:44:52] Customer: "Words selected", or what?
[00:44:54] Customer: Yes, maybe.
[00:44:56] Customer: Okay.
[00:44:57] Customer: "Type a word to find its sentences."
[00:44:59] Customer: Again, this is a very clear instruction, but where do I search the sentences?
[00:45:07] Customer: Ah, in the text.
[00:45:12] Customer: "Only sentences with marked words."
[00:45:16] KaramKhaddour: Yes.
[00:45:21] Customer: If the text is large, what happens then?
[00:45:26] Customer: Where does the word tray appear?
[00:45:32] KaramKhaddour: At the bottom.
[00:45:34] Customer: At the bottom, below the text?
[00:45:38] KaramKhaddour: Yes.
[00:45:39] Customer: Yes.
[00:45:40] Customer: Okay.
[00:45:41] Customer: I think we should have some space for working with the text.
[00:45:55] Customer: Filtering.
[00:45:57] Customer: Set aside some space for deck settings.
[00:46:05] Customer: "I'm learning", "Translate into", "Generate into".
[00:46:13] Customer: That is basically it.
[00:46:21] Customer: Okay, but the word tray.
[00:46:25] Customer: I think the word tray, the selected words, is separate from deck settings.
[00:46:39] Customer: I think it should be somewhere in the space where you work with the text.
[00:46:49] Customer: You can see which words you selected, the marked words.
[00:46:55] Customer: Right now, if the text is very long, it will be between the "Only sentences with marked words" checkbox and the word tray.
[00:47:11] Customer: I may not even see all the words I selected if the text is long.
[00:47:18] Customer: Right?
[00:47:19] Customer: Yes.
[00:47:21] Customer: Maybe the selected words should appear somewhere above the text.
[00:47:31] Customer: Or the text should be scrollable and have a fixed height.
[00:47:40] KaramKhaddour: Okay.
[00:47:41] KaramKhaddour: Yes.
[00:47:42] Customer: Okay.
[00:47:44] Customer: And then the deck settings.
[00:47:51] Customer: "I'm learning German, translating to English."
[00:48:00] Customer: "I'm learning German, translating to English."
[00:48:04] Customer: It is like...
[00:48:05] KaramKhaddour: I think this is not very important.
[00:48:07] KaramKhaddour: It is only important when there is a new deck.
[00:48:11] Customer: Yes.
[00:48:13] Customer: Got it.
[00:48:16] KaramKhaddour: We can just put the deck here, and if they choose a new deck, we can add new fields, such as what they are learning and what they translate to.
[00:48:27] Customer: Okay.
[00:48:28] Customer: When you added the text, you specified the language, the text language, right?
[00:48:38] KaramKhaddour: Yes.
[00:48:41] Customer: Yes.
[00:48:44] Customer: The text language is German, I see.
[00:48:51] Customer: It is at the top of the page, right?
[00:48:54] Customer: "Text language: German."
[00:48:58] KaramKhaddour: Yes.
[00:49:00] Customer: And here, a bit...
[00:49:06] Customer: Here is an example of a long text where I cannot see which words I selected, which were my words.
[00:49:13] Customer: But okay, I see.
[00:49:19] Customer: Do I need to see them there?
[00:49:32] Customer: As a quick action, maybe.
[00:49:42] Customer: I am not sure where I should see the words, below the text or above it.
[00:49:49] Customer: What can I do with these selected words?
[00:49:56] KaramKhaddour: Nothing.
[00:49:57] KaramKhaddour: Just generate the cards into the deck.
[00:50:02] Customer: I cannot click a word so that it gets unselected in the text?
[00:50:10] KaramKhaddour: Yes, but you still keep the cards.
[00:50:20] Customer: Yes.
[00:50:25] Customer: Maybe it would be nice to have a list of selected words.
[00:50:35] Customer: If I have multiple words selected in the text, maybe I do not want to select...
[00:50:49] Customer: I want to quickly select or unselect a word so that I do not generate a card from it.
[00:50:59] Customer: Right now, I have to go through all the sentences in the order they appear in the text and search for that word.
[00:51:14] Customer: Ah, but you have search, right?
[00:51:20] KaramKhaddour: Yes, you can search.
[00:51:22] Customer: "Type a word to find its sentences."
[00:51:24] Customer: If I do not like a word, I can find its sentences, click inside the text, and it gets unselected.
[00:51:39] Customer: Okay.
[00:51:44] Customer: Why do I need this list of selected words then?
[00:51:50] Customer: What does it show?
[00:51:51] Customer: I mean the word tray.
[00:51:59] KaramKhaddour: Yes, technically, you can remove it.
[00:52:08] Customer: What does it show today?
[00:52:12] Customer: Could you please scroll?
[00:52:13] KaramKhaddour: It shows the word translation.
[00:52:19] Customer: Ah.
[00:52:21] Customer: Word and translation.
[00:52:30] Customer: It maps words to [inaudible], shows their translations, and they can do anything with these words.
[00:52:42] Customer: Okay.
[00:52:52] Customer: I am not sure why I need this or whether it should be in this small text or an important part of the page.
[00:53:09] Customer: I think I should think about it a bit later, so I cannot suggest design improvements right now regarding this list of words to learn.
[00:53:27] Customer: Okay.
[00:53:29] Customer: Regarding the word tray, I would suggest splitting it into two parts.
[00:53:35] Customer: The first one would have these "To learn" and "Ignore" things, and another, not really part of the word tray, would be text settings.
[00:53:52] Customer: Text settings should contain "I'm learning", "Translate into", "Generate into", or generation settings.
[00:54:00] Customer: I think those are separate pieces of information, so they should be in separate panels or modules.
[00:54:13] Customer: Okay.
[00:54:13] Customer: And then, yes.
[00:54:16] Customer: Okay.
[00:54:17] Customer: I am not sure whether "I'm learning", "Translate into", and "Generate into" should move somewhere to the top of the page because they are generation settings.
[00:54:34] Customer: Or whether they should stay at the bottom.
[00:54:39] Customer: Okay.
[00:54:39] Customer: I think I will have to think about it.
[00:54:43] Customer: Yes.
[00:54:47] Customer: Decks, Today.
[00:54:53] Customer: Did you have something to discuss apart from the UI?
[00:55:00] KaramKhaddour: No.
[00:55:01] KaramKhaddour: We discussed observability.
[00:55:07] Customer: Great.
[00:55:09] Customer: We have a couple more minutes, I guess, if you have some time.
[00:55:15] Customer: We can have a look at Today.
[00:55:24] Customer: "Good afternoon."
[00:55:29] Customer: Oh, that is correct.
[00:55:31] Customer: Sunday, November 8th.
[00:55:33] Customer: Okay.
[00:55:34] Customer: "Study my first deck", one card.
[00:55:41] Customer: "Today in the decks you ticked."
[00:55:44] Customer: If I have more than one deck, what do I see?
[00:56:05] KaramKhaddour: Like this?
[00:56:07] Customer: Yes.
[00:56:09] Customer: Oh, "Study two decks".
[00:56:10] Customer: Okay, five cards.
[00:56:18] Customer: Okay.
[00:56:25] Customer: "Study in".
[00:56:26] Customer: I am a bit concerned about how it will look if you have one deck and its name is really long.
[00:56:37] Customer: This button will span two or three lines.
[00:56:43] Customer: Maybe for the case when there is only one deck.
[00:56:48] Customer: By the way, can you unselect "At work" and "Cooking"?
[00:56:54] Customer: Here.
[00:56:55] Customer: We will see, yes, "Study Travel by train".
[00:57:02] Customer: This is the deck title, but it can be much longer.
[00:57:11] Customer: I would suggest just writing "Study one deck", like in the other cases.
[00:57:20] Customer: So we do not have to handle long titles.
[00:57:29] Customer: What do you think?
[00:57:32] KaramKhaddour: I agree.
[00:57:34] Customer: Okay.
[00:57:35] Customer: "Zero new studies today."
[00:57:36] Customer: "Zero reviews done today."
[00:57:39] Customer: "Eight new left."
[00:57:40] Customer: "Two reviews left."
[00:57:43] Customer: Okay.
[00:57:43] Customer: Okay.
[00:57:51] Customer: "Eight new left."
[00:57:53] Customer: The progress bar shows new left and reviews left.
[00:57:59] Customer: If you study or review, it will show other segments, right?
[00:58:06] KaramKhaddour: Yes.
[00:58:07] KaramKhaddour: Okay.
[00:58:11] Customer: Maybe one "Again" or "Hard".
[00:58:13] Customer: I do not know.
[00:58:17] Customer: How does this yellow counter at the top of the page get incremented?
[00:58:30] Customer: What does it mean?
[00:58:33] Customer: By the way.
[00:58:41] KaramKhaddour: It means hard, right?
[00:58:44] Customer: Yes, two reviews in this session, kind of.
[00:58:48] Customer: Yes.
[00:58:50] Customer: You saw this card?
[00:58:55] Customer: Okay.
[00:58:56] Customer: And when you close the session...
[00:59:02] Customer: Oh, okay.
[00:59:06] Customer: Another segment appeared in the progress bar.
[00:59:10] Customer: "Two reviews done today."
[00:59:12] Customer: Good.
[00:59:15] Customer: "Four new studies today."
[00:59:17] Customer: "Four new left."
[00:59:20] Customer: That is right.
[00:59:21] Customer: "Zero reviews left."
[00:59:22] Customer: That is also right.
[00:59:26] Customer: The review segment disappeared.
[00:59:32] KaramKhaddour: Okay.
[00:59:37] Customer: Good.
[00:59:37] Customer: "Your decks", "New, never studied", "Review due later".
[00:59:44] Customer: "Tick the decks to study together."
[00:59:46] Customer: "New cards come in the order of this list."
[00:59:49] Customer: "Use the arrows to study a deck first."
[01:00:06] Customer: To reorder the decks, to change the order.
[01:00:14] Customer: Okay.
[01:00:16] Customer: "New cards come in the order of the decks", maybe.
[01:00:25] Customer: "New cards come in the order of the decks."
[01:00:30] Customer: "Use arrows to change the order of the decks."
[01:00:35] Customer: Or can you drag and drop here as well?
[01:00:47] Customer: Or not?
[01:00:49] Customer: Like with the decks?
[01:00:51] Customer: Okay.
[01:00:56] Customer: I am not sure which option is better.
[01:01:05] Customer: Maybe, for consistency, it would be better to implement drag and drop here as well.
[01:01:15] Customer: To have a similar interface to Decks.
[01:01:21] Customer: Okay.
[01:01:26] Customer: Users will then be able to select several decks and drag them together, I guess.
[01:01:43] Customer: This will be a bit of a workaround because they use selection to choose the decks to study.
[01:02:01] Customer: But I am not sure if that is a bad thing.
[01:02:06] Customer: If we let them select decks and reorder them together.
[01:02:14] Customer: I think that is all right.
[01:02:19] Customer: I would suggest using drag and drop here.
[01:02:23] Customer: And supporting selecting several decks and dragging them together.
[01:02:30] Customer: What do you think?
[01:02:33] Customer: Okay.
[01:02:34] Customer: Did we review the Decks tab?
[01:02:49] KaramKhaddour: No.
[01:02:50] Customer: Okay, two new, one to review.
[01:02:53] Customer: The last thing to review.
[01:02:55] Customer: The language, the level, and the number of cards.
[01:03:02] Customer: I think the other language is missing here.
[01:03:07] Customer: A deck is German–English.
[01:03:10] Customer: It is not only German.
[01:03:14] Customer: If you click a deck, what happens?
[01:03:22] Customer: Oh, okay.
[01:03:23] Customer: Edit deck.
[01:03:27] Customer: German from English, level P1, 10 new and 200 reviews a day.
[01:03:34] Customer: Oh, wow.
[01:03:35] Customer: Ten new.
[01:03:37] Customer: Is it in Settings?
[01:03:39] Customer: Somewhere in the deck settings?
[01:03:40] Customer: Ten new and 200 reviews.
[01:03:44] Customer: Or where is it?
[01:03:48] KaramKhaddour: No, it should be set by the operator.
[01:03:52] KaramKhaddour: Not by the customer.
[01:03:56] Customer: By the user, I guess.
[01:03:58] Customer: For each deck, they decide how many cards to review per day.
[01:04:05] Customer: How many new cards appear.
[01:04:10] Customer: Okay.
[01:04:14] Customer: If you cram for an exam, you might study 200 cards.
[01:04:19] Customer: If you are studying at your own pace, you want 10 new cards.
[01:04:26] Customer: Okay, and there are cards.
[01:04:30] Customer: Its translation.
[01:04:32] Customer: I do not know what happens.
[01:04:34] Customer: Ah, I see what happens when the translation is long.
[01:04:40] Customer: Okay.
[01:04:42] Customer: If we move the buttons there in the teacher's review, we should prevent the situation where the word is too long.
[01:05:05] Customer: Maybe do it like this.
[01:05:09] Customer: Wrap really long words and translations so they do not overlap with the buttons.
[01:05:19] Customer: Here, I also do not see the sentence translation.
[01:05:28] Customer: Yes.
[01:05:30] Customer: Okay, Archive, Regenerate.
[01:05:35] Customer: What does this arrow mean?
[01:05:42] KaramKhaddour: This?
[01:05:43] Customer: Yes.
[01:05:45] KaramKhaddour: Mark for regeneration.
[01:05:47] Customer: Okay.
[01:05:50] Customer: Okay.
[01:05:54] Customer: You can then mark several of them and rewrite them together.
[01:05:59] Customer: If you click the card, you can edit it.
[01:06:08] Customer: Nice.
[01:06:10] Customer: Okay.
[01:06:14] Customer: Since there is no button to edit the card, some instruction might help users not get lost.
[01:06:27] Customer: So they do not miss the feature that they can click a card.
[01:06:36] Customer: And, yes, Decks.
[01:06:42] Customer: All of those decks.
[01:06:47] Customer: Yes.
[01:06:50] Customer: I think that is good.
[01:06:53] Customer: If you click "At work" in the decks, will the card get deleted, or what?
[01:07:03] Customer: What will happen to it?
[01:07:05] Customer: Will it not belong to any deck?
[01:07:07] Customer: Or does it have to belong to at least one deck?
[01:07:13] KaramKhaddour: It has to belong to a deck.
[01:07:15] Customer: Yes.
[01:07:15] Customer: I cannot click "At work", right?
[01:07:19] Customer: And it gets unselected.
[01:07:24] Customer: Oh, yes.
[01:07:24] Customer: Okay, great.
[01:07:28] Customer: If you click another deck, it gets added to that deck, right?
[01:07:34] Customer: Shopping, for example.
[01:07:36] KaramKhaddour: Yes.
[01:07:40] Customer: Cooking.
[01:07:41] Customer: Okay.
[01:07:42] Customer: Okay.
[01:07:43] Customer: "Once this is handled, add one more card for this word, each with its own sentence."
[01:07:54] KaramKhaddour: Yes.
[01:08:01] Customer: This might be a bit, what is it called?
[01:08:12] Customer: An overwhelming interface in some parts.
[01:08:16] Customer: But it has many of the features we have discussed.
[01:08:24] Customer: It would be nice to check usability with real users.
[01:08:33] Customer: We will have this assignment a bit later, next week.
[01:08:40] Customer: Then you can see which parts are not very intuitive.
[01:08:44] Customer: I think that is it for the UI.
[01:08:52] Customer: Thank you for your patience.
[01:08:54] KaramKhaddour: Thank you for your time.
[01:09:00] KaramKhaddour: If you do not have any questions, see you next week.
[01:09:06] Customer: You too.
[01:09:09] Customer: Thanks.
[01:09:09] Customer: Have a nice day.
[01:09:12] KaramKhaddour: Thank you.
[01:09:13] KaramKhaddour: Bye-bye.
[01:09:14] Customer: Bye-bye.
