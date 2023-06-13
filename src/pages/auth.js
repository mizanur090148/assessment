import { Tab, Nav, Button } from "react-bootstrap";
import Login from "../components/login";
import CreateAccount from "../components/createAccount";

const Auth = () => {
  return (
    <main className="content mt-4">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12 col-lg-12 col-xxl-12">
            <div className="card flex-fill">
              <div className="card-body appointment-card-body">
                <Tab.Container id="left-tabs-example" defaultActiveKey="login">
                  <Nav>
                    <Nav.Item>
                      <Nav.Link eventKey="login">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="createAccount">
                        Create Account
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="login">
                      <Login />
                    </Tab.Pane>
                    <Tab.Pane eventKey="createAccount">
                      <CreateAccount />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
