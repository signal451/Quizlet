import { useState, useEffect } from "react";
import Block from "./blocks";

function Quiz() {
  const [quiz, setQuiz] = useState([]);

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
    const answers = quiz.map((element) => {
      let arr = element.answers;
      for(let i = 0; i < arr.length; i++){
        if(arr[i].body === value) {
          arr[i].isSelected = true
          break;
        }
      }
      return {...element, answers: arr}
    })

    setQuiz(answers)
    console.log(quiz);
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
                    onClick={() => answer_select(val.body)}
                    state={val.isSelected}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Quiz;
