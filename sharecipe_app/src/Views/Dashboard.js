import React from 'react';

const Dashboard = () => {
  const email = localStorage.getItem('email'); // Retrieve email from local storage
  const userName = email ? email.split('@')[0] : 'User'; // Extract name from email

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      {/* Other content for the dashboard */}
    </div>
  );
};

export default Dashboard;
