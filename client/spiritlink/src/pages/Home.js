import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Spirit Link</h1>
      <p>Stay connected.</p>
      <Link to="/signup">
        <Button variant="primary">Get Started</Button>
      </Link>
    </div>
  );
}

export default Home;
