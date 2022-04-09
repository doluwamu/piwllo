import React, { useState } from "react";
// import { Alert } from "react-bootstrap";
// import { useDispatch } from "react-redux";

const AlertMsg = ({
  message,
  isError = false,
  messageVisible = null,
  setMessageVisible = null,
}) => {
  const [open, setOpen] = useState(true);

  const closeAlert = () => {
    setOpen(false);
    setMessageVisible(false);
  };

  return (
    <div
      id="alert"
      style={{
        display: open ? "block" : "none",
        backgroundColor: isError ? "red" : "green",
        // color: color ? color : "white",
        width: "90%",
        margin: "0 auto",
        borderRadius: "4px",
        marginTop: "10px",
        padding: "0 5px",
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: "14px",
          padding: "5px 0",
          lineHeight: "20px",
          color: "white",
        }}
      >
        <i
          className={isError ? "fa-solid fa-xmark" : "fa-solid fa-check"}
          style={{
            padding: "3px",
            marginRight: "10px",
            borderRadius: "40%",
            backgroundColor: "white",
            color: isError ? "red" : "green",
            fontSize: "14px",
          }}
        ></i>
        {message}
        <b onClick={closeAlert} style={{ cursor: "pointer" }}>
          x
        </b>
      </p>
    </div>
  );
};

export default AlertMsg;

// <>
//   {close && (
//     <Alert
//       variant={isError ? "danger" : "success"}
//       closeLabel="x"
//       onClose={() => setClose(true)}
//     >
//       {message}
//     </Alert>
//   )}
// </>
