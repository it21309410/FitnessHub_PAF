/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
//import HomeRight from '../../components/HomeRight/HomeRight';
import { Sidebar } from '../../components/Side/Sidebar';
import Grid from '@mui/material/Grid';
import AllMealPlanPage from '../AllMealPlanPage';

import AllWorkoutPlanPage from '../AllWorkoutPlanPage';
import PostCardUser from '../../components/Post/PostCardUser';

const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);
  const tabs = [
  { value: 'post', name: 'Post' },
  { value: 'Meals', name: 'Meals' },
  { value: 'Workouts', name: 'Workouts' },
];

const posts = [1];
const reels = [1];

const ErrorBoundary = ({ children }) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {children}
    </React.Suspense>
  );
};

const Profile = () => {
  useParams();
  const [value, setValue] = useState('post');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ErrorBoundary>
      <div
        style={{
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 1rem',
          fontFamily: 'verdana',
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={4} lg={3}>
            <div className="sticky top-0">
              <Sidebar />
            </div>
          </Grid>

          <Grid item xs={5} lg={6}>
            <Card
              style={{
                marginLeft: '0rem',
                marginTop: '2.5rem',
                marginBottom: '2.5rem',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div style={{ borderRadius: '0.375rem' }}>
                <div style={{ height: '15rem' }}>
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      borderTopLeftRadius: '0.375rem',
                      borderTopRightRadius: '0.375rem',
                    }}
                    src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg"
                    alt="Background"
                  />
                </div>
                <div
                  style={{
                    paddingLeft: '1.25rem',
                    paddingRight: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginTop: '1.25rem',
                    height: '5rem',
                  }}
                >
                  <Avatar
                    style={{ transform: 'translateY(-6rem)' }}
                    sx={{ width: '10rem', height: '10rem' }}
                    src="https://cdn.pixabay.com/photo/2017/02/04/12/25/man-2037255_640.jpg"
                    alt="Profile"
                  />
                  <Button sx={{ borderRadius: '20px' }} variant="outlined">
                    Edit Profile
                  </Button>
                </div>
                <div style={{ padding: '1rem' }}>
                  <h1
                    style={{
                      paddingTop: '0rem',
                      paddingBottom: '0rem',
                      fontWeight: '600',
                      fontSize: '1.25rem',
                    }}
                  >
                    {storedUserInfo.firstName } {storedUserInfo.lastName }
                  </h1>
                  <p>{storedUserInfo.userName }</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    paddingLeft: '1rem',
                  }}
                >
                  <span>41 posts</span>
                  <span>35 followers</span>
                  <span>5 followings</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    paddingLeft: '1rem',
                  }}
                >
                  <p>Fitness enthusiast | Sharing workouts, tips, and motivation | Transforming one rep at a time 💪 #FitnessJourney #HealthyLiving</p>
                </div>
              </div>
              <section>
                <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                  >
                    {tabs.map((item) => (
                      <Tab key={item.value} value={item.value} label={item.name} wrapped />
                    ))}
                  </Tabs>
                </Box>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {value === 'post' ? (
                    <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem', width: '70%' }}>
                      {posts.map((item, index) => (
                        <div key={index} style={{ marginBottom: '1.25rem', border: '1px solid #CBD5E0', borderRadius: '5px' }}>
                          <PostCardUser />
                        </div>
                      ))}
                    </div>
                  ) : value === 'Meals' ? (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2.5rem', marginBottom: '2.5rem' }}>
                      {reels.map((item, index) => (
                        <AllMealPlanPage key={index} />
                      ))}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2.5rem', marginBottom: '2.5rem' }}>
                      {reels.map((item, index) => (
                        <AllWorkoutPlanPage key={index} />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </Card>
          </Grid>

          <Grid item xs={12} lg={3}>
            <div className="sticky top-0 w-full">
              {/* Add any additional right-side content here */}
            </div>
          </Grid>
        </Grid>
      </div>
    </ErrorBoundary>
  );
};

export default Profile;
