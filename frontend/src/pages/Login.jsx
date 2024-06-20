/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-empty-pattern */
import { Button } from '@mui/material';

import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Row, Col } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../Config/FireBaseConfig.js';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState("")
    const submitHandler = () => {

        const loginDto = {
            email,
            password
        };
        console.log(loginDto);
        axios.post('http://localhost:8080/api/v1/student/login', loginDto)
            .then(response => {
                console.log("Form submitted successfully!" + response);
                console.log(response);
                const userData = JSON.stringify(response.data);
                localStorage.setItem("UserInfo", userData);

                navigate("/");
            })
            .catch(error => {
                console.error("Error:", error.response.data);
                if (error.response.data == "Password Incorrect") {
                    toast.error("Password Incorrect", {
                        style: {
                            background: "green",
                        }
                    })
                }
                else if (error.response.data == "User not found") {
                    toast.error("You haven't sign up")
                }
            });
    }
    const googleSignUpClick = async () => {
        signInWithPopup(auth, provider).then((data) => {
            console.log(data.user.email);
            const gUser = {
                name: data.user.displayName,
                userName: data.user.email,
                email: data.user.email,
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

    return (
        <>
            <Card style={{ padding: "30px", marginLeft: "30%", marginBottom: "30%", marginRight: "30%", marginTop: "10%" }}>
                <div style={{ marginRight: "20px" }}>


                    <div style={{ marginRight: "25px", marginLeft: "20px" }}>
                        <div>
                            <Col>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="someone@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>
                            </Col>
                        </div>
                        <br />
                        <div>
                            <Col>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="email" placeholder="123ad@5" value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </div><br />
                    </div>
                    <div style={{ marginBottom: "20px", marginLeft: "30px", marginRight: "6px" }}>

                        {password == '' ? (<><Button variant="contained" fullWidth style={{ marginTop: '2%' }} onClick={submitHandler} disabled>Sign In</Button></>) : (<><Button variant="contained" fullWidth style={{ marginTop: '2%' }} onClick={submitHandler}>Login In</Button></>)}
                    </div>


                </div><div className="flex gap-2 items-center justify-center pt-5">
                    <p style={{ textAlign: "center" }}>if you don't have account ?<Button onClick={() => navigate("/register")}>Register</Button></p>

                </div>
                <Row>
                    <Col style={{ textAlign: 'center' }}>
                        <a onClick={googleSignUpClick} ><img src='/src/assets/images/social.png' width={45} style={{ cursor: 'pointer' }} /></a>
                    </Col>
                </Row>
            </Card></>
    );
};
export default Login;