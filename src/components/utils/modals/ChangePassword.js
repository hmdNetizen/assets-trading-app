import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form, Button } from "react-bootstrap";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import useFormInput from "../../hooks/useFormInput";
import Spinner from "./../Spinner";

const ChangePassword = ({ setChangePassword }) => {
  const [formData, handleFormData] = useFormInput({
    currentPassword: "",
    newPassword: "",
  });

  const { changeUserPassword } = useActions();

  const { currentPassword, newPassword } = formData;
  const { webData } = useSelector((state) => state.web);
  const { requestError, isRequestLoading, successMsg } = useSelector(
    (state) => state.auth
  );

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword) {
      message.error("Old or New Password cannot be empty");
      return;
    }

    if (newPassword.length < 8) {
      message.error("Password cannot be less than 8 characters");
      return;
    }

    changeUserPassword({
      current_password: currentPassword,
      new_password: newPassword,
    });
  };

  return (
    <div className="withdraw-modal personal-modal">
      <div className="header">Change Password</div>
      <div className="dash-row">
        <div className="content">
          <div className="billing-form text-left">
            {!isRequestLoading && requestError && !successMsg && (
              <div className="text-center mb-2" style={{ color: "#da4830" }}>
                Your current password does not match with the password you
                provided.
              </div>
            )}

            {!isRequestLoading && !requestError && successMsg && (
              <div className="text-center mb-2" style={{ color: "#54ac40" }}>
                {successMsg}
              </div>
            )}
            <Row>
              <Col xs={12}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Current password"
                    name="currentPassword"
                    id="currentPassword"
                    defaultValue={currentPassword}
                    onChange={handleFormData}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="New Password"
                    name="newPassword"
                    id="newPassword"
                    value={newPassword}
                    onChange={handleFormData}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-right">
              <Button
                style={{ background: webData.yourMainColor }}
                onClick={handleChangePassword}
                variant="primary"
                className="mb-4 w-100 mt-auto"
              >
                {isRequestLoading ? (
                  <Spinner type="TailSpin" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <span className="close" onClick={() => setChangePassword(false)}>
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

ChangePassword.propTypes = {
  setChangePassword: PropTypes.bool.isRequired,
};

export default ChangePassword;
