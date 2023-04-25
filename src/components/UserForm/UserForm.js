import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './UserForm.scss';

const UserForm = ({ onStartQuiz }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [scores, setScores] = useState([]);

  const supabaseUrl = 'https://gsxlbajltldjkgeggjdu.supabase.co';
  const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzeGxiYWpsdGxkamtnZWdnamR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4NjU1ODAsImV4cCI6MTk5NzQ0MTU4MH0.F28ewElSEde7mJQW9979d9yFHpjHX0hLD7XqV--GqD8';
  const supabase = createClient(supabaseUrl, supabaseApiKey);

  useEffect(() => {
    const fetchScores = async () => {
      const { data } = await supabase
        .from('quiz_results')
        .select('name, time_spent')
        .order('score', { ascending: false })
        .limit(5);
      setScores(data);
    };
    fetchScores();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onStartQuiz(name, email);
  };

  return (
    <div className="user-form">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="start-button">
          Start Quiz
        </button>
      </form>
      {scores.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{score.name}</td>
                <td>{score.time_spent} seconds</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserForm;
