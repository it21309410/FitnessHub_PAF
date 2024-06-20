import React, { useState, useEffect } from 'react';
import { Collapse, IconButton, Alert, Card, CardContent } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AllWorkoutPlanPageStyle from '../styles/AllWorkoutPlanStyle.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link as CustomLink } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

const AllWork = () => {
  const [noticeStatus, setNoticeStatus] = useState(true);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/workplans/allworkout`);
      console.log('API Response:', res.data); // Log API response for debugging
      if (Array.isArray(res.data)) {
        setWorkoutPlans(res.data);
      } else {
        setWorkoutPlans([]);
        toast.error('Failed to fetch workout plans');
      }
    } catch (err) {
      console.error('API Error:', err); // Log error for debugging
      toast.error(err.response?.data?.message || err.message);
      setWorkoutPlans([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this workout plan?');
    if (!confirmed) return;

    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/workplans/${id}`);
      if (res.status === 204) {
        toast.success('Workout plan deleted successfully');
        setWorkoutPlans((prevWorkoutPlans) =>
          prevWorkoutPlans.filter((workoutPlan) => workoutPlan.id !== id)
        );
      } else {
        toast.error('Failed to delete workout plan');
      }
    } catch (err) {
      console.error('Delete Error:', err); // Log error for debugging
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ margin: "0px", padding: "0px", background: ' linear-gradient(to top, #39a5d4, #f4f3f3f6)' }}>
      <Container>
        <Row>
          <Col>
            <Card
              variant="outlined"
              style={{ backgroundColor: "#bbdefb", padding: '0px', borderRadius: '6px' }}
              className={AllWorkoutPlanPageStyle.card}
            >
              <CardContent
                style={{
                  padding: '3px',
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
                  <Close fontSize="inherit" />
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
            <Row
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'normal',
              }}
            >
              {workoutPlans.map((workoutPlan, index) => (
                <Col key={index} style={{ marginRight: '8px' }}>
                  <Card sx={{ width: 245, margin: '8px' }}>
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
                      <Typography variant="body2" color="text.secondary">
                        {workoutPlan.workoutLocation}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {workoutPlan.level}
                      </Typography>
                      
                      {/* <Button
                        variant="warning"
                        style={{ marginRight: '30px' }}
                        onClick={() => navigate(`/workoutplan/All/update/${workoutPlan.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        style={{ marginRight: '30px' }}
                        onClick={() => handleDelete(workoutPlan.id)}
                      >
                        Delete
                      </Button> */}
                    </CardContent>
                    <CardActions>
                      <CustomLink to={`/workoutplan/view/${workoutPlan.id}`}>
                        <Button size="small">See workout plan</Button>
                      </CustomLink>
                    </CardActions>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AllWork;

