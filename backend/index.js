const axios = require('axios');
const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = 3000;


// Your actual RapidAPI key
const API_KEY = '719e40c335msh5df6bc72f57259ap10bb64jsn2bdb7372c7b4';

app.use(cors());

// Fetch schedule for the team with ID 1
app.get('/team-schedule', async (req, res) => {
  try {
    const response = await axios.get('https://nfl-api-data.p.rapidapi.com/nfl-team-schedule', {
      params: { id: '1' },  // Team ID for Falcons
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'nfl-api-data.p.rapidapi.com'
      }
    });

    const schedule = response.data.events.map (event => {
        return {
            gameDate: event.date,
            opponent: event.competitions[0].competitors.find(comp => comp.team.abbreviation !== 'ATL').team.displayName,
            isHomeGame: event.competitions[0].venue.address.city === 'Atlanta',
            venue: event.competitions[0].venue.fullName
        }
    });
    // Send the response data (schedule) back to the client
    res.json(schedule);
  } catch (error) {
    console.error('Error fetching team schedule:', error);
    res.status(500).send('Error fetching team schedule');
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

