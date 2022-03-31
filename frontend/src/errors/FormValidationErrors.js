import React from "react";

const FormValidationErrors = ({ error, message }) => {
  return (
    <p
      style={{
        display: error ? "block" : "none",
        color: "red",
      }}
    >
      *{message ? message : "This field is required"}!
    </p>
  );
};

export default FormValidationErrors;
