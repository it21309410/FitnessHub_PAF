import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, CardBody } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import MealPlanViewPageStyle from '../styles/MealPlanViewPageStyle.module.css';
import AllMealPlanPageStyle from '../styles/AllMealPlanPageStyle.module.css'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
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
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import AspectRatio from '@mui/joy/AspectRatio';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Link as CustomLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { blue, green, red } from '@mui/material/colors';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MealPlanView = () => {
  //comment box
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState('normal');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  //dialog box in deletePost
  const [open, setOpen] = useState(false);
  const { mealplanId } = useParams();
  console.log(mealplanId);

  const [mealPlanData, setMealPlanData] = useState('');
  console.log(mealPlanData.id);

  const [isLoading, setIsLoading] = useState(false);
  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);


  //like
  const [userLiked, setUserLiked] = useState(false);
  const [isLike, setIsLike] = useState();
  const [openLike, setOpenLike] = useState(false);

  //add a comment
  const [commentString, setComment] = useState('');
  const [sendComment, setsendComment] = useState(false);


  //console.log(postId.id);
  const loadData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/mealplan/${mealplanId}`
      ); // Make request to backend API endpoint
      setMealPlanData(response.data); // Update state with retrieved data

      try {
        const response2 = await axios.get(
          `http://localhost:8080/api/user/mealplan/${mealplanId}`
        );
      } catch (error) { }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //handlers to handle delete dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //handlers to handle viewLikes
  const handleLikeClickOpen = () => {
    setOpenLike(true);
  };

  const handleLikeClickClose = () => {
    setOpenLike(false);
  };



  const deleteHandler = () => {
    axios
      .delete(`http://localhost:8080/api/user/mealplan/delete/${mealplanId}`)
      .then((response) => {
        console.log('MealPlan deleted successfully!' + response);
        navigate(`/profile`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  const addCommentHandler = async () => {
    console.log(commentString);
    const commentOb = {
      userId: storedUserInfo._id,
      name: storedUserInfo.userName,
      comment: commentString,
    };
    console.log(commentOb);
    await axios
      .put(
        `http://localhost:8080/api/user/mealplan/comments/${mealplanId}`,
        commentOb
      )
      .then((response) => {
        setsendComment(true);
        console.log('Comment updated successfully!' + response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  const likeHandler = async () => {
    const likeOb = {
      userId: storedUserInfo._id,
      name: storedUserInfo.userName,
    };

    console.log(likeOb);
    await axios
      .put(`http://localhost:8080/api/user/mealplan/like/${mealplanId}`, likeOb)
      .then((response) => {
        console.log('liked successfully!' + response);
        setIsLike(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  const UnLikeHandler = async () => {
    const unlikeOb = {
      userId: storedUserInfo._id,
      name: storedUserInfo.userName,
    };

    console.log(unlikeOb);
    await axios
      .put(
        `http://localhost:8080/api/user/mealplan/unlike/${mealplanId}`,
        unlikeOb
      )
      .then((response) => {
        console.log('UnLiked successfully!' + response);
        setIsLike(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  //useEffect
  useEffect(() => {
    const fetchDataAndCheckLike = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/user/mealplan/${mealplanId}`
        );

        setMealPlanData(response.data);

        const isLikedByUser = response.data.likes.some(
          (like) => like.userId === storedUserInfo._id
        );
        setUserLiked(isLikedByUser);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchDataAndCheckLike();
  }, [isLike, sendComment]);


  return (
    <>



      <div className={MealPlanViewPageStyle.bodyDivPostView}>
        <Row>

          <Card sx={{ width: 380, height: 450 }} variant="outlined" size="lg" >
            <CardContent style={{ margingTop: "10px" }}>

              <div> <RestaurantMenuIcon />Meal plan:</div>
              <center>
                <h4>{mealPlanData.title}</h4>
              </center>
              <div><RestaurantMenuIcon />Meal category:</div>
              <center>
                <h5>{mealPlanData.mealtype}</h5>
              </center>
            </CardContent>


            <AspectRatio minHeight="120px" maxHeight="200px">
              <img
                src={mealPlanData.mealsPicURL}

                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <Row>
                <Col xs={2}>
                  {userLiked && userLiked ? (
                    <>
                      <IconButton onClick={UnLikeHandler}>
                        <FavoriteIcon sx={{ color: blue[500] }} />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={likeHandler}>
                        <FavoriteBorderOutlinedIcon sx={{ color: blue[500] }} />
                      </IconButton>
                    </>
                  )}
                </Col>
                <Col>
                  <Button
                    style={{ color: 'black', background: '#f6f6f6' }}
                    onClick={handleLikeClickOpen}
                  >
                    ({mealPlanData.likes && mealPlanData.likes.length}) likes
                  </Button>
                  <React.Fragment style={{ background: '#66526469' }}>
                    <Dialog
                      style={{ background: '#66526469' }}
                      open={openLike}
                      onClose={handleLikeClickClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth
                      maxWidth="xs"
                    >
                      <DialogTitle
                        style={{ marginLeft: '40%' }}
                        id="alert-dialog-title"
                      >
                        {'Likes'}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          {mealPlanData.likes &&
                            mealPlanData.likes.map((row) => (
                              <Row
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
                <Col>

                  {mealPlanData.userId === storedUserInfo._id ? (
                    <>
                      {/* Link */}
                      <CustomLink to={`/mealplan/all/update/${mealPlanData.id}`}>
                        <IconButton>
                          <EditOutlinedIcon sx={{ color: green[500] }} />
                        </IconButton>
                      </CustomLink>
                      {/* Delete */}
                      <IconButton>
                        <DeleteOutlinedIcon onClick={handleClickOpen} sx={{ color: red[500], margin: '25px' }} />
                      </IconButton>
                    </>
                  ) : (
                    <></>
                  )}

                  {/* Dialog for Delete */}
                  <React.Fragment>
                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>
                        {'Do you really want to delete the Meal Plan?'}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          Are you sure you want to delete the Meal plan?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={deleteHandler}>Confirm</Button>
                      </DialogActions>
                    </Dialog>

                  </React.Fragment>










                </Col>
              </Row>
            </CardContent>

          </Card>



          <Col style={{
            backgroundColor: '#ffffff',
            padding: '3%',
            marginBottom: '10px',
            maxWidthWidth: '600%',
            marginLeft: '10px'
          }}>

            <Row>
              <Col>
                <Row style={{ paddingBottom: '2%' }}>
                  <h4>Meals</h4>
                </Row>
              </Col>
            </Row>

            {mealPlanData.meals &&
              mealPlanData.meals.map((row, index) => (
                <Card key={index} style={{ margin: '10px' }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      <b>Name :</b> {row.name}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <b>Ingredients :</b> {row.ingredients.join(' ,')}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <b>Instructions :</b> {row.instructions}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <b>Size :</b> {row.size}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <b>Nutritious :</b> {row.nutritious.join(' ,')}
                    </Typography>
                  </CardContent>
                </Card>
              ))}



            <Row>
              <div
                style={{
                  padding: '3%',
                  marginBottom: '10px',
                  maxWidth: '775px',
                  border: '1px solid rgb(185 175 175)',
                }}
              >
                <Row style={{ paddingBottom: '2%' }}>
                  <h4>Comments(
                    {mealPlanData.comments && mealPlanData.comments.length}
                    )......</h4>
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
                {mealPlanData.comments &&
                  mealPlanData.comments.map((row) => (
                    <Row
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

          </Col>
        </Row>
      </div>
    </>
  );
};

export default MealPlanView;
