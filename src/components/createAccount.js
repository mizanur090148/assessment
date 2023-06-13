import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { postRequest } from "../utils/axiosRequests";
import { loginSuccess } from "../store/slices/authSlice";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    postRequest("auth/register", data)
      .then((data) => {
        sessionStorage.setItem("token", JSON.stringify(data.token));
        dispatch(loginSuccess(data));
        navigate("/home");
      })
      .catch((error) => {
        console.log("from react query error: ", error.message);
      });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          {...register("email", {
            required: "Please Enter Your Email!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please Enter A Valid Email!",
            },
          })}
          type="text"
          id="email"
        />
        {errors.email?.message && (
          <p className="errorMsg">{errors.email?.message}</p>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          {...register("password", {
            required: "Please Enter Your Password",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long!",
            },
          })}
        />
        {errors.password?.message && (
          <div className="errorMsg">{errors.password?.message}</div>
        )}
        <span>Password must be 8 characters long.</span>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
        <Form.Control
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            validate: (match) => {
              const password = getValues("password");
              return match === password || "Passwords should match!";
            },
          })}
        />
        <p className="errorMsg">{errors.confirmPassword?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form.Group>
    </Form>
  );
};

export default CreateAccount;
