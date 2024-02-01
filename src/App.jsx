// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ShowList from './Components/ShowList';
import ShowDetails from './Components/ShowDetails';
import BookingForm from './Components/BookingForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ShowList />} />
        <Route path='/show/:id' element={<ShowDetails />} />
        <Route path='/book/:id' element={<BookingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
