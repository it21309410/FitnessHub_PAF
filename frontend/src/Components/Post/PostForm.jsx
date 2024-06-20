/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Button from '@mui/material/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { storage } from '../../Config/FireBaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

const PostForm = () => {

  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);
  console.log(storedUserInfo);
  
  const [description, setDescription] = useState('');
  const [imageUrl, setImage] = useState(null);
  //const [userId, setUserId]=
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    event.preventDefault();
    const selectedImage = event.target.files[0];

    setImage(selectedImage);
    console.log('Image:', imageUrl);

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(selectedImage);
  };

  const uploadPostImage = async () => {
    console.log('Image:', imageUrl);
    return new Promise((resolve, reject) => {
      if (imageUrl == null) {
        resolve(null); // Resolve with null if no image is provided
      } else {
        const MealplanImageRef = ref(
          storage,
          `postImages/${imageUrl.name + v4()}`
        );

        uploadBytes(MealplanImageRef, imageUrl)
          .then(() => {
            getDownloadURL(MealplanImageRef)
              .then((downloadURL) => {
                console.log('Download URL:', downloadURL);
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

  const submitHandler = async () => {
    if (!description) {
      toast.error('Please enter a description.');
      return;
    }

    if (!imageUrl) {
      toast.error('Please select an image.');
      return;
    }

    const postImgDownURL = await uploadPostImage();

    const newPostData = {
      description: description,
      userId:storedUserInfo._id,
      userName: storedUserInfo.userName,
      email: storedUserInfo.email,
      imageUrl: postImgDownURL,
    };

    console.log(newPostData);
    axios
      .post('http://localhost:8080/api/v1/post', newPostData)
      .then((response) => {
        console.log('Form submitted successfully!' + response);
        toast.success('Successfully Post Added!');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Error submitting the form.');
      });
  };

  return (
    <Container style={{ paddingLeft: '30px', paddingRight: '40px' }}>
      <Row>
        <div>
          <Row>
            
            <input
              type="text"
              name="name"
              value={description}
              placeholder="What's on your mind?"
              onChange={(e) => setDescription(e.target.value)}
              style={{ paddingTop: '10px', paddingBottom: '60px', paddingRight: '100px' }}
              required
            />
          </Row>
          
          <Row>
            <div>
              <Row style={{ marginTop: '10px' }}>
                <Col>
                  <div>
                    <label>Photo</label><br />
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
                          <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                            <img
                              src={imagePreview}
                              alt="Preview"
                              style={{
                                width: '300px',
                                height: '200px',
                                borderRadius: '20px',
                              }}
                            />
                          </div>
                        ) : (
                          <img
                            src={'/src/assets/images/gallery.png'}
                            alt="Preview"
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '10px',
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
                    </label>
                  </div>
                </Col>
              </Row>
            </div>
          </Row>

          <div>
            <center>
              <Button
                type="submit"
                variant="contained"
                onClick={submitHandler}
              >
                Create
              </Button>
            </center>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default PostForm;
