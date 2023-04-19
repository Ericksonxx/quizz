import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import UserForm from './components/UserForm/UserForm';
import Quiz from './components/Quizz/Quiz';
import ScoreScreen from './components/ScoreScreen/ScoreScreen';
import './App.scss';

const App = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [timerExpired, setTimerExpired] = useState(false);

  // Update these with your own Supabase URL and API key from the Supabase Dashboard
  const supabaseUrl = 'https://gsxlbajltldjkgeggjdu.supabase.co';
  const supabaseApiKey = 'YOUR_API_KEY';
  const supabase = createClient(supabaseUrl, supabaseApiKey);

  const handleQuizStart = (name, email) => {
    setUser({ name, email });
    setQuizStarted(true);
  };

  const handleQuizCompleted = (finalScore) => {
    setScore(finalScore);
    setQuizStarted(false);
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
      const time = '00:01:00';
      writeToSupabase(user.name, user.email, score, time);
    }
  }, [score, user]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS6DlWB3qVj4l8zdYPpLCSCuqasa64xhjajgeYqw4KmPwc8Rc9aMG-A7YaWCdqFYaSDBlixOH3tuLQ2/pub?output=csv'
      );
      const csvData = await response.text();
      const parsedQuestions = parseCsvData(csvData).slice(0, 5);
      setQuestions(parsedQuestions);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (quizStarted) {
      const timer = setTimeout(() => {
        setTimerExpired(true);
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, [quizStarted]);

  if (timerExpired) {
    return <ScoreScreen score={score} />;
  }

  if (!quizStarted) {
    return <UserForm onStartQuiz={handleQuizStart} />;
  }

  return (
    <div className="app">
      <Quiz questions={questions} duration={60} onQuizCompleted={handleQuizCompleted} />
    </div>
  );
};

const parseCsvData = (data) => {
  const rows = data.split('\n');
  const questions = rows.slice(1).map((row) => {
    const [question, answer] = row.split(',');
    return {
      question,
      options: ['Yes', 'No'],
      correctAnswer: answer.toLowerCase() === 'yes' ? 'Yes' : 'No',
    };
  });
  return questions;
};








export default App;
