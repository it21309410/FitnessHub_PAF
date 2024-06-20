import React, { useEffect, useState } from 'react'
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Button } from '@mui/material'
import { Carousel } from 'react-bootstrap';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../Config/FireBaseConfig';
import { Favorite, Delete, Edit,  HeartBroken, HeatPumpSharp, Warning } from '@mui/icons-material';
import toast from 'react-hot-toast'; // Import toast for notifications
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StoryCircle = ({item, reload}) => {

  const [showStatus, setShowStatus] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading3, setIsLoading3] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [tempDeleteId, setTempDeleteId] = useState('');
  const [storyItems, setStoryItems] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

  // Automatically advance the Carousel every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (selectedIndex + 1) % storyItems.length;
      setSelectedIndex(nextIndex);
    }, 5000); // Change the interval time as needed (in milliseconds)

    return () => clearInterval(intervalId);
  }, [selectedIndex, storyItems.length]);


  useEffect(() => {
    const fetchWorkoutImages = async () => {
      const storyItem = [];
      const workouts = item.workouts;
  
      try {
        // Create an array of promises for fetching image URLs
        const promises = workouts.map(async (workout) => {
          const storagePath = workout.image;
          const response = await getDownloadURL(ref(storage, storagePath));
          if (response) {
            workout.image = response;
            storyItem.push(workout);
          } else {
            console.error(`Failed to fetch image for workout with ID ${workout._id}`);
          }
        });
  
        // Wait for all promises to resolve
        await Promise.all(promises);
  
        // Once all image URLs are fetched, update the state
        setStoryItems(storyItem);
      } catch (error) {
        console.error('Error fetching workout images:', error);
        // Handle the error as needed
      }
    };
  
    // Call the async function
    fetchWorkoutImages();
  }, []);


  const like = async (index) => {
    
  }


  //delete status
  const handleDialogOpen = (e, id) => {
    e.preventDefault();
    setConfirmDialog(true);
    setTempDeleteId(id)
  }

  const handleDialogClose = () => {
    setTempDeleteId('');
    setConfirmDialog(false);
  } 

  const deleteStatus = async() => {
    try {
      setIsLoading3(true);
      
      const data = tempDeleteId;
      const res = await api.delete("/v1/workouts/deleteStatus/" + data);
      
      toast.success('Status Deleted successfully!');
      reload()
      
    } catch (err) {
        toast.error(err.data?.message || err.error || err.message);
        setIsLoading3(false);
    } finally {
      setIsLoading3(false);
      handleDialogClose();
    }
  } 

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  /*const deleteWorkout = async(workoutId) => {
    try {
      // Display a confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this workout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });

      // If the user confirms deletion
      if (result.isConfirmed) {
        await api.delete(
          "/v1/workouts/deleteStatus/" + workoutId
        );
        setWorkouts((prevWorkouts) =>
          prevWorkouts.filter((workout) => workout._id !== workoutId)
        );
        // Show success message
        Swal.fire("Deleted!", "Your workout has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // If the user cancels
        Swal.fire("Cancelled", "Your workout is safe :)", "error");
      }
    } catch (error) {
      console.log("error deleting workout", error);
      // Show error message
      Swal.fire(
        "Error",
        "An error occurred while deleting the workout.",
        "error"
      );
    }
  }*/

  return (
    <div>
        <div style={{ paddingBottom: '1.25rem',display: 'flex', flexDirection: 'column',alignItems: 'center', }}>
        
        <Avatar 
          style={{
            width: '5rem', height: '5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            marginLeft:'10px',
          }}
          onClick={() => setShowStatus(true)}
          
          src={`https://picsum.photos/seed/${item.userId}/200/300`}
          
        >
        </Avatar>
        <p style={{ margin: '0', textAlign: 'center' }}>{item.userId !== "null" ? item.userId : 'Dev'}</p>
      </div>

      <Dialog
          fullWidth
          open={showStatus}
          onClose={() => setShowStatus(false)}
      >
          <DialogTitle>
            {item.userId !== "null" ? item.userId : 'Dev'} • {new Date(storyItems[selectedIndex]?.updatedAt).toLocaleTimeString()}
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              style={{minWidth:'0', padding:'5px', marginLeft:"95%"}}
            >
            <MoreVertIcon />
            </IconButton>
            
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate("/status/update")}>
                Edit
              </MenuItem>
              <MenuItem onClick={(e) => handleDialogOpen(e,storyItems[selectedIndex]._id)}>
                Delete
              </MenuItem>
            </Menu>
            {/* <Button style={{minWidth:'0', padding:'5px', marginLeft:"75%"}} ><Edit style={{color:"blue", fontSize:"20px" }} onClick={() => navigate("/status/update")}/></Button>
            <Button style={{minWidth:'0', padding:'5px', marginLeft:"95%"}} onClick={(e) => handleDialogOpen(e,storyItems[selectedIndex]._id)}><Delete style={{color:"#f73b54", fontSize:"20px" }}/></Button> Delete button */}
          </DialogTitle>
          <DialogContent style={{textAlign:'center', height:'100vh'}}>
            <Carousel fade style={{height:'100%'}} activeIndex={selectedIndex} onSelect={handleSelect}>
              {storyItems.map((workout, index) => (
                <Carousel.Item key={index} style={{height:'70vh'}}>
                  <img src={workout.image} width={'100%'} height={'100%'} style={{objectFit:'contain'}} />
                  <Carousel.Caption style={{marginTop:'50px', color:'white', background:'#00000040', left:0, right:0, bottom:0, width:'100%'}}>
                    <h3>{workout.metrix}</h3>
                    <p>{workout.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </DialogContent>
          <DialogActions style={{justifyContent:'flex-start', margin:'10px'}}>
            {storyItems[selectedIndex]?.likes}<IconButton onClick={() => like(selectedIndex)}><Favorite /></IconButton>
          </DialogActions>
      </Dialog>

      <Dialog
                
                open={confirmDialog}
                onClose={handleDialogClose}
            >
                <DialogContent >
                    <Warning style={{fontSize:'100px', color:'red'}} />
                </DialogContent>
                <DialogTitle id="responsive-dialog-title">
                    {"Are you sure you want to delete this status?"}
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button onClick={deleteStatus}  style={{color:'black'}} autoFocus variant="danger">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        
    </div>

    
  );

}

export default StoryCircle