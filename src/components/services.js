import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import downloadImage from '../images/download.jpg';

const defaultTheme = createTheme();

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getServices();
  }, []);

  function getServices() {
    axios.get('http://localhost/brief6/services/')
      .then(function (response) {
        console.log(response.data);
        setServices(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const handleViewDetails = (serviceId) => {
    navigate(`/details/${serviceId}`);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        <Container sx={{ py: 8 }} >
          <Typography gutterBottom variant="h5" component="h2">
            Our Services
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                    }}
                    image={downloadImage}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {service.service_name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#6376d2', fontSize: '14px' }}>
                      {service.cost_3month}$ /perMonth
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleViewDetails(service.id)}>View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default Services;
