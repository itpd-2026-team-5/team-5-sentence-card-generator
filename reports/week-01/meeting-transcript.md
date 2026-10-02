# Kickoff meeting transcript  

**Date:** 2026-10-01  
**Participants:** Instructor, saleemasekrea000, Byakko-san, KaramKhaddour, Horokk1  

[00:00:00] KaramKhaddourr: Start the meeting.    
[00:00:02] KaramKhaddourr: Uh, so, hello, um, so we are working on the sentence, uh, generated, uh, generating, uh, project.  
[00:00:11] KaramKhaddourr: Can you tell us more about why?    
[00:00:14] KaramKhaddourr: Why do you want to build this project, and...  
[00:00:17] KaramKhaddourr: Uh, what benefit do you think this project will provide that your original project didn't provide?    
[00:00:26] KaramKhaddourr:  Songs, uh... project, the Songs Anki project.  
[00:00:33] Instructor: Okey, so?    
[00:00:36] Instructor: I'm learning German and my goal is to learn new words like regularly.  
[00:00:49] Instructor: And ideally I should learn words that I want to learn, not from some generic list of words.  
[00:00:58] Instructor: So Anki project provided me this opportunity.  
[00:01:01] Instructor: I could upload the song text and then extract the word that I wanted to learn and then I learned these words in a context.    
[00:01:22] Instructor: So each word was put in the context of a sentence and I could learn full sentences  
[00:01:27] Instructor: Um...    
[00:01:29] Instructor: I was learning not single words because I wanted to learn how to speak German not to just know a bunch of words
[00:01:38] Instructor: Therefore, I was learning in a context.  
[00:01:45] Instructor: The problem with Songs2Anki is that it's quite tedious to use.  
[00:01:50] Instructor: I still have to orchestrate the deck generation process.  
[00:01:53] Instructor: I need to...  
[00:01:58] Instructor: um...  
[00:02:03] Instructor: I need to upload the song texts, put into YAML, run a script to convert the texts into normalized words, into lemmas, choose some lemmas that I want to learn, then run another script to map these lemmas to full word versions, like add some articles for nouns.  
[00:02:34] Instructor: Yeah, and then I need to also run the script that generates sentences several times, and.  
00:06:20 — I need to review all the sentences manually, remove them from the CSV, and this takes quite a lot of time.  
[00:02:54] Instructor: I expect that the new service, the new app, will do some of the steps for me automatically and provide me a better interface for field...
[00:03:24] Instructor: Seems like I disconnected, um...  
[00:03:27] Horokk1: Yeah, yes.  
[00:03:29] Instructor: Was it long ago?  
[00:03:31] Horokk1: Last minute, we don't... we didn't hear you.  
[00:03:34] Instructor: Uh-huh.  
[00:03:36] Instructor: Okay, so I was talking about that it was a bit tedious to orchestrate the Songs2Anki process.  
[00:03:46] Instructor: uh...  
[00:03:48] Instructor: Like, I had to run parts of the script, like, in different steps, extract words from texts then, filter out the words that I don't want to learn manually in CSV, then run a script to map them to a normal form, then move the this new words to another CSV, where the sentences will be generated and, like, written.  
[00:04:22] Instructor: I expect that the new service, new app, will simplify some of the steps and automate them for me.   
[00:04:30] Instructor: It will provide a better interface for filtering out the words that I don't want to learn, and the card editing will be also simplified.  
[00:04:50] KaramKhaddourr: Uh, do you also want the new service to be focused on music, like, uh, like, similar to Songs2Anki, or do you want it more of, uh, general purpose, uh, how do you see this fitting?  
[00:05:01] KaramKhaddourr: Do you want us only to focus on like music and songs and getting sentences for songs?  
[00:05:10] Instructor: Uh-huh.  
[00:05:12] Instructor: uh...  
[00:05:14] Instructor: I don't want to focus on song, uh...  
[00:05:18] Instructor: I want to support texts in general.  
[00:05:22] Instructor: Uh, in my case.  
[00:05:24] Instructor: Um...  
[00:05:26] Instructor: I listen to songs every day, so I wanted to learn words from those songs, because I could rehearse them every day, in some song.  
[00:05:37] Instructor: I will... I would hear an unknown word and I will try to recollect what it means from what I learned via Anki.  
[00:05:48] Instructor: Uh, yeah, in your case, it should be texts in general.  
[00:05:57] KaramKhaddourr: Okay, but, um...  
[00:05:59] KaramKhaddourr: Just to be clear, because we, as we were searching about, like, alternatives or competitors, uh, some competitors were focusing on, like, YouTube, on Netflix, on, um, like, video or, uh, videos, basically, and they take the transcripts from these videos and then they put them inside of cards and show them to the user, so that the user is able to eventually see this YouTube video and understand everything in it.  
[00:06:30] KaramKhaddourr: So, do you want something, like, similar to this?   
[00:06:35] KaramKhaddourr: Like, uh, we have multiple kinds of media, like videos or songs, that we are using to generate the sentences inside the cards.  
[00:06:45] Instructor: Um...  
[00:06:48] Instructor: I think, uh, it's up to the user where to... search for texts.  
[00:06:56] Instructor: Uh, so, uh...  
[00:06:58] Instructor: I'm not sure if we understand the Songs2Anki idea the same way.  
[00:07:05] Instructor: So let me clarify.  
[00:07:08] Instructor: If we have some media, some YouTube video, and we extract the transcript.  
[00:07:15] Instructor: Um...  
[00:07:16] Instructor: We don't put sentences from this transcript onto the cards.  
[00:07:21] Instructor: We let the user... pick the words in the text that they want to learn, then generate new sentences.  
[00:07:30] Instructor: Each sentence will contain a [inaudible]... that the user wants to learn.  
[00:07:35] Instructor: Uh, and then...  
[00:07:37] Instructor: And each sentence will be...  
[00:07:41] Instructor: We'll have a fixed length so that it's more or less predictable how long each learning session will take.  
[00:07:51] Instructor: If all of the sentences are approximately the same length, then...  
[00:07:58] Instructor: You can predict that you'll need, like, half an hour to.  
[00:08:01] Instructor: um...  
[00:08:03] Instructor: to rehearse, like, 20 cards, plus, like, review a shorter one, for example.  
[00:08:10] Instructor: So.  
[00:08:12] Instructor: uh...  
[00:08:13] Instructor: Since there are too many kinds of media, I think we should not... right now focus on a single kind of media and, uh, we can for a start support, just, like, plain text input.  
[00:08:30] Instructor: So the user can upload several texts, they are separate.  
[00:08:36] Instructor: They can rearrange them and change their order depending on, um, which words they want to learn first, like from which text.  
[00:08:51] Instructor: Yeah, we let the user pick the words from the text and prepare the cards for the user that they can learn the words.  
[00:09:01] KaramKhaddourr: Okay, as I also saw inside the description for the task, we have two different types of users: We have the student and we have the teacher.  
[00:09:14] Instructor: Mm-hmm.  
[00:09:16] KaramKhaddourr: What functionality you want the picture to do, to be able to do?  
[00:09:23] Instructor: Um, so the teacher should... be able to review the student's card decks that the student allows to review the teacher.  
[00:09:37] Instructor: Um...  
[00:09:40] Instructor: I made songs to Anki in 2024 2025 and then and at that time, LLMs produced, um... good sentences in only two shorts of cases.  
[00:10:03] Instructor: One short was bad sentences, and I wanted them, like, I had to remove them, like, manually.  
[00:10:06] Instructor: And so, the teacher should... will connect to a student's account or somehow view the text, sorry, not the text or probably the text, too.    
[00:10:18] But primarily the text with generated sentences.    
[00:10:30] Instructor: And they will, like... mark the bad sentences that should be removed, um, from that deck or edit some sentences so that they sound more naturally.    
[00:10:40] Instructor: So the teacher will be, like, the ultimate oracle for this system.    
[00:10:46] Instructor: They will decide... what stays in the deck and what does not.    
[00:10:52] KaramKhaddourr: Okay.    
[00:10:53] KaramKhaddourr: So, and, um... and where do you want this app, uh, to run?    
[00:10:58] KaramKhaddourr: For example, where do you see this app, uh, being used: On laptop, on desktop, on mobile application, web application?    
[00:11:11] Instructor: Um, for now, it's enough if it's a web app.    
[00:11:16] Instructor: Like, for future, uh... probably it should be a mobile application so that students can rehearse offline, but for now we can keep [inaudible] web app.    
[00:11:37] KaramKhaddourr: Okay, this is maybe...    
[00:11:37] Instructor: [inaudible] Firefox and Chrome should be supported,  Safari not necessary.    
[00:11:50] KaramKhaddourr: Mm-hmm.    
[00:11:53] KaramKhaddourr: saleemasekrea000, do you have a question?    
[00:11:56] saleemasekrea000: Yes, uh, just one thing to clarify.    
[00:12:02] saleemasekrea000: So, user will... input the text and then highlight the word that you want to learn, right?    
[00:12:08] Instructor: Right.    
[00:12:09] saleemasekrea000: Okay, the text is used as a context for the LLM or what?    
[00:12:16] Instructor: Um... it... depends.    
[00:12:25] Instructor: I think it should, um, it should be an option to use the text as a context.    
[00:12:34] Instructor: Yeah, in the context of a text, a word can be used with one meaning.  
[00:12:41] Instructor: But if we... take it out of the context of the text and generate a random sentence with that word, the meaning may change.  
[00:12:52] Instructor: So yeah, good question.  
[00:12:54] saleemasekrea000: Okay, so do we need to support two paths?   
[00:12:58] saleemasekrea000: User can upload text, then highlight the word that they want to learn, and user can upload directly a word or only the first path.  
[00:13:13] Instructor: Sorry, didn't get the... the options.    
[00:13:15] Instructor: Could you please repeat?  
[00:13:17] saleemasekrea000: Yeah, okay, so I'm talking about the input from the user.   
[00:13:21] saleemasekrea000: I see it as a two-way. The first way is what we already discuss that user will input a text and then choose a word and ask us to generate the sentences.  
[00:13:39] saleemasekrea000: And second way, user directly upload a word.  
[00:13:45] saleemasekrea000: But here, as you mentioned, it might be, like, uh... can be different meaning.  
[00:13:50] saleemasekrea000: So LLM will choose the meaning that... a random meaning, maybe or maybe not the same meaning that the user wants.  
[00:14:02] Instructor: Uh, right.  
[00:14:08] Instructor: The case when the user uploads a word or like several words.  
[00:14:15] Instructor: Is a, asically, the same as the case when the user uploads a text.  
[00:14:25] Instructor: Because, like, a number of words, like, 10 words is a text.  
[00:14:33] Instructor: We...  
[00:14:37] Instructor: Uh, in this case... the the user should not expect that LLM produces some sentence, that has the right meaning of a word.  
[00:14:51] Instructor: Therefore, I think we should focus on the case when the user provides the text.  
[00:14:59] Instructor: Like, where each word is in some context already.  
[00:15:04] saleemasekrea000: Okay, okay.  
[00:15:06] Instructor: So, for this case, I think there should be, like, a switch for a user to choose a mode for producing sentences, like whether it should account for the context or it should not account for the context.  
[00:15:23] Instructor: Maybe the user wants to learn a word in several contexts.  
[00:15:29] Instructor: learn several meanings of a word.  
[00:15:34] Instructor: Um, but does not want to supply, like, sentences that provide this word and this meanings.  
[00:15:44] Instructor: Um, although...  
[00:15:47] Instructor: Strictly speaking, the user may just copy an article from, uh, from a German... word book, where the word is used in several meanings, and this will also be a text.  
[00:16:03] Instructor: And then they can choose, um, like, sentences from this article, uh, where the word is used in several meanings, and then the service will generate, like several sentences where this word is used in those several meanings.  
[00:16:25] Instructor: So maybe we can postpone this feature right now.  
[00:16:32] Instructor: Like, we do not... we can... just account for the context.  
[00:16:36] Instructor:  So, we use the context always.  
[00:16:43] Instructor: And the right context may be, for now, just a single sentence.  
[00:16:49] Instructor: So if we see the word in a sentence, we provide the sentence as a context for the narration.  
[00:16:59] saleemasekrea000: Okay, okay, thank you.  
[00:17:01] KaramKhaddourr: Okay, I have, like, a following question on saleemasekrea000 question: When we are building this context?  
[00:17:09] KaramKhaddourr: Should we take into consideration, uh, for example, what words already the user know, what level the user is in, um, what they want to achieve, for example, if they are an IT student, then maybe we can focus our sentences in this specific domain.  
[00:17:33] KaramKhaddourr: Should we take, like, multiple sites for the for the student into consideration when we are generating sentence.  
[00:17:40] KaramKhaddourr: Like, what level they are on, what their preferences are.  
[00:17:49] Instructor: Um, yeah, good question.  
[00:17:57] Instructor: So we can assume that if a student marks some words in the text that they want to learn.  
[00:18:06] Instructor: Uh, they know all other words.  
[00:18:10] Instructor: Or we can let them mark explicitly the words that they don't want to learn in a text.  
[00:18:18] Instructor: Uh, and then exclude such words.  
[00:18:22] Instructor: Exclude sentences that contain such words.  
[00:18:27] Instructor: After they are generated.  
[00:18:30] Instructor: And regarding the topic of sentences.  
[00:18:33] Instructor: We can probably let the students provide a custom prompt.  
[00:18:43] Instructor: That will also be used for generating sentences for a topic, like for informatics, for data science.  
[00:18:53] Instructor: And then probably LLM will use more vocabulary for that topic.  
[00:19:01] Instructor: What do you think?  
[00:19:05] KaramKhaddourr: I think, um, we can distinguish two kinds of clients for our application.  
[00:19:08] KaramKhaddourr: Some of them are technical.   
[00:19:10] KaramKhaddourr: They can provide the prompt.   
[00:19:12] KaramKhaddourr: It will not be a strange idea to provide the prompt.  
[00:19:22] KaramKhaddourr: But the other kind which are not technical people.  
[00:19:25] KaramKhaddourr: I think it will be a good idea for them to just fill up some questions, and then we will generate the prompt that we will use in the future.  
[00:19:34] KaramKhaddourr: For example, the question is, why are you learning [inaudible]?  
[00:19:38] KaramKhaddourr: What is your profession? What are you studying? Etc.  
[00:19:43] Instructor: Mm-hmm, mm-hmm.  
[00:19:45] Instructor: Um, yeah, pretty good idea.  
[00:19:50] Instructor: Yeah, and how do you decide the proficiency of the user?   
[00:19:58] Instructor: Like, at which language level they are.  
[00:20:02] KaramKhaddourr: Mm-hmm, that's a good question.  
[00:20:07] KaramKhaddourr: Maybe we can either ask them if they know what levels they are on.  
[00:20:13] KaramKhaddourr: Or if they don't know, we can, like, direct them to an online test that they can do and after this online test, we can, uh, like, start from this point.  
[00:20:25] KaramKhaddourr: And then we... after some... some time that the user is using this application, we will build some knowledge base about what words they know, what words they don't know, for example.  
[00:20:40] Instructor: Yeah, sounds good.  
[00:20:42] Instructor: Uh, maybe...  
[00:20:44] Instructor: Uh, we can also...  
[00:20:48] Instructor: And...  
[00:20:50] Instructor: I see the patterns in studying, like.  
[00:20:55] Instructor: Well, the service should let them study those cards using SRS, and they will...  
[00:21:06] Instructor: Students will, like, mark a card as easy, like, medium or hard.  
[00:21:14] Instructor: And maybe we can provide a flag like too hard.  
[00:21:20] Instructor: So that they mark some cards as too hard, and then we can analyze, like.  
[00:21:27] Instructor: What was in that card, too hard?  
[00:21:30] Instructor: Uh, maybe some too long German words were used, or maybe rare words were used.  
[00:21:38] Instructor: And we can probably automatically add such words to block list of words so that we don't use them in later generations.  
[00:21:53] KaramKhaddourr: Okay, and for the recommendation, like, of the cards, uh, we should use an online, uh, algorithm, right?   
[00:21:59] KaramKhaddourr: It's an online, already known algorithm.  
[00:22:05] KaramKhaddourr: That when we recommend this card, or when we show this card correct.  
[00:22:12] Instructor: Sorry, I didn't get what online?  
[00:22:18] KaramKhaddourr: So for example, we have a collection of cards.  
[00:22:21] Instructor: Right.  
[00:22:22] KaramKhaddourr: And the user will mark the skirts easy, medium, hard, or very hard.  
[00:22:27] KaramKhaddourr: And if they, for example, mark this card hard, then we need to show it more often than we show this easy one, correct?  
[00:22:38] Instructor: Yes.  
[00:22:41] KaramKhaddourr: And when we do...  
[00:22:42] Instructor: Mm-hmm.  
[00:22:44] Instructor: Yeah, please continue.  
[00:22:46] KaramKhaddourr: And when we do this, like, algorithm, how we determine which card we show now.  
[00:22:55] KaramKhaddourr: It's an already like published algorithm, correct?  
[00:22:58] Instructor: Uh, yes.  
[00:23:00] Instructor: It's quite a repetition system.  
[00:23:06] Instructor: I don't quite remember, maybe FSRS, basically something that Anki uses right now.  
[00:23:19] KaramKhaddourr: Okay.  
[00:23:21] KaramKhaddourr: Um...  
[00:23:28] KaramKhaddourr: Okay, as maybe a final summary of this meeting, what is the most important features that you want us to provide?  
[00:23:39] KaramKhaddourr: Like, this is most important thing we need to provide for the end of the course.  
[00:23:46] saleemasekrea000: In top of the POC.  
[00:23:50] Instructor: Sorry, sorry.  
[00:23:52] Instructor: Didn't get your clarification.  
[00:23:56] KaramKhaddourr: I also didn't get it.  
[00:24:01] KaramKhaddourr: I think it's saleemasekrea000, saleemasekrea000, can you repeat?  
[00:24:11] KaramKhaddourr: saleemasekrea000.  
[00:24:14] Instructor: Anyway...  
[00:24:17] Instructor: The most important feature is this editor, uh, where I can mark the cards as, like, bad, subject to removal regeneration.  
[00:24:30] Instructor: Uh, or where I can edit the sentences directly, where I can, uh, request generating audio for cars, and listen to it.  
[00:24:46] Instructor: I can reorder words that I want to learn and so on.  
[00:24:52] Instructor: And this same editor will be used by the teacher.  
[00:24:58] Instructor: So maybe some some special functionality will be needed for a teacher, not sure which one.  
[00:25:10] Instructor: So this is, like, the top most important thing.  
[00:25:14] Instructor: Another one is this editor, uh, another editor where... not an editor, word picker, basically, where the person can pick words from a text.  
[00:25:32] Instructor: Mark words that they don't want to learn.  
[00:25:39] Instructor: This results, this list will be used later for generating the cards.  
[00:25:46] Instructor: Those are top two features.  
[00:25:50] KaramKhaddourr: Okay.  
[00:25:52] KaramKhaddourr: I think maybe the last question, do you have any preference on what technology we should use, like, what frameworks or something similar?  
[00:26:03] Instructor: No strict preferences.  
[00:26:07] Instructor: But you should account for limitations of technology that you plan to use?  
[00:26:15] Instructor: So, in my case...  
[00:26:19] Instructor: I used lemmatization libraries, uh, and they were available in Python, not sure if they are available for other languages.  
[00:26:30] Instructor: Uh, so maybe you should use Python too.  
[00:26:36] KaramKhaddourr: Okay.  
[00:26:37] Instructor: Like this part of the task.  
[00:26:43] KaramKhaddourr: I think that's all from my side of questions.   
[00:26:48] KaramKhaddourr: Guys, does anyone have any other questions?  
[00:26:51] Horokk1: No.  
[00:26:55] KaramKhaddourr: Uh, Instructor, do you have any questions for us?  
[00:27:01] Instructor: Yeah, what are your preferences, like, which stack did you consider using?  
[00:27:11] KaramKhaddourr: I think, in general, we have, uh, like, very different types of, uh, knowledge in the team, so we can use a wide, uh, wide range of, uh, technologies. For front-end, probably React as we are doing web application, and also we have inside the team people who works with Python in the backend, so we can also use Python for the backend.  
[00:27:34] KaramKhaddourr: I think probably this will be like, uh, just a react and, uh, fast, uh, fast, um, API for Python.  
[00:27:49] Instructor: Um, okay, sounds good.  
[00:27:53] KaramKhaddourr: Okay.  
[00:27:54] KaramKhaddourr: I think that's all for our meeting today.    
[00:27:56] KaramKhaddourr: Thank you very much for your [inaudible].  
[00:28:00] Instructor: Um, yeah, thank you too.  
[00:28:03] Instructor: Um, have a nice day, and...  
[00:28:07] Instructor: If you can, please create a Telegram group and send me an invite.   
[00:28:12] Instructor: I'll join.  
[00:28:16] KaramKhaddourr: Okay, we will today. Thank you very much. Have a nice day. Bye-bye.  
[00:28:19] saleemasekrea000: Thank you.  
[00:28:19] Instructor: Thank you. Goodbye.  
[00:28:21] Horokk1: Thank you. Bye.  
[00:28:21] saleemasekrea000: Bye.  
[00:28:21] Byakko-san: Thank you.  
[00:28:22] Byakko-san: Bye bye.  