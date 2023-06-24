import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

// style css
import '../styles/services.css';

// this is for the card image
import downloadImage from '../images/download.jpg';

const defaultTheme = createTheme();

const SingleService = () => {
    const { id } = useParams(); // Access the ID from the URL parameter

    const [service, setService] = useState(null);

    useEffect(() => {
        getService(id);
    }, [id]);

    const getService = (serviceId) => {
        axios
            .get(`http://localhost/react/reactbrief/${serviceId}`)
            .then((response) => {
                console.log(response.data);
                setService(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // for the pricing
    const tiers = [
        {
            title: '1 month',
            price: service ? `${service.cost_3month}` : '',
            description: [
                // '10 users included',
                // '2 GB of storage',
                // 'Help center access',
                // 'Email support',
            ],
            buttonText: 'Sign contract',
            buttonVariant: 'outlined',
        },
        {
            title: '2 months',
            price: service ? `${service.cost_3month * 2}` : '',
            description: [
                // '20 users included',
                // '10 GB of storage',
                // 'Help center access',
                // 'Priority email support',
            ],
            buttonText: 'Sign contract',
            buttonVariant: 'outlined',
        },
        {
            title: '3 months',
            price: service ? `${service.cost_3month * 3}` : '',
            description: [
                // '50 users included',
                // '30 GB of storage',
                // 'Help center access',
                // 'Phone & email support',
            ],
            buttonText: 'Sign contract',
            buttonVariant: 'outlined',
        },
    ];

    // Render the service data
    return (
        <div>
            <div className='container-singleservice'>
                <div className='left'>
                    <h2>{service ? service.service_name : ''}</h2>
                    <p>{service ? service.description : ''}</p>
                </div>
                <div className='right'>
                    <img src={downloadImage} alt="Service" />
                </div>
            </div>
            <ThemeProvider theme={defaultTheme}>
                <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                <CssBaseline />
                <Container maxWidth="md" component="main">
                    <Grid container spacing={5} alignItems="flex-end">
                        {tiers.map((tier) => (
                            // Enterprise card is full width at sm breakpoint
                            <Grid
                                item
                                key={tier.title}
                                xs={12}
                                sm={tier.title === 'Enterprise' ? 12 : 6}
                                md={4}
                            >
                                <Card>
                                    <CardHeader
                                        title={tier.title}
                                        subheader={tier.subheader}
                                        titleTypographyProps={{ align: 'center' }}
                                        action={tier.title === 'Pro' ? <StarIcon /> : null}
                                        subheaderTypographyProps={{
                                            align: 'center',
                                        }}
                                        sx={{
                                            backgroundColor: (theme) =>
                                                theme.palette.mode === 'light'
                                                    ? theme.palette.grey[200]
                                                    : theme.palette.grey[700],
                                        }}
                                    />
                                    <CardContent>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'baseline',
                                                mb: 2,
                                            }}
                                        >
                                            <Typography component="h2" variant="h3" color="text.primary">
                                                {tier.price}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                $
                                            </Typography>
                                        </Box>
                                        <ul>
                                            {tier.description.map((line) => (
                                                <Typography
                                                    component="li"
                                                    variant="subtitle1"
                                                    align="center"
                                                    key={line}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardActions>
                                        <Button fullWidth variant={tier.buttonVariant}>
                                            {tier.buttonText}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default SingleService;
