import React, { useEffect, useState } from 'react';

function Schedule() {
  const [schedule, setSchedule] = useState([]);  // State to store schedule data

  // Fetch the team schedule when the component loads
  useEffect(() => {
    fetch('http://localhost:3000/team-schedule')  // Adjust the URL if your backend is running on a different port
      .then(response => response.json())          // Convert the response to JSON
      .then(data => setSchedule(data))            // Store the fetched schedule in state
      .catch(error => console.error('Error fetching schedule:', error));
  }, []);  // The empty array means this runs only once when the component mounts

  return (
    <div>
      <h2>Atlanta Falcons Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Opponent</th>
            <th>Home/Away</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((game, index) => (
            <tr key={index}>
              <td>{new Date(game.gameDate).toLocaleDateString()}</td>
              <td>{game.opponent}</td>
              <td>{game.isHomeGame ? 'Home' : 'Away'}</td>
              <td>{game.venue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;
