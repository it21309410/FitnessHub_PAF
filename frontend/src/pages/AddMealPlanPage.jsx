import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { CardContent } from '@mui/material';
import { Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddMealPlanPageStyle from '../styles/AddMealPlanPageStyle.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { storage } from '../Config/FireBaseConfig.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { v4 } from 'uuid';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AddMealPlanPage = () => {
  const [userName, setUserName] = useState('Janul');
  const [title, setTitle] = useState('');
  const [mealtype, setMealType] = useState('');
  
  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);
  console.log(storedUserInfo);
  
  const navigate = useNavigate();

  const [mealCards, setMealCards] = useState([
    {
      name: '',
      ingredients: [],
      instructions: '',
      size: '',
      nutritious: [],
    },
  ]);

  useEffect(() => {
    // Initially, display one card
    setMealCards([
      {
        name: '',
        ingredients: [],
        instructions: '',
        size: '',
        nutritious: [],
      },
    ]);
  }, []);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    event.preventDefault();
    const selectedImage = event.target.files[0];

    setImage(selectedImage);
    console.log('Image:', image);

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(selectedImage);
  };
  const handleImageClick = () => {
    // Trigger the file input dialog when image is clicked
    document.getElementById('imageInput').click();
  };

  const uploadMealImage = async () => {
    console.log('Image:', image);
    return new Promise((resolve, reject) => {
      if (image == null) {
        resolve(null); // Resolve with null if no image is provided
      } else {
        const MealplanImageRef = ref(
          storage,
          `${userName}/mealImages/${image.name + v4()}`
        );

        uploadBytes(MealplanImageRef, image)
          .then(() => {
            getDownloadURL(MealplanImageRef)
              .then((downloadURL) => {
                console.log('Download URL:', downloadURL);
                alert('Image uploaded. Download URL: ' + downloadURL);
                resolve(downloadURL);
              })
              .catch((error) => {
                // Error getting download URL
                reject(error);
              });
          })
          .catch((error) => {
            // Error uploading image
            reject(error);
          });
      }
    });
  };

  const handleInputChange = (e, field, index) => {
    const { value } = e.target;
    setMealCards((prevCards) => {
      const updatedCards = [...prevCards];

      if (field === 'ingredients' || field === 'nutritious') {
        // Split comma-separated values into an array
        updatedCards[index][field] = value.split(',');
      } else {
        updatedCards[index][field] = value;
      }
      return updatedCards;
    });
  };

  const handleAddMealCard = (e) => {
    e.preventDefault();
    setMealCards((prevCards) => [
      ...prevCards,
      {
        name: '',
        ingredients: [],
        instructions: '',
        size: '',
        nutritious: [],
      },
    ]);
  };

  const handleRemoveMealCard = (index, e) => {
    e.preventDefault();
    setMealCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards.splice(index, 1);
      return updatedCards;
    });
  };
  console.log(storedUserInfo._id);
  const submitHandler = async () => {
    const mealPlanImgDownURL = await uploadMealImage();

    const newmealPlanData = {
      userId: storedUserInfo._id,
      title,
      mealtype,
      meals: mealCards,
      mealsPicURL: mealPlanImgDownURL,
    };

    console.log(newmealPlanData);
    axios
      .post('http://localhost:8080/api/user/mealplan', newmealPlanData)
      .then((response) => {
        console.log('Form submitted successfully!' + response);
        toast.success('Successfully MealPlan Added!');
        navigate('/profile');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  return (
    <div className={AddMealPlanPageStyle.bodyDiv}>

      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '3%',
          marginRight: '15%',
        }}
      >
        <Row>
          <div
            style={{
              boxShadow: '0px 2px 3px rgba(0, 0, 0, 1.5)',
              backgroundColor: '#42a5f5',
              marginBottom:'50px'
            }}
          >
            <center>
              <label
                style={{
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                  fontSize: '30px',
                  color: '#fff',
                }}
              >
                Add Meal Plans
              </label>
            </center>
          </div>
        </Row>
        
        <Row>
          <Col xs={6} style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Row className={AddMealPlanPageStyle.rows}>
              <TextField
                id="standard-basic"
                label="Meal Title"
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Row>

            <Row className={AddMealPlanPageStyle.rows}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Meal Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={mealtype}
                  onChange={(e) => setMealType(e.target.value)}
                  label="Age"
                  required
                >
                  <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="Vegan">Vegan</MenuItem>
                  <MenuItem value="Keto">Keto</MenuItem>
                </Select>
              </FormControl>
            </Row>
          </Col>

          <Col>
            <Row
              className={AddMealPlanPageStyle.rows}
              style={{ height: '93%' }}
            >
              <Row style={{ paddingLeft: '15%' }}>
                <form>
                  <label>
                    <div style={{ textAlign: 'center' }}>
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            width: '325px',
                            height: '200px',
                            margin: '0% 0px 0px 13%',
                          }}
                        />
                      ) : (
                        <img
                          src={'/src/assets/images/addPhoto.png'}
                          alt="Preview"
                          style={{
                            width: '300px',
                            height: '180px',
                            margin: '0% 0px 0px 13%',
                          }}
                        />
                      )}
                    </div>
                  </label>
                </form>
              </Row>

              <Row
                style={{ paddingLeft: '44%', width: '360px', paddingTop: '2%' }}
              >
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  onChange={handleImageChange}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Row>
            </Row>
          </Col>
        </Row>

        <br />
        
        <Row>
          <Col>
            <Card
              variant="outlined"
              style={{
                padding: '0px',
                borderRadius: '2px',
                marginRight: '10%',
                height:'50px'
              
              }}
              className={AddMealPlanPageStyle.card}
            >
              <h3 className={AddMealPlanPageStyle.header}>Add Meals</h3>
            </Card>
          </Col>
        </Row>

        <Row
          style={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'left',
            gap: '10px', // Adjust this value to control the distance between cards
          }}
        >
          {mealCards.map((meal, index) => (
            <Col key={index} style={{ width: '100%', maxWidth: '18rem' }}>
              <div>
                <Card
                  style={{ width: '18rem' }}
                  className={AddMealPlanPageStyle.meal_card}
                >
                  <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <TextField
                      id="standard-basic"
                      label="MealName"
                      variant="outlined"
                      value={meal.name}
                      onChange={(e) => handleInputChange(e, 'name', index)}
                      style={{ width: '100%', marginBottom:'5%' }}
                      required
                    />
                    
                    <TextField
                      id="standard-basic"
                      label="Enter Ingredients"
                      variant="outlined"
                      value={meal.ingredients}
                      onChange={(e) =>
                        handleInputChange(e, 'ingredients', index)
                      }
                      style={{ width: '100%',marginBottom:'5%' }}
                      multiline
                      rows={4}
                      required
                    />
                    <TextField
                      id="standard-basic"
                      label="Enter Instructions"
                      variant="outlined"
                      value={meal.instructions}
                      onChange={(e) =>
                        handleInputChange(e, 'instructions', index)
                      }
                      style={{ width: '100%',marginBottom:'5%' }}
                      multiline
                      rows={4}
                      required
                    />
                    <TextField
                      id="standard-basic"
                      label="Enter positon size"
                      variant="outlined"
                      value={meal.size}
                      onChange={(e) => handleInputChange(e, 'size', index)}
                      style={{ width: '100%',marginBottom:'5%' }}
                      required
                    />
                    <TextField
                      id="standard-basic"
                      label="Enter Nutritious"
                      variant="outlined"
                      value={meal.nutritious}
                      onChange={(e) =>
                        handleInputChange(e, 'nutritious', index)
                      }
                      style={{ width: '100%',marginBottom:'5%' }}
                      required
                    />
                    <br />
                    <br />
                    <center>
                      <Button
                        variant="outlined"
                        href="#outlined-buttons"
                        onClick={(e) => handleRemoveMealCard(index, e)}
                      >
                        Remove
                      </Button>
                    </center>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        <Row style={{ marginTop: '20px' }}>
          <Col>
            <button
              className={AddMealPlanPageStyle.btn_add}
              onClick={(e) => handleAddMealCard(e)}
            >
              ADD
            </button>
          </Col>
        </Row>

        <Row>
          <center>
            <Button type="submit" variant="contained" onClick={submitHandler}>
              Create
            </Button>
          </center>
        </Row>
      </div>
    </div>
  );
};

export default AddMealPlanPage;