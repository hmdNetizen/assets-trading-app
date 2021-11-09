import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import { message } from "antd";

const ApproveDoc = ({ status }) => {
  const { ManagerdeclineVerify, managerApproveVerify } = useActions();

  const { error } = useSelector((state) => state.profile);
  const { userId } = status;
  // eslint-disable-next-line
  const [modalstate, setmodalstate] = useState(false);
  const [accept, setAccept] = useState("Accept");
  const [decline, setDecline] = useState("Decline");
  console.log(modalstate);
  const handleapproveVerify = async () => {
    if (error) {
      message.error("Identity Approval Was Not Successful");
    } else {
      const details = {
        id: userId,
        message: "Document was succesffully approved",
      };
      await managerApproveVerify(details);
      setAccept(null);

      setDecline(false);
      message.success("Successfully Approved");
    }
  };
  const handledeclineVerify = async () => {
    if (error) {
      message.error("Identity Approval Was Not Successful");
    } else {
      const details = {
        id: userId,
        message: "Document was succesffully approved",
      };
      await ManagerdeclineVerify(details);

      message.success("Successfully Declined");
    }
  };

  // console.log(modalstate)
  return (
    <>
      {status.status === "Pending" ? (
        <div className="d-flex flex-column" style={{ fontSize: "8px" }}>
          <div onClick={handleapproveVerify}>
            <a className="text-light text-center p-0 bg-success mb-1" href="#!">
              {accept ? accept : null}
            </a>
          </div>
          <div
            onClick={
              // () => setmodalstate(true)
              handledeclineVerify
            }
            // {}
          >
            <a className="text-light text-center bg-danger mb-0" href="#!">
              {status ? decline : null}
            </a>
          </div>
        </div>
      ) : status.status === "Declined" || status.status === "Pending" ? (
        <a
          className="text-light text-center p-0 bg-success mb-1"
          href="#!"
          onClick={handleapproveVerify}
        >
          {accept}
        </a>
      ) : null}

      {/* <DeclineModal
        status={status}
        modalstate={modalstate}
        setModalState={setmodalstate}
        handledeclineVerify={handledeclineVerify}
      /> */}
    </>
  );
};

export default React.memo(ApproveDoc);
//
