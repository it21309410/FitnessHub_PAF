import { Card, Grid } from '@mui/material';
import React from 'react';

import Login from './Login';
import Register from './Register.jsx';
import { Route, Routes } from 'react-router-dom';

const Authentication = () => {
  return (
    <div className="authentication-container">
      <Grid container spacing={0} className="authentication-grid">
        <Grid
          item
          xs={12}
          style={{
            backgroundImage: `url("https://images.dickssportinggoods.com/marketing/CLP_007_Fitness_2024_Q1_TotalFitness_0221_S10221092924.jpg")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh', // Ensure full viewport height
            display: 'flex',
            justifyContent: 'center', // Center content vertically
            alignItems: 'center', // Center content horizontally
          }}
        >
          <Card className="authentication-card">
            <div className="card-content" style={{textAlign:"center",alignItems:"center"}}>
              <h1>Cloud Fitness</h1>
              <p className="text-center text-sm w-[70%]">Fitness</p>
            </div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>} />
            </Routes>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
