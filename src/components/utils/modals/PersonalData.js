import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { countryList as profileCountryList } from "../../../helpers/dataset/countryList";

const PersonalData = ({ web, setPersonalData }) => {
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.profile);

  const { updateUserProfile } = useActions();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    currency: "",
    city: "",
    address: "",
    permanentAddress: "",
  });

  const {
    firstName,
    lastName,
    country,
    city,
    currency,
    address,
    permanentAddress,
  } = formData;

  const handleUpdateProfile = () => {
    if (!firstName || !lastName) {
      message.error("First Name or Last Name cannot be empty");
      return;
    }
    if (error) {
      message.error("problems updating profile");
      return;
    }

    updateUserProfile({
      first_name: firstName,
      last_name: lastName,
      country,
      cur: currency,
      address,
      city,
      permanent_address: permanentAddress,
    });

    message.success("Profile was successfully updated");

    setPersonalData(false);
  };

  const handleUserInfo = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name ? user.first_name : "",
        lastName: user.last_name ? user.last_name : "",
        currency: user.cur ? user.cur : "",
        country: user.country ? user.country : "",
        city: user.city ? user.city : "",
        address: user.address ? user.address : "",
        permanent_address: user.permanent_address ? user.permanent_address : "",
      });
    }
  }, [user]);

  return (
    <div className="withdraw-modal personal-modal">
      <div className="header">User Personal Data</div>
      <div className="dash-row">
        <div className="content">
          <div className="billing-form text-left">
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Your First Name"
                    name="firstName"
                    id="firstName"
                    defaultValue={firstName}
                    onChange={handleUserInfo}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Your Last Name"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={handleUserInfo}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Your Address"
                    name="address"
                    id="address"
                    value={address}
                    onChange={handleUserInfo}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    value={city}
                    onChange={handleUserInfo}
                    type="text"
                    placeholder="City"
                    name="city"
                    id="city"
                  />
                </Form.Group>
              </Col>
            </Row>
            <p style={{ color: "white" }}>Country</p>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="country"
                    value={country}
                    onChange={handleUserInfo}
                  >
                    <option value="Select Country">Select Country</option>
                    {profileCountryList.map((country) => (
                      <option>{country}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="currency"
                    value={currency}
                    onChange={handleUserInfo}
                  >
                    <option value="$">Select Currency</option>

                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Control
                    value={permanentAddress}
                    onChange={handleUserInfo}
                    type="text"
                    placeholder="Permananent Address"
                    name="permanentAddress"
                    id="permanentAddress"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-right">
              <Button
                style={{ background: web.yourMainColor }}
                onClick={handleUpdateProfile}
                variant="primary"
                className="mb-4"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      <span className="close" onClick={() => setPersonalData(false)}>
        <svg id="lnr-cross " viewBox="0 0 1024 1024">
          <title>close</title>
          <path
            className="path1"
            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
          />
        </svg>
      </span>{" "}
    </div>
  );
};

PersonalData.propTypes = {
  web: PropTypes.object,
  setPersonalData: PropTypes.func.isRequired,
};

export default PersonalData;
