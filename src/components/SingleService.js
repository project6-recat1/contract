import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// style css
import '../styles/services.css';

// this is for the card image
import downloadImage from '../images/download.jpg';



const SingleService = () => {
  const { id } = useParams(); // Access the ID from the URL parameter

  const [service, setService] = useState(null);

  useEffect(() => {
    getService(id);
  }, [id]);

  const getService = (serviceId) => {
    axios.get(`http://localhost/brief6/services/${serviceId}`)
      .then((response) => {
        console.log(response.data);
        setService(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Render the service data
  return (
    <div>
      {service ? (
        <div>
          <div className='container-singleservice'>
            <div className='left'>
            <h2>{service.service_name}</h2>
          <p>{service.description}</p>
          <p>Cost: {service.cost_3month}$ /perMonth</p>
            </div>
            <div className='right'>
            <img src={downloadImage} alt="Service" />            </div>
          </div>
          {/* Render other service details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleService;
