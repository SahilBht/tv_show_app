// ShowList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap'; // Import Bootstrap card components

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setShows(response.data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, []);

  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || '';
  };

  const showDetails = (showId) => {
    navigate(`/show/${showId}`); // Use navigate for navigation
  };

  const getCustomImage = () => 'tv_ph.png';


  return (
    <div className='container'>
      <h1 className='mt-4'>TV Shows</h1>
      <div className='row'>
        {shows.map((show) => (
          <div key={show.show.id} className='col-md-4 mb-4'>
            <Card style={{ height: '25rem' }}>
              {show.show.image && (
                <div className='image-container'>
                  <Card.Img
                    variant='top'
                    src={show.show.image.medium}
                    alt={show.show.name}
                    className='image'
                  />
                  <div className='overlay'>
                    <Card.Title>{show.show.name}</Card.Title>
                    <Card.Text className='truncate-text'>
                      {stripHtmlTags(show.show.summary)}
                    </Card.Text>
                    <Link to={`/show/${show.show.id}`}>
                      <Button variant='primary'>Show Details</Button>
                    </Link>
                  </div>
                </div>
              )}
              {!show.show.image && (
                <div className='image-container'>
                  <Card.Img
                    variant='top'
                    src={getCustomImage(show.show.id)}
                    alt={show.show.name}
                    className='image'
                  />
                  <div className='overlay'>
                    <Card.Title>{show.show.name}</Card.Title>
                    <Link to={`/show/${show.show.id}`}>
                      <Button variant='primary'>Show Details</Button>
                    </Link>
                  </div>
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
