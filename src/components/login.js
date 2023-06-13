import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { postRequest } from "../utils/axiosRequests";
import { loginSuccess } from "../store/slices/authSlice";

const Login = () => {
  const [authError, setAuthError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    postRequest("auth/login", data)
      .then((data) => {
        sessionStorage.setItem("token", JSON.stringify(data.token));
        dispatch(loginSuccess(data));
        navigate("/home");
      })
      .catch((error) => {
        setAuthError(error.message);
      });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <span className="errorMsg">{authError}</span>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="text"
          id="email"
          {...register("email", {
            required: "Please Enter Your Email!",
          })}
        />
        <p className="errorMsg">{errors.email?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword5"
          {...register("password", {
            required: "Please Enter Your password!",
          })}
        />
        <p className="errorMsg">{errors.password?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Login;
