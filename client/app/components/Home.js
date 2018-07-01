import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Your notes</h1>
    <Link to='/logout'>Log out</Link>
  </div>
);

export default Home;
