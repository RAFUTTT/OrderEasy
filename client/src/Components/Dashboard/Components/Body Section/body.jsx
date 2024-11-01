import React from 'react';
import './body.css';
import Top from './Top Section/Top.jsx'
import Listing from './Listing Section/Listing.jsx';
const BodySection = () => {
  return (
    <div className="mainContent">
      <Top/>
      <div className="bottom flex">
        <Listing/>
      </div>
    </div>
  );
};

export default BodySection;