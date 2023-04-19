import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import UserForm from './components/UserForm/UserForm';
import Quiz from './components/Quizz/Quiz';
import './App.scss';

const App = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(null);
  const [questions, setQuestions] = useState([]);

  // Update these with your own Supabase URL and API key from the Supabase Dashboard
  const supabaseUrl = 'https://gsxlbajltldjkgeggjdu.supabase.co';
  const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzeGxiYWpsdGxkamtnZWdnamR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4NjU1ODAsImV4cCI6MTk5NzQ0MTU4MH0.F28ewElSEde7mJQW9979d9yFHpjHX0hLD7XqV--GqD8';
  const supabase = createClient(supabaseUrl, supabaseApiKey);

  const handleQuizStart = (name, email) => {
    setUser({ name, email });
    setQuizStarted(true);
  };

  const writeToSupabase = async (name, email, score, time) => {
    const { error } = await supabase.from('quiz_results').insert([
      {
        name,
        email,
        score,
        time,
      },
    ]);

    if (error) {
      console.error('Error writing data to Supabase:', error);
    }
  };

  useEffect(() => {
    if (score !== null) {
      const time = '00:05:00'; // You should calculate the actual time spent on the quiz
      writeToSupabase(user.name, user.email, score, time);
    }
  }, [score, user]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS6DlWB3qVj4l8zdYPpLCSCuqasa64xhjajgeYqw4KmPwc8Rc9aMG-A7YaWCdqFYaSDBlixOH3tuLQ2/pub?output=csv'
      );
      const csvData = await response.text();
      const parsedQuestions = parseCsvData(csvData);
      setQuestions(parsedQuestions);
    };

    fetchQuestions();
  }, []);

  if (!quizStarted) {
    return <UserForm onStartQuiz={handleQuizStart} />;
  }

  if (score !== null) {
    return <div>Your score is: {score}</div>;
  }

  return (
    <div className="app">
      <Quiz questions={questions} duration={300} onQuizCompleted={setScore} />
    </div>
  );
};

const parseCsvData = (data) => {
  const rows = data.split('\n');
  const questions = rows.slice(1).map((row) => {
    const [question, option1, option2, option3, option4, correctAnswer] = row.split(',');
    const options = [option1, option2, option3, option4];
    return {
      question,
      correctAnswer,
      options,
    };
  });
  return questions;
};








export default App;