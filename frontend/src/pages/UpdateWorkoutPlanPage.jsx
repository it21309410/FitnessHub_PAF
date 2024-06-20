import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import CreateWorkoutPlanPageStyle from '../styles/CreateWorkoutPlanPageStyle.module.css';
import { storage } from '../Config/FireBaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const UpdateWorkoutPlanPage = () => {
  const { workoutId } = useParams();
  const navigate = useNavigate();

  // State variables
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [workoutLocation, setWorkoutLocation] = useState('');
  const [level, setLevel] = useState('');
  const [userName, setUserName] = useState('Cha');
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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (workoutId) {
      loadData();
    }
  }, [workoutId]);

  const loadData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/workplans/byId/${workoutId}`
      );
      if (res.status === 200) {
        const workoutPlanData = res.data;
        setName(workoutPlanData.name);
        setDescription(workoutPlanData.description);
        setWorkoutLocation(workoutPlanData.workoutLocation);
        setLevel(workoutPlanData.level);
        setExercises(workoutPlanData.exercises);
        setImagePreview(workoutPlanData.workoutPicURL);
      } else {
        toast.error('Failed to fetch workout plan data');
      }
    } catch (err) {
      toast.error(err.message || 'Error fetching workout plan data');
    }
  };

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

  const handleImageClick = () => {
    // Trigger the file input dialog when image is clicked
    document.getElementById('imageInput').click();
  };

  const uploadMealImage = async () => {
    return new Promise((resolve, reject) => {
      if (!image) {
        resolve(null); // Resolve with null if no image is provided
      } else {
        const workoutPlanImageRef = ref(
          storage,
          `${userName}/workoutImages/${image.name + uuidv4()}`
        );

        uploadBytes(workoutPlanImageRef, image)
          .then(() => {
            getDownloadURL(workoutPlanImageRef)
              .then((downloadURL) => {
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

  const handleAddExercise = () => {
    setExercises((prevExercises) => [
      ...prevExercises,
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

  const handleRemoveExercise = (index) => {
    setExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      updatedExercises.splice(index, 1);
      return updatedExercises;
    });
  };

  const handleInputChange = (e, key, index) => {
    const { value } = e.target;
    setExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      updatedExercises[index][key] = value;
      return updatedExercises;
    });
  };

  const submitHandler = async () => {
    const workoutPlanImgDownURL = await uploadMealImage();

    const updatedWorkoutPlanData = {
      name,
      description,
      workoutLocation,
      level,
      exercises,
      createrId: '6624fdced319e33794fce0a3',
      workoutPicURL: workoutPlanImgDownURL,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/workplans/${workoutId}`,
        updatedWorkoutPlanData
      );
      toast.success('Workout Plan updated successfully!');
      navigate(`/workoutPlan/All`);
    } catch (error) {
      console.error('Error updating workout plan:', error);
      toast.error('Error updating workout plan');
    }
  };

  return (
    <div className={CreateWorkoutPlanPageStyle.contact}>
      <Container>
        <Row>
          <div className={CreateWorkoutPlanPageStyle.contact_col}>
            <Row>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter workout plan name"
              />
            </Row>
            <Row>
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter workout plan description"
              />
            </Row>
            <Row>
              <label>Workout Location:</label>
              <input
                type="text"
                value={workoutLocation}
                onChange={(e) => setWorkoutLocation(e.target.value)}
                placeholder="Enter workout location"
              />
            </Row>
            <Row>
              <label>Level:</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </Row>
            <Row>
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
                          placeholder="Enter workout name"
                        />
                      </td>
                      <td>
                        <textarea
                          value={workout.description}
                          onChange={(e) =>
                            handleInputChange(e, 'description', index)
                          }
                          rows="6"
                          placeholder="Enter workout description"
                        ></textarea>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={workout.targetAreas}
                          onChange={(e) =>
                            handleInputChange(e, 'targetAreas', index)
                          }
                          placeholder="Enter target areas"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={workout.equipments}
                          onChange={(e) =>
                            handleInputChange(e, 'equipments', index)
                          }
                          placeholder="Enter equipment"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={workout.sets}
                          onChange={(e) => handleInputChange(e, 'sets', index)}
                          placeholder="Enter sets"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={workout.reps}
                          onChange={(e) => handleInputChange(e, 'reps', index)}
                          placeholder="Enter reps"
                        />
                      </td>
                      <td>
                        <button onClick={() => handleRemoveExercise(index)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Row>
            <Row>
              <Col>
                <button onClick={handleAddExercise}>
                  Add Exercise
                </button>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <label htmlFor="imageInput">
                    <div
                      style={{
                        maxWidth: '140px',
                        textAlign: 'center',
                        borderRadius: '50%',
                        cursor: 'pointer',
                      }}
                      onClick={handleImageClick}
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
                          alt="Default"
                          style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                          }}
                        />
                      )}
                    </div>
                    <input
                      id="imageInput"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </Col>
            </Row>
            <Row>
              <center>
                <Button type="submit" variant="contained" onClick={submitHandler}>
                  Update
                </Button>
              </center>
            </Row>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateWorkoutPlanPage;

