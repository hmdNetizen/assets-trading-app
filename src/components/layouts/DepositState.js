import React, { useState } from "react";

function DepositState({ status }) {
  // eslint-disable-next-line
  const [pendingState, set] = useState(status);

  return (
    <a
      className={
        status === "Declined" || status === "Pending"
          ? " bg-danger text-light  text-center"
          : "bg-success text-light  text-center"
      }
      href="#!"
    >
      {status === "Approved"
        ? "Approved"
        : pendingState === "Declined"
        ? "Declined"
        : "Pending"}
    </a>
  );
}

export default DepositState;
