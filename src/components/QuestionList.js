import React from "react";
import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);
  function handleDelete(id) {
    const leftList = questions.filter((qest) => (qest.id !== id));
   
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((newData) => setQuestions(leftList));
  }
  const questionList = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      handleDelete={handleDelete}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}</ul>
      <ul> {questionList}</ul>
    </section>
  );
}

export default QuestionList;
