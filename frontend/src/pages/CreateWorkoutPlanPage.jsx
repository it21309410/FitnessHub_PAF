import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CreateWorkoutPlanPageStyle from '../styles/CreateWorkoutPlanPageStyle.module.css';
import { storage } from '../Config/FireBaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import AllWorkoutPlanPage from './AllWorkoutPlanPage';

const AddWorkoutPlanPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [workoutLocation, setWorkoutLocation] = useState('');
  const [level, setLevel] = useState('');
  const [userName, setUserName] = useState('Cha');
  const Navigate = useNavigate();

  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);

  const [exercises, setExercises] = useState([
    {
      name: '',
      description: '',
      targetAreas: '',
      equipments: '',
      sets: '',
      reps: '',
    },
  ]);

  useEffect(() => {
    setExercises([
      {
        name: '',
        description: '',
        targetAreas: '',
        equipments: '',
        sets: '',
        reps: '',
      },
    ]);
  }, []);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    event.preventDefault();
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(selectedImage);
  };

  const uploadWorkoutImage = async () => {
    return new Promise((resolve, reject) => {
      if (image == null) {
        resolve(null);
      } else {
        const workoutPlanImageRef = ref(
          storage,
          `${userName}/workoutImages/${image.name + v4()}`
        );

        uploadBytes(workoutPlanImageRef, image)
          .then(() => {
            getDownloadURL(workoutPlanImageRef)
              .then((downloadURL) => {
                console.log('Download URL:', downloadURL);
                alert('Image uploaded. Download URL: ' + downloadURL);
                resolve(downloadURL);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    setExercises((prevCards) => [
      ...prevCards,
      {
        name: '',
        description: '',
        targetAreas: '',
        equipments: '',
        sets: '',
        reps: '',
      },
    ]);
  };

  const handleRemoveExercise = (index, e) => {
    e.preventDefault();
    setExercises((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards.splice(index, 1);
      return updatedCards;
    });
  };

  const handleInputChange = (e, key, index) => {
    const { value } = e.target;
    setExercises((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index][key] = value;
      return updatedCards;
    });
  };

  const submitHandler = async () => {
    const workoutPlanImgDownURL = await uploadWorkoutImage();

    const newWorkoutPlanData = {
      name,
      description,
      workoutLocation,
      level,
      exercises,
      createrId :storedUserInfo._id,
      workoutPicURL: workoutPlanImgDownURL,
    };

    console.log(newWorkoutPlanData);
    axios
      .post('http://localhost:8080/api/v1/workplans', newWorkoutPlanData)
      .then((response) => {
        console.log('Form submitted successfully!' + response);
        toast.success('Successfully Workout Plan Added!');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handleCancel = () => {
    // Navigate to the desired page, for example, back to the AllWorkoutPlanPage
    Navigate('/workoutplan/all');
  };

  return (
    <div className={CreateWorkoutPlanPageStyle.contact}>
      <Container>
        <Row>
          
          
          <div className={CreateWorkoutPlanPageStyle.contact_col}>
          <Row>
            <div className={CreateWorkoutPlanPageStyle.rop}>
            ADD WORKOUT PLAN
            </div>
          </Row>
          <Row>
          <Col>
            <Row >
              <div className={CreateWorkoutPlanPageStyle.dis}>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter workout plan name"
                required
              />
              </div>
            </Row>
            <Row>
            <div className={CreateWorkoutPlanPageStyle.dis}>
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter workout plan description"
                required
              />
              </div>
            </Row>
            <Row>
            <div className={CreateWorkoutPlanPageStyle.dis}>
              <label>Workout Location:</label>
              <input
                type="text"
                value={workoutLocation}
                onChange={(e) => setWorkoutLocation(e.target.value)}
                placeholder="Enter workout location"
              
              />
              </div>
            </Row>
            <Row>
            <div className={CreateWorkoutPlanPageStyle.dis}>
              <label>Level:</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              </div>
            </Row>
            </Col>
            <Col>
            <Row>
              <Col>
                <div style={{marginLeft:"45%",marginTop:"50px"}}>
                  <label htmlFor="imageInput">
                   
                    <div
                      style={{
                        maxWidth: '140px',
                        textAlign: 'center',
                        borderRadius: '50%',
                        cursor: 'pointer',
                      }}
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                          }}
                        />
                      ) : (
                        <img
                          src={'/src/assets/images/fitness.png'}
                          alt="Preview"
                          style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                          }}
                        />
                      )}
                    </div>
                    <input
                      id="imageInput"
                      type="file"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                     <p style={{textAlign:"center"}}>Add image</p>
                  </label>
                </div>
              </Col>
            </Row>
            </Col>
            </Row>
            <Row>
            <label>Exersice:</label>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Target Areas</th>
                    <th>Equipments</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((workout, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={workout.name}
                          onChange={(e) => handleInputChange(e, 'name', index)}
                          placeholder="Enter workout plan name"
                        />
                      </td>
                      <td>
                        <textarea
                          value={workout.description}
                          onChange={(e) =>
                            handleInputChange(e, 'description', index)
                          }
                          rows="6"
                          placeholder="Enter workout plan description"
                        ></textarea>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={workout.targetAreas}
                          onChange={(e) =>
                            handleInputChange(e, 'targetAreas', index)
                          }
                          placeholder="Enter targetAreas"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={workout.equipments}
                          onChange={(e) =>
                            handleInputChange(e, 'equipments', index)
                          }
                          placeholder="Enter workout plan equipments"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={workout.sets}
                          onChange={(e) => handleInputChange(e, 'sets', index)}
                          placeholder="Enter workout plan sets"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={workout.reps}
                          onChange={(e) => handleInputChange(e, 'reps', index)}
                          placeholder="Enter workout plan reps"
                        />
                      </td>
                      <td>
                        <button onClick={(e) => handleRemoveExercise(index, e)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Row>
            <Row >
              <Col>
                <button onClick={handleAddExercise}>
                  Add Exercise
                </button>
              </Col>
            </Row>
          
           
            <Row>
              <center>
                <Button type="submit" variant="contained" onClick={submitHandler}>
                  Create
                </Button>
                <> </>
                <Button type="submit" variant="contained" onClick={handleCancel}>
                  Cancel
                </Button>
              </center>
            </Row>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default AddWorkoutPlanPage;  


