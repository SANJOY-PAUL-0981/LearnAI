## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
  - [Creating A Pull Request](#creating-a-pull-request)
- [Raising an issue](#raising-an-issue)
- [Code of conduct](#code-of-conduct)
- [License](#license)
- [Authors](#authors)
- [API Resources](#api-resources)

## About The Project
![image](https://github.com/SANJOY-PAUL-0981/LearnAI/blob/main/client/src/assets/image.png)


A web platform that enables users to chat with YouTube videos, making the learning faster, easier, and more interactive.
### don't only just clone the repo please give it a star to show some love.



## Built With

* [ReactJs](https://react.dev/)
* [NodeJs](https://nodejs.org/en)
* [ExpressJs](https://expressjs.com/)
* [TailwindCss](https://tailwindcss.com/)
* [MongoDb](https://www.mongodb.com/)
* [JWT](https://www.jwt.io/)
* [Gemini](https://gemini.google.com/)



## Getting Started


### Prerequisites

<a href="https://git-scm.com/downloads" >Git</a> is a distributed version control system used for software development. It allows multiple developers to work on the same codebase simultaneously, keeping track of changes and managing versions. It also enables users to revert changes and collaborate more effectively.

<a href="https://nodejs.org/en">NodeJs</a> is a JavaScript runtime, package manager. NodeJS uses V8 JavaScript engine as the JavaScript engine.

<a href="https://www.mongodb.com//">MongoDB</a>  is a source-available, cross-platform, document-oriented database program. Classified as a NoSQL database product, MongoDB utilizes JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and current versions are licensed under the Server Side Public License.

<a href="https://makersuite.google.com/app/apikey">Gemini Api Key</a> 
<a href="https://vite.dev/">Vite</a> 

### Installation


<h3> This project utilises <a href="https://nodejs.org/en">NodeJS</a>. Install it before running locally</h3>

```bash
git clone https://github.com/SANJOY-PAUL-0981/LearnAI.git
```
```bash
cd LearnAI
```
*Frontend*
```bash
cd client
```
```bash
cp .env.example .env
```
<h3>Fill the required fields inside the .env before starting the server </h3>

```bash
npm install
```
```bash
npm run dev
```
This will start the vite development server  at http://localhost:5173/

*Backend*
```bash
cd server
```
```bash
cp .env.example .env
```
<h3>Fill the required fields inside the .env before starting the server </h3>

```bash
npm install
```
```bash
npm run dev
```
This will start the development server  at http://localhost:3000/

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/SANJOY-PAUL-0981/LearnAI/issues) to discuss it

* Please make sure you check your spelling and grammar.

### Creating A Pull Request

Wanna contribute to LearnAI ?

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/FeatureName`)
3. Commit your Changes (`git commit -m 'Add some FeatureName'`)
4. Push to the Branch (`git push origin feature/FeatureName`)
5. Open a Pull Request


## Raising an issue

If you're experiencing any problems with LearnAI, please be sure to review our [issue template](https://github.com/SANJOY-PAUL-0981/LearnAI/tree/main/.github/ISSUE_TEMPLATE) before opening a new issue. The template includes a list of questions and prompts that will help us better understand the issue you're experiencing, and it will ensure that we have all of the necessary information to investigate the problem.

We kindly ask that you provide as much detail as possible when submitting an issue, including steps to reproduce the problem, any error messages that you have seen, and any other relevant information. This will help us to identify and fix the issue more quickly.

Thank you for your cooperation, and we look forward to hearing from you!

## Code of conduct

Developers are requested to go through our <a href="https://github.com/SANJOY-PAUL-0981/LearnAI/tree/main/.github/CODE_OF_CONDUCT.md">code of conduct</a> thoroughly to maintain a peaceful environment within our project.

## License
Learn AI is licensed under the Apache License 2.0.  
You are free to use and contribute, but must provide proper attribution.  
Please do not remove the original author’s credit.

## Authors

* **Sanjoy Paul** - [Sanjoy Paul](https://github.com/SANJOY-PAUL-0981) - *LearnAI*

### API Resources
There are not any working transcripter tool available when i was building it so i had to use rapid api 
YouTube Transcript APIs from RapidAPI:
(Not sure about all of them working, i can change gmail and create a API always)
- https://rapidapi.com/ninja-api-ninja-api-default/api/fetch-youtube-transcript1/pricing = 120 req/m (*current*)
- https://rapidapi.com/leadxpert-api-leadxpert-api-default/api/youtube-2-transcript/playground/apiendpoint_ded2fabf-0a8f-4734-9dbc-1151203e779e = 150 req/m
- https://rapidapi.com/8v2FWW4H6AmKw89/api/youtube-transcripts/playground/apiendpoint_3421e171-4c09-4470-b5d3-69d08a46815a = 100 req/m
- https://rapidapi.com/Reza-Rg/api/youtube-transcribe-fastest-youtube-transcriber/playground/apiendpoint_f9008f6e-74cc-44eb-a262-64f838b70f84 = 100 req/m
- https://rapidapi.com/rahilkhan224/api/youtube-video-summarizer-gpt-ai/playground/apiendpoint_92423465-6a0a-4355-a595-90014cd90a25 = 350 req/m (if this works then maybe i will use this in prod)
- https://rapidapi.com/nikzeferis/api/youtube-captions-transcript-subtitles-video-combiner/playground/apiendpoint_dccbec3e-efe7-4016-ba37-3f5e45b49999 = 100 req/m
