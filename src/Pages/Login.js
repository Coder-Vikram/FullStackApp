import React, { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
    const { loginUser, loginError, isLoginLoading } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const values = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        loginUser(values);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Row
                    style={{
                        height: "100vh",
                        justifyContent: "center",
                        paddingTop: "10%",
                    }}
                >
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2 style={{ textAlign: "center" }}>Login</h2>

                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                            <Form.Control.Feedback type="invalid">
                                Invalid email
                            </Form.Control.Feedback>

                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                            <Form.Control.Feedback type="invalid">
                                Invalid password
                            </Form.Control.Feedback>

                            <Button variant="primary" type="submit" disabled={isLoginLoading}>
                                {isLoginLoading ? "Logging in..." : "Login"}
                            </Button>
                            {loginError && (
                                <Alert variant="danger">
                                    <p>{loginError}</p>
                                </Alert>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Login;