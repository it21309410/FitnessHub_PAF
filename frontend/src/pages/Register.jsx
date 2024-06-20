/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Button, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { Form } from 'formik';
import * as Yup from "yup";
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { registerUserAction } from '../Redux/Auth/auth.action';
import { Card } from 'react-bootstrap';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { Box,  FormControl } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { auth, provider } from '../Config/FireBaseConfig.js';
import { signInWithPopup } from 'firebase/auth';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [profileImageURL, setProfileImageURL] = useState("");
    const [userType, setUserType] = useState("User");
    const [medical, setMedical] = useState("");
    const [goal, setGoal] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch=useDispatch();

    const navigate =useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowCPassword = () => setShowCPassword((show) => !show);

    const handleMouseDownCPassword = (event) => {
        event.preventDefault();
    };
    
   

    const googleSignUpClick = async () => {
        signInWithPopup(auth, provider).then((data) => {
            console.log(data.user.email);
            const gUser = {
                name: data.user.email,
                userName: data.user.email,
                email: data.user.email
            };

            axios.post('http://localhost:8080/api/v1/student/googleSignUp', gUser)
                .then(response => {
                    toast.success("Successfully Loged in.");
                    setIsLoading(false)
                    const userData = JSON.stringify(response.data);
                    localStorage.setItem("UserInfo", userData);
                    navigate("/");
                    
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        })
    }


    const submitHandler = async () => {

        setIsLoading(true)

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

       

        if (!emailPattern.test(email)) {
            toast.error("provide a valid email");
            setIsLoading(false)
            return
        }

        if ((firstName == '') || (lastName == '') || (userName === '') || (email === '') || (age === null) || (gender === '')) {
            toast.error("Fill required fields");
            setIsLoading(false)
        }
        else {
            const user = {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                age: age,
                gender: gender,
                weight: weight,
                goal: goal,
                medical: medical,
                height: height,
                password: password,
                userType: userType,
            };
            console.log(user);
            axios.post('http://localhost:8080/api/v1/student/register', user)
                .then(response => {
                    toast.success("Successfully Registered.");
                    setIsLoading(false)
                    navigate("/login");
                })
                .catch(error => {
                    console.error("Error:", error);
                    if (error.response.data == "Username already exists") {
                        toast.error("User name already exist!");
                    }
                    if (error.response.data == "Email already exists") {
                        toast.error("Email already exists!");
                    }

                });
        }
    }


    return (
        <>
        <Card style={{padding:"30px",marginLeft:"30%",marginBottom:"50%",marginRight:"30%",marginTop:"3%"}}>
            <div style={{ marginRight: "20px" ,marginLeft: "15px"}}>
                
                    
                        <div style={{ marginRight: "20px" }}>
                        <Row><Col>
                                            <Box
                                                component="form"
                                                noValidate
                                                autoComplete="off"
                                            >

                                                <TextField label="First Name" variant="outlined" margin="normal" size='small'
                                                    value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth required />
                                            </Box>
                                        </Col>
                                        <Col>
                                            <Box
                                                component="form"
                                                noValidate
                                                autoComplete="off"
                                            >

                                                <TextField label="Last Name" variant="outlined" margin="normal" size='small'
                                                    value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth required />
                                            </Box>
                                        </Col>
                                        </Row>
                            <div>
                            <Box
                                            component="form"
                                            noValidate
                                            autoComplete="off"
                                        >

                                            <TextField label="UserName" variant="outlined" margin="normal" size='small'
                                                value={userName} onChange={(e) => setUserName(e.target.value)} fullWidth required />
                                        </Box>
                            </div>
                           <div>
                           <Box
                                                component="form"
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField label="Email" variant="outlined" margin="normal" size='small'
                                                    value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
                                            </Box>
                           </div>
                            <Row>
                                <Col>
                                <div>
                                <Box
                                            component="form"
                                            noValidate
                                            autoComplete="off"
                                        >

                                            <TextField label="Age" variant="outlined" margin="normal" size='small'
                                                value={age} onChange={(e) => setAge(e.target.value)} fullWidth required />
                                        </Box>
                            </div>
                            <div>
                            <Box
                                            component="form"
                                            noValidate
                                            autoComplete="off"
                                        >

                                            <TextField label="Height" variant="outlined" margin="normal" size='small'
                                                value={height} onChange={(e) => setHeight(e.target.value)} fullWidth required />
                                        </Box>
                            </div>
                            </Col>
                            <Col>
                             <div>
                             <Box
                                            component="form"
                                            noValidate
                                            autoComplete="off"
                                        >

                                            <TextField label="Weight" variant="outlined" margin="normal" size='small'
                                                value={weight} onChange={(e) => setWeight(e.target.value)} fullWidth required />
                                        </Box>
                                        </div>
                            <div>
                            <Box
                                            component="form"
                                            noValidate
                                            autoComplete="off"
                                        >

                                            <TextField label="Goal" variant="outlined" margin="normal" size='small'
                                                value={goal} onChange={(e) => setGoal(e.target.value)} fullWidth required />
                                        </Box>
                                </div>
                            </Col>
                            </Row>
                            
                           
                            <div>
                            <Box
                                            component="form"
                                            noValidate
                                            autoComplete="off"
                                        >

                                            <TextField label="Medical Status ('eg:- Healthy')" variant="outlined" margin="normal" size='small'
                                                value={medical} onChange={(e) => setMedical(e.target.value)} fullWidth required />
                                        </Box>
                                </div>
                            <Col>
                                    <FormControl variant="outlined" size='small' margin="normal" fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FormControl>
                                </Col>
                                <Col>
                                    <FormControl variant="outlined" size='small' margin="normal" fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-cpassword">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-cpassword"
                                            type={showCPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowCPassword}
                                                        onMouseDown={handleMouseDownCPassword}
                                                        edge="end"
                                                    >
                                                        {showCPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Confirm Password"
                                            value={cpassword}
                                            onChange={(e) => setCPassword(e.target.value)}
                                        />
                                    </FormControl>
                                </Col>
                            <div style={{ marginBottom: "20px", marginLeft: "17px" }}>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </div>
                        </div>
                       <Row>
                        {password != cpassword ? (
                                <>
                                    <Button variant="contained" fullWidth style={{ marginTop: '2%' }} disabled>Sign Up</Button>
                                </>) : (
                                <>
                                    <Button variant="contained" fullWidth style={{ marginTop: '2%' }} onClick={submitHandler} >Sign Up</Button>
                                </>)}
                                </Row>

                   



                
            </div>
            <div className="flex gap-2 items-center justify-center pt-5">
            <p style={{textAlign:"center"}}>if you already have account ?<Button onClick={()=> navigate("/login")}>Login</Button></p>
                
            </div>
            <Row>
                                <Col><hr /></Col>
                                <Col style={{ textAlign: 'center' }}><p style={{ fontStyle: 'italic' }}>Or Sign Up Using</p></Col>
                                <Col><hr /></Col>
                            </Row>
                            <Row>
                                <Col style={{ textAlign: 'center' }}>
                                    <a onClick={googleSignUpClick} ><img src='/src/assets/images/social.png' width={45} style={{cursor: 'pointer'}}/></a>
                                </Col>
                            </Row>
            </Card></>
    );
};
export default Register;