import React, { useState, useEffect } from 'react';
import { Collapse, IconButton, Alert, CardMedia, Typography, CardActions, Button, Card, CardContent, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Container, Row, Col } from 'react-bootstrap';
import AllMealPlanPageStyle from '../styles/AllMealPlanPageStyle.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link as CustomLink } from 'react-router-dom';

const AllMealPage = () => {
  const [mealplans, setMealPlans] = useState('');
  const [noticeStatus, setNoticeStatus] = useState(true);

  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);

  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/mealplan');
      console.log(response.data); // Make request to backend API endpoint
      setMealPlans(response.data); // Update state with retrieved data
    }
    catch (error) {
        console.error('Error fetching data:', error);
      }
  };

  useEffect(() => {
    loadData();
    return () => {
    };
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Card
            variant="outlined"
            style={{ padding: '0px', borderRadius: '6px', marginTop: '30px', backgroundColor: '#bbdefb' }}
          >
            <CardContent className={AllMealPlanPageStyle.cardContent} style={{ padding: '3px' }}>
              <h1 style={{ fontSize: '40px', textAlign: 'center' }}>Meal Plans</h1>
            </CardContent>
          </Card>
        </Col>
      </Row>
      <Row>
        <Collapse in={noticeStatus}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setNoticeStatus(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mt: 2, bgcolor: 'rgb(177 232 255)' }}
            severity="info"
          >
            <strong>Info</strong> - To View The Meals Related to a Meal Plan Click On The Meals Button!!!!
          </Alert>
        </Collapse>
      </Row>
      <br />
      <Row>
          <Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'normal' }}>
            { mealplans && mealplans.map((row, index) => (
              <Col key={index} style={{ marginRight: '8px' }}>
                <Card sx={{ width: 245, margin: '8px' }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={row.mealsPicURL || 'default-image-url.jpg'}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {row.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.mealtype}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <CustomLink to={`/mealplan/review/${row.id}`}>
                      <Button size="small">See Meals</Button>
                    </CustomLink>
                  </CardActions>
                </Card>
              </Col>
            ))}
          </Row>
    
      </Row>
    </Container>
  );
};

export default AllMealPage;
