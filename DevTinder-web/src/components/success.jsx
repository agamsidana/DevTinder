import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {

    const navigate=useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/feed')
        },3000);
    },[])


  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          }}
        >
          ✅
        </div>

        <h1
          style={{
            color: "#28a745",
            marginBottom: "10px",
          }}
        >
          Payment Successful
        </h1>

        <p
          style={{
            color: "#555",
            marginBottom: "25px",
          }}
        >
          Thank you! Your payment has been processed successfully.
        </p>
      </div>
    </div>
  );
};

export default Success;

