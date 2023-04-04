# Timed Coding Quiz

This week I'm going to continue exploring Javascript, focusing on the topics of DOM manipulation and utilizing local storage. The plan is to make a timed multiple-choice quiz (on web dev coding topics! because, what else?) that stores and displays the test taker's score for later reference.

| **Scenario**                                                                                                                                                                                                                                                                                                                    |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _When I want to quiz myself, I will press a button. This will start a timer and begin presenting questions, reporting back when I answer correctly/incorrectly. When the timer drops to 0 or I complete all the questions, the application will show me my score and then store it somewhere I can access later for reference._ |

## And Here It Is

[The deployed application is here.](https://austinzumbro.github.io/timed-coding-quiz)

A preview GIF of the application in action.
![A Preview GIF of the application in action.](assets/images/Coding%20Quiz.gif)

---

## My Approach

I wanted both a "quiz" page and a "scores" page, so I wound up creating two `.html` and `.js` files, one for each. I debated putting everything onto a single page and using the "High Scores" button to show/hide elements, but I didn't. Because of that, I did wind up reusing some code between the two files, so it's not the DRY-est option.

> Note: I call it "High Scores" in the app, because that's what was in my head from arcade-style games, but it's really just "Scores." Any score you want to log will get logged. It doesn't matter if it's high or low.
>
> I left it as "High Scores" because I really wanted to set up a ranking system where only a fixed number of scores would get saved, a la arcade-style games, but I decided it fell outside the scope of this project.

I created almost all of the elements at the top. A few of them, like the answer `<li>` elements, get created within functions. Then everything gets assembled before finally getting appended to the `body` with an `init()` function.

---

## Creating the Page Elements

Because I wanted to focus on Javascript, I tried to build most of the HTML using the `createElement` and `appendChild` methods. It was good practice, but it did get a little hard to keep track of everything.

---

## Building the Quiz Variables

### Question Library

First I needed a library to pull questions from, so I set up an array filled with objects. Originally, I had them set up with dummy questions for testing.

```javascript
const quizQuestionsStaticLibrary = [
  {
    question: 'The answer to this question is B.',
    answers: [
      { text: "A", correct: false },
      { text: "B", correct: true },
      { text: "C", correct: false },
      { text: "D", correct: false },
    ],
  },
  etc.,
  etc.,
  etc.
];
```

Coming up with the structure was a good lesson in Objects vs Arrays, because I initially got a little befuddled thinking about how they all should nest. Ultimately, the idea that "arrays are lists" really helped me out. In this case:

_"I need a list of questions."_ - That's an array.  
_"Each question consists of a question and an answer."_ - That's an object.  
_"I need a list of possible answers."_ - That's an array.  
_"Each answer has a text value and a 'right/wrong' value"_ - That's an object.

### Other Global Quiz Variables

In addition to the library, I declared a few other global variables to run the quiz.

```javascript
let quizQuestionsDynamicLibrary = [];
let quizPosition = 0;
let startingTime = 60;
let timerInterval;
```

I wanted a "dynamic" library (probably not the best name) because I wanted a workspace to reorder/modify the static library without actually affecting it.

I declared the `quizPosition` and `startingTime` because I figured I'd need to access them from a few different places.

I declared an empty `timerInterval` variable so that, after I assigned it a `setInterval` within my `startTimer` function, I could stop it from anywhere else in the program. (Thank you to whatever Google search result clued me into this system!)

---

## Handling the Quiz

The sequence of events is pretty straightforward.

1. Clicking the Start Button clears the quiz area and appends the first question.
2. Clicking on answers advances the quiz to the next question.
   - Clicking on a wrong answer knocks 15 seconds off the timer.
     > And yes, it is possible to get negative "time."
     > Of course you can! It's not just time, it's your score! You think you deserve a 0? Not if you get stuff wrong, you wrong-o.
3. When the clock drops to 0 (or below), or if you complete all the questions, the quiz stops and gives you a chance to save your score.
4. If you want, you can then go look at your score on the "High Scores" page.
   > A misnomer, as previously discussed.

I did run into a few tricky bits setting that up.

### Randomizing the Question and Answer Orders

I didn't want the quiz to be the same every time, so I had to figure out how to randomize the order of the questions and answers. Going in, I assumed there would be a method for randomly moving items around in an array, but I didn't find anything like that in the documentation, so I had to make my own.

```javascript
function randomizeArray(arr) {
  let sourceArray = [];
  let returnArray = [];

  // Clone the array into a new array
  for (let i = 0; i < arr.length; i++) {
    sourceArray.push(arr[i]);
  }

  // Pull a random element out of one array and feed it to the other
  while (sourceArray.length > 0) {
    let randomIndex = Math.floor(Math.random() * sourceArray.length);
    returnArray.push(sourceArray[randomIndex]);
    sourceArray.splice(randomIndex, 1);
  }
  return returnArray;
}
```

This works, but seems unncessarily laborious/weird-if-that's-how-you-do-it.

1. In order to recreate the array in a random order, I had to essentially break the source array apart and feed the pieces into a new array, leaving the source empty.
   > In my first version of this function, I did this directly on my Static Library, which emptied out that variable and meant I couldn't retake the quiz. It took me a while to figure that out.
2. I didn't see a built-in method for cloning an array in the docs, so I had to write my own `for` loop to do it.

### Add Color to Answers on Click

I wanted the test taker to get a little instant feedback on whether or not they answered correctly or incorrectly.

First, I appended a little notice at the bottom of the quiz, which was nice, but didn't give me a nice "clicky feeling," i.e. it didn't feel like you were "pressing" anything when you clicked on an answer.

Setting the color attribute was easy, but in order to actually make it visible I had to set a timeout.

```javascript
// Delay question advancement so user can see the color
const timeout1 = setTimeout(advanceQuestion, 200);
```

---

## Credits

I used the `reset.css` file from [meyerweb.com](http://meyerweb.com/eric/tools/css/reset/).

This project utilizes Google Fonts, importing them via CDN.

As always, I heavily referenced the Javascript section over on [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

I couldn't remember how to style HTML tables, so I spent a while on [W3Schools](https://www.w3schools.com/html/html_tables.asp).

---

## License

MIT License

Copyright (c) 2023 Austin Zumbro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
