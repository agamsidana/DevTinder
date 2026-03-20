import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

    useEffect(()=>{
          setTimeout(()=>{
              navigate('/feed')
          },3000);
      },[]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f0f0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "400px",
        }}
      >
        <div
          style={{
            fontSize: "60px",
            marginBottom: "15px",
            color: "#dc3545",
          }}
        >
          ❌
        </div>

        <h1
          style={{
            color: "#dc3545",
            marginBottom: "10px",
          }}
        >
          Payment Failed
        </h1>

        <p
          style={{
            color: "#555",
            marginBottom: "25px",
          }}
        >
          Oops! Something went wrong with your payment.
        </p>
      </div>
    </div>
  );
};

export default Failure;