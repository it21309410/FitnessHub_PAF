import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import ViewWorkoutPlanPageStyle from '../styles/ViewWorkoutPlanStyles.module.css';
// import MealPlanViewPageStyle from '../styles/MealPlanViewPageStyle.module.css';
// import AllMealPlanPageStyle from '../styles/AllMealPlanPageStyle.module.css'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AspectRatio from '@mui/joy/AspectRatio';
import { Link as CustomLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewWorkoutPlanPage = () => {
  // Comment box
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState('normal');
  const [anchorEl, setAnchorEl] = useState(null);

  const { workoutId } = useParams();
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const id = workoutId;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);

  // Like
  const [userLiked, setUserLiked] = useState(false);
  const [isLike, setIsLike] = useState();
  const [openLike, setOpenLike] = useState(false);

  // Add a comment
  const [commentString, setComment] = useState('');
  const [sendComment, setSendComment] = useState(false);

  const loadData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/workplans/byId/${id}`
      ); // Make request to backend API endpoint
      setWorkoutPlans(response.data); // Update state with retrieved data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handlers to handle viewLikes
  const handleLikeClickOpen = () => {
    setOpenLike(true);
  };

  const handleLikeClickClose = () => {
    setOpenLike(false);
  };

  const addCommentHandler = async () => {
    const commentOb = {
      userId: "6624fdced319e33794fce0a3",
      name: "Chamod",
      comment: commentString,
    };
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/workplans/comments/${id}`,
        commentOb
      );
      setSendComment(true);
      toast.success('Comment added successfully!');
      console.log('Comment updated successfully!' + response);
    } catch (error) {
      toast.error('Error adding comment. Please try again.');
      console.error('Error:', error);
    }
  };

  const likeHandler = async () => {
    const likeOb = {
      userId: "6624fdced319e33794fce0a3",
      name: "Chamod",
    };
    await axios
      .put(`http://localhost:8080/api/v1/workplans/like/${id}`, likeOb)
      .then((response) => {
        toast.success('liked successfully!');
        console.log('liked successfully!' + response);
        setIsLike(false);
      })
      .catch((error) => {
        toast.error('liked unsuccesfull!');
        console.error('Error:', error);
      });
  };

  const unLikeHandler = async () => {
    const unlikeOb = {
      userId: "6624fdced319e33794fce0a3",
      name: "Chamod",
    };
    await axios
      .put(`http://localhost:8080/api/v1/workplans/unlike/${id}`, unlikeOb)
      .then((response) => {
        toast.success('UnLiked successfully! ');
        console.log('UnLiked successfully!' + response);
        setIsLike(true);
      })
      .catch((error) => {
        toast.error(' Error Unlike!');
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    const fetchDataAndCheckLike = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/v1/workplans/byId/${id}`
        );
        setWorkoutPlans(response.data);
        const isLikedByUser = response.data.likes.some(
          (like) => like.userId === "6624fdced319e33794fce0a3"
        );
        setUserLiked(isLikedByUser);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchDataAndCheckLike();
  }, [isLike, sendComment, id]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this workout plan?');
  
    if (!confirmed) {
      return; 
    }
  
    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/workplans/${id}`);
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
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <div className={ViewWorkoutPlanPageStyle.bodyDivPostView}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            marginRight: '30%',
            marginLeft:'30%' // Ensures the card is centered vertically
          }}
        >
          <Row>
            <Card sx={{ width: 730, height: 1000 }} variant="outlined" size="lg">
              <CardContent style={{ marginTop: "10px" }}>
                <div>Workout Plan Name:</div>
                <center>
                  <h4>{workoutPlans.name}</h4>
                </center>
              </CardContent>
              <AspectRatio minHeight="220px" maxHeight="300px">
                <img
                  src={workoutPlans.workoutPicURL}
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <></>
              <Row>
                <Col xs={2}>
                  {userLiked ? (
                    <IconButton onClick={unLikeHandler}>
                      <FavoriteIcon sx={{ color: 'blue' }} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={likeHandler}>
                      <FavoriteBorderOutlinedIcon sx={{ color: 'blue' }} />
                    </IconButton>
                  )}
                </Col>
                <Col>
                  <Button
                    style={{ color: 'black', background: '#f6f6f6' }}
                    onClick={handleLikeClickOpen}
                  >
                    ({workoutPlans.likes && workoutPlans.likes.length}) likes
                  </Button>
                  <React.Fragment>
                    <Dialog
                      open={openLike}
                      onClose={handleLikeClickClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth
                      maxWidth="xs"
                    >
                      <DialogTitle style={{ marginLeft: '40%' }} id="alert-dialog-title">
                        {'Likes'}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          {workoutPlans.likes &&
                            workoutPlans.likes.map((row) => (
                              <Row
                                key={row.userId}
                                style={{
                                  background: '#edebff',
                                  margin: '5% 1% -3% 1%',
                                }}
                              >
                                <Col>
                                  <p>{row.name}</p>
                                </Col>
                              </Row>
                            ))}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleLikeClickClose}>OK</Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                </Col>
              </Row>
              <Row>
                <CardContent style={{ marginTop: "10px" }}>
                  <div>Workout Plan Description:</div>
                  <center>
                    <h4>{workoutPlans.description}</h4>
                  </center>
                </CardContent>
              </Row>
              <Row>
                <CardContent style={{ marginTop: "10px" }}>
                  <div>Workout Plan Location:</div>
                  <center>
                    <h4>{workoutPlans.workoutLocation}</h4>
                  </center>
                </CardContent>
              </Row>
              <Row>
                <CardContent style={{ marginTop: "10px" }}>
                  <div>Workout Plan Level:</div>
                  <center>
                    <h4>{workoutPlans.level}</h4>
                  </center>
                </CardContent>
              </Row>
              <Row>
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

                      </Row>
              <Row>
              {workoutPlans.works &&
    workoutPlans.works.map((row, index) => (
        <Card key={index} style={{ margin: '10px' }}>
            <CardContent>
                        <Typography variant="h5" component="div">
                          <b>Name :</b> {row.name}
                        </Typography>
                        <Typography variant="body1" component="div">
                          <b>Discription :</b> {row.discription.join(' ,')}
                        </Typography>
                        <Typography variant="body1" component="div">
                          <b>TargetAres :</b> {row.targetAreas}
                        </Typography>
                        <Typography variant="body1" component="div">
                          <b>Equipments :</b> {row.equipments}
                        </Typography>
                        <Typography variant="body1" component="div">
                          <b>Sets :</b> {row.sets.join(' ,')}
                        </Typography>
                        <Typography variant="body1" component="div">
                          <b>Reps :</b> {row.reps.join(' ,')}
                        </Typography>
                      </CardContent>


                      
                      
        </Card>
    ))}
              </Row>
            </Card>
            <Row>
              <div
                style={{
                  padding: '3%',
                  marginBottom: '10px',
                  maxWidth: '775px',
                  border: '1px solid rgb(185 175 175)',
                  backgroundColor:'white',
                }}
              >
                <Row style={{ paddingBottom: '2%' }}>
                  <h4>Comments ({workoutPlans.comments && workoutPlans.comments.length})......</h4>
                </Row>
                <Row style={{ padding: '0% 5% 0% 5%' }}>
                  <FormControl>
                    <Textarea
                      placeholder="Type something here…"
                      minRows={3}
                      value={commentString}
                      onChange={(e) => setComment(e.target.value)}
                      endDecorator={
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            flex: 'auto',
                          }}
                        >
                          <IconButton
                            variant="plain"
                            color="neutral"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                          >
                            <FormatBold />
                            <KeyboardArrowDown fontSize="md" />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            size="sm"
                            placement="bottom-start"
                            sx={{ '--ListItemDecorator-size': '24px' }}
                          >
                            {['200', 'normal', 'bold'].map((weight) => (
                              <MenuItem
                                key={weight}
                                selected={fontWeight === weight}
                                onClick={() => {
                                  setFontWeight(weight);
                                  setAnchorEl(null);
                                }}
                                sx={{ fontWeight: weight }}
                              >
                                <ListItemDecorator>
                                  {fontWeight === weight && (
                                    <Check fontSize="sm" />
                                  )}
                                </ListItemDecorator>
                                {weight === '200' ? 'lighter' : weight}
                              </MenuItem>
                            ))}
                          </Menu>
                          <IconButton
                            variant={italic ? 'soft' : 'plain'}
                            color={italic ? 'primary' : 'neutral'}
                            aria-pressed={italic}
                            onClick={() => setItalic((bool) => !bool)}
                          >
                            <FormatItalic />
                          </IconButton>
                          <Button sx={{ ml: 'auto' }}
                            onClick={() => addCommentHandler()}>Send</Button>
                        </Box>
                      }
                      sx={{
                        minWidth: 300,
                        fontWeight,
                        fontStyle: italic ? 'italic' : 'initial',
                      }}
                    />
                  </FormControl>
                </Row>
                {workoutPlans.comments &&
                  workoutPlans.comments.map((row) => (
                    <Row
                      key={row.userId}
                      style={{
                        padding: '3%',
                        margin: '5%',
                        marginTop: '10px',
                        marginBottom: '10px',
                        maxWidth: '775px',
                        border: '1px solid rgb(185 175 175)',
                      }}
                    >
                      <Row>
                        <Col xs={8}>
                          <p style={{ color: '#9d00c2' }}>{row.name}</p>
                        </Col>
                        <p>{row.comment}</p>
                      </Row>
                    </Row>
                  ))}
              </div>
            </Row>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ViewWorkoutPlanPage;

