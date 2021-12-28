import axios from 'axios'
import { useEffect, useState } from 'react';

const App = () => {
  const [chosenLevel, setChosenLevel] = useState(null)
  const [words, setWords] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)

  const getRandomWords = () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/results',
      params: { level: chosenLevel, area: 'sat' },
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setWords(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  console.log(words && words.quizlist);

  //whenever chosenLevel changes getRandomWords from the corresponding level
  useEffect(() => {
    if (chosenLevel) getRandomWords()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenLevel])

  const checkAnswer = (option, optionIndex, correctAnswer) => {
    console.log(optionIndex, correctAnswer)
    // if the option selected matches the correct answer display the correct answer in the console. using the spread operator we can add all the displayed correct answers to the correctAnswers array.
    if (optionIndex === correctAnswer) {
      setCorrectAnswers([...correctAnswers, option])
      setScore((score) => score + 1)
    } else setScore((score) => score - 1)
    setClicked([...clicked, option])
  }
  // displays the correct answer in the console when button is clicked
  console.log('correctAnswers', correctAnswers)
  // displays the option clicked in the console regardless of if it is correct or not
  console.log('clicked', clicked)

  return (
    <div className="app">
      {/* if no chosenlevel show this */}
      {!chosenLevel && <div className="level-selector">
        <h1>Word Association App</h1>
        <p>Select Your Level To Start</p>
        <select
          name="levels"
          id="levels"
          value={chosenLevel}
          // on level change access the values of the level selected and updates the setChosenLevel object (state).
          onChange={(e) => setChosenLevel(e.target.value)}>
          <option value="null">Select A Level</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
          <option value="6">Level 6</option>
          <option value="7">Level 7</option>
          <option value="8">Level 8</option>
          <option value="9">Level 9</option>
          <option value="10">Level 10</option>
        </select>
      </div>}

      {/* if a level is chosen and words exist show this */}
      {chosenLevel && words && <div className="question-area">
        <h1>Welcome To Level: {chosenLevel}</h1>
        <h3>Your Score Is: {score}</h3>

        <div className="questions">
          {words.quizlist.map((question, _questionIndex) => (
            <div key={_questionIndex} className="question-box">
              {/* gives each child an unique key via the _index variable */}
              {question.quiz.map((hint, _index) => (
                // {/* shows the hints/clues for the question */}
                <p key={_index}>{hint}</p>
              ))}

              {/* displays the 2 options for choosing the correct answer in button format */}
              <div className="question-buttons">
                {question.option.map((option, optionIndex) => (
                  <div key={optionIndex} className="question-button">
                    {/* checking for the correct answer,  */}
                    <button
                      // when button is selected the button will be disabled
                      disabled={clicked.includes(option)}
                      onClick={() => checkAnswer(option, optionIndex + 1, question.correct)}
                    >{option}</button>

                    {/* displays the below if the correctAnswer is selected */}
                    {correctAnswers.includes(option) && <p>Correct!</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setChosenLevel(null)}>Go Back</button>
      </div>}
    </div>
  )
}

export default App