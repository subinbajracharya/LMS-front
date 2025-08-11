import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { resendEmail, verifyEmail } from "../features/users/usersApi";

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);

  const handleOnClick = async () => {
    setIsLoading(true);
    // alert("VERIFY");
    const token = urlParams.get("t");
    console.log(token);
    const email = urlParams.get("email");
    console.log(email);
    let data = await verifyEmail(token, email);

    toast[data.status ? "success" : "error"](data.message);

    setIsLoading(false);

    if (data.status) {
      navigate("/login");
    }
  };

  const handleOnResend = async () => {
    setIsLoading(true);
    const email = urlParams.get("email");

    let data = await resendEmail(email);

    toast[data.status ? "success" : "error"](data.message);

    setIsLoading(false);
  };

  useEffect(() => {
    handleOnClick();
  }, []);

  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded-5">
        <Col lg={6}>
          <div>
            <h1>Verification</h1>
            {isLoading ? (
              <Button variant="primary" disabled>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>{" "}
                Loading...
              </Button>
            ) : (
              <>
                <Button
                  variant="primary"
                  onClick={handleOnClick}
                  className="me-2"
                >
                  Verify Email
                </Button>
                <Button variant="primary" onClick={handleOnResend}>
                  Resend Token
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyEmail;
