import { memo, useEffect } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Button, Modal, Form } from "react-bootstrap";
import { patchRequest, postRequest } from "../utils/axiosRequests";

const EditProduct = ({
  product,
  setProduct,
  products,
  setProducts,
  isEditModal,
  setIsEditModal,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", product?.name);
    setValue("unitPrice", product?.unitPrice);
    setValue(
      "availableSince",
      moment(product?.availableSince).format("YYYY-MM-DD")
    );
  }, [product]);

  const onSubmit = (data) => {
    patchRequest(`products/${product?.id}`, data)
      .then((data) => {
        setIsEditModal(false);
        const objIndex = products.findIndex((item) => item.id == data.id);
        products[objIndex] = data;
        setProducts([...products]);
      })
      .catch((error) => {
        console.log("from react query error: ", error.message);
      });
  };

  return (
    <Modal show={isEditModal}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>Edit Product</Modal.Title>
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
              {...register("availableSince")}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setProduct(null);
              setIsEditModal(false);
            }}
          >
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

export default memo(EditProduct);
