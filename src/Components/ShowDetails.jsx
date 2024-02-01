// ShowDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

const ShowDetails = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShowDetails(response.data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [id]);

  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
  };

  const handleBookTicket = () => {
    // Store movie details in localStorage
    localStorage.setItem('selectedMovie', JSON.stringify({ id: showDetails.id, name: showDetails.name }));
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{opacity: '0.8', borderRadius: '15px' , width: '100rem'}}>
        <Row className="h-100">
          {/* Show Image on the left */}
          <Col md={6} className="h-100">
            <Card.Img
              variant="top"
              src={showDetails?.image?.medium || '/tv-show-app/public/tv_ph.png'} // Use default image path
              alt={showDetails?.name}
              className="img-fluid" // Adjust the width of the image
            />
          </Col>

          {/* Show Details on the right */}
          <Col md={6} className="d-flex flex-column justify-content-between">
            <Card.Body className='text-left'>
              <Card.Title className="fs-1">{showDetails?.name}</Card.Title>
              <Card.Text className='fs-4'>{showDetails ? stripHtmlTags(showDetails.summary) : 'Loading show details...'}</Card.Text>
            </Card.Body>

            {/* Button to navigate to BookingForm */}
            <Card.Footer>
              <Link to={`/book/${showDetails?.id}`}>
                <Button className='w-100 h-100 fs-3' onClick={handleBookTicket} variant="primary">
                  Book Ticket
                </Button>
              </Link>
            </Card.Footer>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ShowDetails;
