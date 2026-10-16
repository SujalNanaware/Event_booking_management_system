import React, { useState } from 'react';
import { Container, Typography, TextField, Grid, Card, CardContent, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const mockEvents = [
  { id: 1, title: 'React Advanced Workshop', date: '2026-11-01', location: 'Online', price: 'Free', desc: 'Master custom hooks and state management.' },
  { id: 2, title: 'AI & GenAI Meetup', date: '2026-11-10', location: 'Pune', price: '$20', desc: 'Explore RAG pipelines and LLMs.' },
];

export default function EventsPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredEvents = mockEvents.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>All Events</Typography>
      <TextField 
        fullWidth 
        label="Search events..." 
        variant="outlined" 
        sx={{ mb: 4 }} 
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid container spacing={3}>
        {filteredEvents.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant="h6">{event.title}</Typography>
                <Typography variant="body2" color="text.secondary">{event.date} | {event.location}</Typography>
                <Typography variant="subtitle1" color="primary" sx={{ my: 1 }}>{event.price}</Typography>
                <Typography variant="body2">{event.desc}</Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button variant="contained" fullWidth onClick={() => navigate(`/events/${event.id}`)}>
                  Book Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}