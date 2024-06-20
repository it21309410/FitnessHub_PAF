import React, { useState, useEffect } from 'react';
import { Collapse, IconButton, Alert, Card, CardContent } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AllWorkoutPlanPageStyle from '../styles/AllWorkoutPlanStyle.module.css'; // Update the import for styles
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link as CustomLink  } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
//import Button from '@mui/material/Button';
//import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const UserWorkoutPlanPage = () => {
  //const { workoutplanId } = useParams();
  const [noticeStatus, setNoticeStatus] = useState(true);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const navigate = useNavigate();

  // Function to fetch Workout Plans from the API
  const loadData = async () => {
    const userId = '6624fdced319e33794fce0a3'; // Adjust user ID as needed

    try {
      const res = await axios.get(`http://localhost:8080/api/v1/workplans/${userId}`);
      if (res.data._embedded && res.data._embedded.workoutPlanList) {
        setWorkoutPlans(res.data._embedded.workoutPlanList);
      } else {
        setWorkoutPlans([]);
        toast.error('Failed to fetch workout plans');
      }
    } catch (err) {
      toast.error(err.data?.message || err.error);
      setWorkoutPlans([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/workplans/${id}`); // Corrected delete URL
      if (res.status === 204) {
        toast.success('Workout plan deleted successfully');
        // Remove the deleted workout plan from the state
        setWorkoutPlans((prevWorkoutPlans) =>
          prevWorkoutPlans.filter((workoutPlan) => workoutPlan.id !== id)
        );
      } else {
        toast.error('Failed to delete workout plan');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message); // Updated error handling
    }
  };

  return (
    <div style={{ margin:"0px",padding:"0px",background: 'linear-gradient(to bottom, #0000ff, #ffffff)' }}>
      <Container>
        <Row>
          <Col>
            <Card
              variant="outlined"
              style={{ backgroundColor:"lightblue",padding: '0px', borderRadius: '6px' }}
              className={AllWorkoutPlanPageStyle.card} // Update class name for styling
            >
              <CardContent
                style={{
                  padding: '3px',
                  important: 'true',
                  background: 'rgb(240 246 196)',
                }}
              >
                <h1
                  style={{
                    fontSize: '40px',
                    textAlign: 'center',
                  }}
                >
                  User Workout Plans
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
              <strong>Info</strong> - Click on the Edit or Delete button to manage workout plans.
            </Alert>
          </Collapse>
        </Row>
        <br />

        <Row style={{ marginLeft: '10px', marginRight: '10px' }}>
          {Array.isArray(workoutPlans) && workoutPlans.length === 0 ? (
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
                <h2>No workout plans available !!!!</h2>
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
                
                {workoutPlans.map((workoutPlan, index) => (
                
                 
                    <Col key={index} style={{marginRight:'8px'}} >
                     
                  <Card sx={{ width: 245,  margin: '8px' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={workoutPlan.workoutPicURL}
       
      />
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div">
         {workoutPlan.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {workoutPlan.description}
        </Typography>

         {/* Delete button */}
         <Button
                        variant="warning"
                        style={{ marginRight: '30px' }}
                        onClick={() => navigate(`/workoutplan/All/update/${workoutPlan.id}`)} // Adjust the route as needed
                      >
                        Edit
                      </Button>

                      <Button variant="danger" style={{ marginRight: '30px' }}  onClick={() => handleDelete(workoutPlan.id)}>
                        Delete
                      </Button>

        
      </CardContent>
      {/* <CardActions>
        <CustomLink to={`/mealplan/review/${mealplan.id}`}>
        <Button size="small">See Meals</Button>
        </CustomLink>
      </CardActions> */}
    </Card>
    
   
                  </Col>
               
              ))}
            
              
              </Row>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default UserWorkoutPlanPage;