import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../api/api';
import { useAuth } from '../api/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import "../components/css.css";

const Login = () => {

    const { setCredentials, auth } = useAuth();
    const navigate = useNavigate();

    const [isValidated, setIsValidated] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (auth.username && auth.password) {
        navigate('/home');
        }
    }, [auth, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const username = form.username.value;
        const password = form.password.value;

        try {
        const response = await api.get('', {
            auth: {
            username: username,
            password: password,
            },
        });
        if (response.status === 200) {
            setCredentials(username, password, rememberMe);
            setIsValidated(true);
            navigate('/home');
        } else {
            setIsValidated(false);
        }
        } catch (error) {
        console.error(`Error: ${error}`);
        setIsValidated(false);
        }
    };

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    return (
        <div className="main-container">
        <Container fluid className="main-content">
        <Row className="justify-content-center mt-5">
            <Col xs={12} sm={2} md={1} lg={4}></Col>
            <Col xs={12} sm={8} md={10} lg={4}>
            <Card className="shadow p-3 mb-5 bg-white rounded">
                <Card.Body>
                <Card.Title className="text-center mb-4"><h2>LOGIN</h2></Card.Title>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 mt-3" controlId="validationCustomUsername">
                    <Form.Label>Username:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                        required
                        isValid={isValidated === true}
                        isInvalid={isValidated === false}
                        name="username"
                        type="text"
                        placeholder="Username"
                        />
                        <Form.Control.Feedback type="invalid">
                        Please insert a valid username.
                        </Form.Control.Feedback>
                    </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationCustomPassword">
                    <Form.Label>Password:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                        required
                        isValid={isValidated === true}
                        isInvalid={isValidated === false}
                        name="password"
                        type="password"
                        placeholder="Password"
                        />
                        <Form.Control.Feedback type="invalid">
                        Please insert a valid password.
                        </Form.Control.Feedback>
                    </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="rememberMeCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Remember me"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                        />
                    </Form.Group>
                    <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    </div>
                </Form>
                <Row className='mt-4'>
                    <Col>
                        <h5>Read-only user:</h5>
                        <h6 className="lead">Username: <strong>user</strong><br/>Password: <strong>test123</strong></h6>
                    </Col>
                    <Col>
                        <h5>Editor user:</h5>
                        <h6 className="lead">Username: <strong>admin</strong><br/>Password: <strong>test123</strong></h6>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
            </Col>
            <Col xs={12} sm={2} md={1} lg={4}></Col>
        </Row>
        </Container>
        <Footer />
        </div>
    );
};

export default Login;