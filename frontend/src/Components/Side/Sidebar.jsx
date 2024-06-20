/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Sidebar = () => {
  const sidebarStyle = {
    height: '100vh',
    width: '250px',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#ffffff',
    paddingTop: '20px',
    color: '#333',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    transition: '0.5s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const linkStyle = {
    padding: '15px 20px',
    textDecoration: 'none',
    fontSize: '15px',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    transition: '0.3s',
    borderRadius: '10px',
    margin: '10px 15px',
  };

  const logoStyle = {
    width: '80%',
    margin: '0 auto',
    display: 'block',
  };

  const iconStyle = {
    marginRight: '10px',
  };

  const linkHoverStyle = {
    backgroundColor: '#e9ecef',
    color: '#007bff',
  };

  const handleMouseOver = (e) => {
    Object.assign(e.target.style, linkHoverStyle);
  };

  const handleMouseOut = (e) => {
    Object.assign(e.target.style, { backgroundColor: 'transparent', color: '#333' });
  };

  function handleSignOut() {
    localStorage.removeItem('UserInfo');
    window.location.href = '/login';
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const bottomLinksStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  };

  return (
    <div style={sidebarStyle}>
      <div>
      <img
                            src={'/src/assets/images/logo.png'}
                            alt="Logo"
                            style={logoStyle}
                          />

        <div style={{ marginTop: '30px' }}>
          <Link
            to="/"
            style={linkStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <HomeRoundedIcon style={iconStyle} />
            Home
          </Link>
          <Link
            to="/mealplan"
            style={linkStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <FastfoodRoundedIcon style={iconStyle} />
            Add Meal Plan
          </Link>
          <Link
            to="/workoutplan/create"
            style={linkStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <FitnessCenterRoundedIcon style={iconStyle} />
            Add Workout Plan
          </Link>
        </div>
      </div>
      <div style={bottomLinksStyle}>
        <Link
          to="/profile"
          style={linkStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <PersonRoundedIcon style={iconStyle} />
          Profile
        </Link>
        <Button onClick={handleClickOpen} style={{ color: '#333' }}>
          <MoreVertIcon style={iconStyle} />
          
        </Button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Log out of your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
  onClick={handleSignOut} 
  sx={{ 
    color: 'white', 
    backgroundColor: 'red',
    '&:hover': {
      backgroundColor: 'darkred', // Change this to your desired hover color
    }
  }}
>LogOut</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;
