import React from 'react';
import AddRecipeForm from './AddRecipeForm.js';

const Dashboard = () => {
  const email = localStorage.getItem('email'); // Retrieve email from local storage
  const userName = email ? email.split('@')[0] : 'User'; // Extract name from email

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <p>This is your dashboard, Add your favourite recipe by filling out the form bellow:</p>
      <AddRecipeForm />

    </div>
  );
};

export default Dashboard;
