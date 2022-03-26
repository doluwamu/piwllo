import React from "react";

const Alert = ({ bgColor, color, iconName, message }) => {
  return (
    <div
      style={{
        backgroundColor: bgColor ? bgColor : "green",
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
          className={iconName}
          style={{
            padding: "3px",
            marginRight: "10px",
            borderRadius: "40%",
            backgroundColor: "white",
            color: color ? color : "green",
            fontSize: "14px",
          }}
        ></i>
        {message}
      </p>
    </div>
  );
};

export default Alert;
