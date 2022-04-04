import React from "react";

const Alert = ({ message, isError = false }) => {
  return (
    <div
      style={{
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
      </p>
    </div>
  );
};

export default Alert;
