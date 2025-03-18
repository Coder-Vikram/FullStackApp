import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
    const { registerUser, registerError, isRegisterLoading } = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    return (
        <div>
            <Formik
                initialValues={{ name: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    registerUser(values);
                    setSubmitting(false);
                }}
            >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
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
                                    <h2 style={{ textAlign: "center" }}>Register</h2>

                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={touched.name && !!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>

                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={touched.email && !!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>

                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={touched.password && !!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>

                                    <Button variant="primary" type="submit" disabled={isRegisterLoading}>
                                        {isRegisterLoading ? "Creating your account" : "Register"}
                                    </Button>
                                    {registerError && (
                                        <Alert variant="danger">
                                            <p>{registerError}</p>
                                        </Alert>
                                    )}
                                </Stack>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;