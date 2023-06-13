import { useState, useEffect } from "react";
import { useGetRequest } from "../hooks/useGetRequest";
import { useDeleteRequest } from "../hooks/useDeleteRequest";
import { availableSinceDate } from "../utils/helpers";
import LoadMore from "./loadMore";
import { Button, Table, Row, Col, Form } from "react-bootstrap";
import ProductAddModal from "../modals/addProduct";
import ProductEditModal from "../modals/editProduct";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheckAllIds, setIsCheckAllIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const perPage = 5;

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheckAllIds(products.map((item) => item.id));
    if (isCheckAll) {
      setIsCheckAllIds([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheckAllIds([...isCheckAllIds, id]);
    if (!checked) {
      setIsCheckAllIds(isCheckAllIds.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  const { isLoading: isLoading, refetch: getProducts } = useGetRequest(
    "getProductList",
    `products?page=${currentPage}&perPage=${perPage}`,
    (data) => {
      if (currentPage > 1) {
        setProducts([...products, ...data.data]);
      } else {
        setProducts(data.data);
        setTotalItem(data.total);
      }
    },
    (e) => {
      console.log(e);
    }
  );

  const { isLoading: isDeleteLoading, mutate: deleteProduct } =
    useDeleteRequest(
      `products/${isCheckAllIds}`,
      (data) => {
        setProducts(
          products.filter((item) => !isCheckAllIds.includes(item.id))
        );
      },
      (e) => {
        console.log(e);
      }
    );

  const editProduct = (product) => {
    setProduct({ ...product });
    setIsEditModal(true);
  };

  return (
    <>
      <Row className="mt-2 mb-2">
        <Col>
          <Button size="sm" onClick={() => setIsAddModal(true)}>
            Add New
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <Form.Check
                type={`checkbox`}
                label="Product Name"
                name="selectAll"
                id="selectAll"
                onClick={(e) => handleSelectAll(e)}
                isCheckAllIds={isCheckAll}
              />
            </th>
            <th>Unit Price</th>
            <th>Available Since</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product, key) => (
              <tr key={product.id}>
                <td width="10%">{++key}</td>
                <td>
                  <Form.Check
                    inline
                    type={`checkbox`}
                    name={product?.name}
                    id={product.id}
                    onClick={(e) => handleClick(e)}
                    checked={isCheckAllIds.includes(product.id)}
                  />
                  <span
                    className="product-name"
                    onClick={() => editProduct(product)}
                  >
                    {product.name}
                  </span>
                </td>
                <td>{product.unitPrice}</td>
                <td>{availableSinceDate(product?.availableSince)}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <LoadMore
            currentPage={currentPage}
            totalItem={totalItem}
            perPage={perPage}
            currentPageAction={setCurrentPage}
          />
          {isCheckAllIds?.length > 0 && (
            <Button
              size="sm"
              className="mt-2"
              variant="danger"
              onClick={() => deleteProduct()}
            >
              Delete
            </Button>
          )}
        </tfoot>
      </Table>
      <ProductAddModal
        products={products}
        setProducts={setProducts}
        isAddModal={isAddModal}
        setIsAddModal={setIsAddModal}
      />
      <ProductEditModal
        product={product}
        setProduct={setProduct}
        products={products}
        setProducts={setProducts}
        isEditModal={isEditModal}
        setIsEditModal={setIsEditModal}
      />
    </>
  );
};

export default ProductsList;
