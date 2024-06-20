/* eslint-disable no-unused-vars */
import { Avatar, Button, Card, CardHeader, IconButton, Typography } from '@mui/material';
import React from 'react';
//import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';

const PopularUserCard = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <Card style={{ maxWidth: 345, width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
              D
            </Avatar>
          }
          action={
            <Button size="small" variant="contained" color="primary" style={{ textTransform: 'none' }}>
              Follow
            </Button>
          }
          title={
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Devin Navod
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              @devinnavod
            </Typography>
          }
        />
      </Card>
    </div>
  );
}

export default PopularUserCard;
