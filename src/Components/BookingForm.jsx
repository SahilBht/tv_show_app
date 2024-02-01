// BookingForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'; // Import Bootstrap components

const BookingForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    movieName: '',
    name: '',
    email: '',
    phone: ''
  });
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));

    setFormData({
      ...formData,
      movieName: selectedMovie ? selectedMovie.name : '',
      name: 'Sahil Bhatia',
      email: 'sahilbhatiag@gmail.com',
      phone: '7300360007'
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { ...formData, movieId: id };

    // Perform form submission logic, e.g., API call
    console.log('Form submitted:', userData);

    // Save data to userData.json
    const existingData = JSON.parse(localStorage.getItem('userData')) || [];
    localStorage.setItem('userData', JSON.stringify([...existingData, userData]));

    // Clear localStorage after form submission
    localStorage.removeItem('selectedMovie');

    // Display "Booked!" message
    setBooked(true);

    // Reset the form data after submission (optional)
    setFormData({
      movieName: '',
      name: '',
      email: '',
      phone: ''
    });

    // Hide the "Booked!" message after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
      setBooked(false);
    }, 3000);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{ opacity: '0.8', borderRadius: '15px', width: '40rem' }}>
        <Card.Body>
          <Card.Title className="fs-2">Booking Form</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMovieName">
              <Form.Label>Movie Name:</Form.Label>
              <Form.Control type="text" name="movieName" value={formData.movieName} onChange={handleInputChange} disabled />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} placeholder="John Doe" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} placeholder="john@example.com" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone:</Form.Label>
              <Form.Control type="tel" name="phone" value={formData.phone} placeholder="123-456-7890" onChange={handleInputChange} />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Book Now
            </Button>
          </Form>

          {booked && (
            <Alert variant="success" className="mt-3">
              Booked!
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookingForm;
