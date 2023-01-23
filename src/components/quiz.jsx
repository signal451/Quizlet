import { useState, useEffect } from "react";

function Quiz() {
  const [quiz, setQuiz] = useState([]);

  // size is relative to the paragraph ... not fixed one

  const triviaGenerate = (data) => {
    const arr = data.map((ele) => {
      return {
        id: ele.id,
        correctAnswer: ele.correctAnswer,
        answers: [ele.correctAnswer, ...ele.incorrectAnswers],
        body: ele.question,
      };
    }).map((element) => {
        let temp = element.answers
        for(let i = temp.length -1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [temp[i], temp[j]] = [temp[j], temp[i]] 
        }

        return {...element, answers: temp}
    })

    console.log(arr);
    return arr;
  };

  useEffect(() => {
    fetch("https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=5&difficulty=medium")
      .then((response) => response.json())
      .then((data) => {
        let temp = triviaGenerate(data);
        setQuiz(temp);
      });
  }, []);

  return (
    <div className="container">
      {quiz.map((ele) => {
        return (
          <div className="question">    
            <p> {ele.body} </p>
            <div className="options">
                {
                    ele.answers.map((val) => {
                        return (
                            <div className="block">
                                    <p>{val}</p>
                                </div>
                        )
                    })
                }
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Quiz;
