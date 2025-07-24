# LearnAI
This is learn AI, chat with Youtube videos and learn more efficiently
## Backend
### Backend Routes:
1. `POST: /user/signup` (response = token)
2. `POST: /user/login` (response = token)
3. `GET: /user/userInfo` (response = user)
4. `POST: /transcript/create` (response = chat & chatId)
5. `GET: /transcript/summarize/:chatId` (response = summary pdf)
6. `POST: /chat/send` (response = userQuestion & aiResponse)
7. `GET: /chat/all` (response = userChats)
8. `GET: /chat/history/:chatId` (response = chat)
9. `DELETE: /chat/delete/:chatId` (response = "Chat successfully deleted"
*OAuth intregation will think later*

### API Resources
YouTube Transcript APIs from RapidAPI:
(Not sure about all of them working, i can change gmail and create a API always)
- https://rapidapi.com/ninja-api-ninja-api-default/api/fetch-youtube-transcript1/pricing = 120 req/m (*current*)
- https://rapidapi.com/leadxpert-api-leadxpert-api-default/api/youtube-2-transcript/playground/apiendpoint_ded2fabf-0a8f-4734-9dbc-1151203e779e = 150 req/m
- https://rapidapi.com/8v2FWW4H6AmKw89/api/youtube-transcripts/playground/apiendpoint_3421e171-4c09-4470-b5d3-69d08a46815a = 100 req/m
- https://rapidapi.com/Reza-Rg/api/youtube-transcribe-fastest-youtube-transcriber/playground/apiendpoint_f9008f6e-74cc-44eb-a262-64f838b70f84 = 100 req/m
- https://rapidapi.com/rahilkhan224/api/youtube-video-summarizer-gpt-ai/playground/apiendpoint_92423465-6a0a-4355-a595-90014cd90a25 = 350 req/m (if this works then maybe i will use this in prod)
- https://rapidapi.com/nikzeferis/api/youtube-captions-transcript-subtitles-video-combiner/playground/apiendpoint_dccbec3e-efe7-4016-ba37-3f5e45b49999 = 100 req/m

- *PDF format or gemini response generation prettify*

## Frontend
- Must Use polling in chatting to fetch `/chat/history/:chatId`
- skeleton add in forntend
- *OAuth intregation will think later*

LightRays -  from-[#b2e8c9] to-[#54856b]
DarkVeil - from-[#f5f5f5] to-[#8d70d6]
Silk - from-[#e0e0e0] to-[#7e7e7e]