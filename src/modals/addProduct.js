import { useForm } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import { postRequest } from "../utils/axiosRequests";

const AddProduct = ({ products, setProducts, isAddModal, setIsAddModal }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    postRequest("products", data)
      .then((data) => {
        reset();
        setProducts([...products, data]);
        setIsAddModal(false);
      })
      .catch((error) => {
        console.log("from react query error: ", error.message);
      });
  };

  return (
    <Modal show={isAddModal}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              autoFocus
              {...register("name", {
                required: true,
              })}
            />
            {errors?.name && errors?.name?.type === "required" && (
              <p className="errorMsg">This field is required</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter unit price"
              {...register("unitPrice", {
                required: true,
              })}
            />
            {errors?.unitPrice && errors?.unitPrice?.type === "required" && (
              <p className="errorMsg">This field is required</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Available Since</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter available since"
              {...register("availableSince", {
                required: true,
              })}
            />
            {errors?.availableSince &&
              errors?.availableSince?.type === "required" && (
                <p className="errorMsg">This field is required</p>
              )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddProduct;
