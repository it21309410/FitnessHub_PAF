import React from 'react';
import { Collapse, IconButton, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AllMealPlanPageStyle from '../styles/AllMealPlanPageStyle.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link as CustomLink  } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';



const AllMealPlanPage = () => {
  const [noticeStatus, setNoticeStatus] = useState(true);
  const [mealplans, setMealPlans] = useState([]);
  const navigate = useNavigate();

  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);

  // Function to fetch MealPlans from the API
  const loadData = async () => {
    const userId =storedUserInfo._id;
    console.log(userId);

    try {
      const res = await axios.get(
        `http://localhost:8080/api/user/mealplan/user/${userId}`
      );
      if (res.status === 200) {
        // Check if the response data has a "_embedded" property
        if (res.data._embedded && res.data._embedded.mealPlanList) {
          setMealPlans(res.data._embedded.mealPlanList);
        } else {
          setMealPlans([]);
        }
      } else {
        setMealPlans([]);
        toast.error('Failed to fetch meal plans');
      }
    } catch (err) {
      toast.error(err.data?.message || err.error);
      setMealPlans([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    
      <Container >
        <Row>
          <Col>
            <Card
              variant="outlined"
              style={{ padding: '0px', borderRadius: '6px', margingTop:' 30px',backgroundColor:'#bbdefb' }}
              
            >
              <CardContent
                style={{
                  padding: '3px',
                  important: 'true',
                 
                  
                }}
                className={AllMealPlanPageStyle.cardContent}
              >
                <h1
                  style={{
                    fontSize: '40px',
                    textAlign: 'center',
                  }}
                >
                  Meal Plans
                </h1>
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
                  {' '}
                  <Close fontSize="inherit" />{' '}
                </IconButton>
              }
              sx={{ mt: 2, bgcolor: 'rgb(177 232 255)' }}
              severity="info"
            >
              <strong>Info</strong> - To View The Meals Related to a Meal Plan
              Clik On The Meals Button !!!!.
            </Alert>
          </Collapse>
        </Row>
        <br />
        <br/>
        <Row>
        
          {Array.isArray(mealplans) && mealplans.length === 0 ? (
            <Col>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'dimgrey',
                }}
              >
                <h2>No meal plans available !!!!</h2>
              </div>
            </Col>
          ) : (
            <>
            <Row
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'normal',
                  
                 
                }}
                >
                
              {mealplans.map((mealplan, index) => (
                
                 
                    <Col key={index} style={{marginRight:'8px'}} >
                     
                  <Card sx={{ width: 245,  margin: '8px' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={mealplan.mealsPicURL}
       
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {mealplan.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {mealplan.mealtype}
        </Typography>
        
      </CardContent>
      <CardActions>
        <CustomLink to={`/mealplan/review/${mealplan.id}`}>
        <Button size="small">See Meals</Button>
        </CustomLink>
      </CardActions>
    </Card>
    
   
                  </Col>
               
              ))}
            
              
              </Row>
            </>
          )}
        
        </Row>
      </Container>
   
  );
};

export default AllMealPlanPage;
