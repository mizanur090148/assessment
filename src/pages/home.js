import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailed } from "../store/slices/authSlice";
import ProductsList from "../components/productList";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(loginFailed({}));
    navigate("/");
  };

  return (
    <main className="content mt-4">
      <div className="container-fluid p-0">
        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <span>Home</span>
            <span className="logout" onClick={() => logout()}>
              Logout
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-12 col-xxl-12">
            <div className="card flex-fill">
              <div className="card-body">
                <ProductsList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
