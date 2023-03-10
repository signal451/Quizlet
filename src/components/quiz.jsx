import { useState, useEffect } from "react";
import Block from "./blocks";
import Button from "./button";

function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [reset, setReset] = useState("Check answers");

  const triviaGenerate = (data) => {
    const arr = data
      .map((ele) => {
        let temp = [];
        for (let i = 0; i < ele.incorrectAnswers.length; i++) {
          temp.push({ body: ele.incorrectAnswers[i], isSelected: false });
        }
        temp.push({ body: ele.correctAnswer, isSelected: false });
        return {
          id: ele.id,
          correctAnswer: ele.correctAnswer,
          answers: temp,
          body: ele.question,
        };
      })
      .map((element) => {
        let temp = element.answers;
        for (let i = temp.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [temp[i], temp[j]] = [temp[j], temp[i]];
        }

        return { ...element, answers: temp };
      });

    return arr;
  };

  const checkAnswers = () => {
    let counter = 0;
    quiz.forEach((element) => {
      let arr = element.answers;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].isSelected) {
          counter++;
          break;
        }
      }
    });

    if (counter === 5) {
      if (reset === "Play again") {
        fetch(
          "https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=5&difficulty=medium"
        )
          .then((response) => response.json())
          .then((data) => {
            let temp = triviaGenerate(data);
            setQuiz(temp);
            setReset("Check answers")
          });
      } else {
        const answers = quiz.map((element) => {
          let arr = element.answers;
          for (let i = 0; i < arr.length; i++) {
            if (element.correctAnswer === arr[i].body) {
              // doesn't matter we need to show correct answer
              arr[i].isSelected = "correct";
            }
            if (
              arr[i].isSelected === true &&
              element.correctAnswer !== arr[i].body
            ) {
              arr[i].isSelected = "incorrect";
            }
          }
          return { ...element, answers: arr };
        });
        setQuiz(answers);
        setReset("Play again");
      }
    }
  };

  useEffect(() => {
    fetch(
      "https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=5&difficulty=medium"
    )
      .then((response) => response.json())
      .then((data) => {
        let temp = triviaGenerate(data);
        setQuiz(temp);
      });
  }, []);

  const answer_select = (value) => {
    const answers = quiz
      .map((element) => {
        if (element.id === value[0]) {
          let arr = element.answers;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].isSelected) {
              arr[i].isSelected = false;
            }
          }
          return { ...element, answers: arr };
        }
        return { ...element };
      })
      .map((element) => {
        let arr = element.answers;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].body === value[1]) {
            arr[i].isSelected = true;
            break;
          }
        }
        return { ...element, answers: arr };
      });

    setQuiz(answers);
  };

  return (
    <div className="container">
      {quiz.map((ele) => {
        return (
          <div className="question" key={ele.id}>
            <p> {ele.body} </p>
            <div className="options">
              {ele.answers.map((val, index) => {
                return (
                  <Block
                    key={index}
                    value={val.body}
                    onClick={() => answer_select([ele.id, val.body])}
                    state={val.isSelected}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      <Button title={reset} onClick={checkAnswers} />
    </div>
  );
}

export default Quiz;
