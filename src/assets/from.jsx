import React, { useEffect, useState } from "react";
import "./Headless.css"


const Headless = () => {
  const [OTPlessSignin, setOTPlessSignin] = useState(null);
  useEffect(() => {
    initializeSDK();
      }, []);

  const initializeSDK = () => {
    window.otpless = (otplessUser) => {
      console.log(otplessUser);
    };

    setOTPlessSignin(new window.OTPless(window.otpless));
  };

  const phoneAuth = async () => {
    const countryCode = document.getElementById("country-code-input").value;
    const phoneNumber = document.getElementById("mobile-input").value;

    const res = await OTPlessSignin.initiate({
      channel: "PHONE",
      phone: phoneNumber,
      countryCode: countryCode,
      deliveryChannel: ['PHONE']
    });

    console.log(res);
  };

  const verifyOTP = async () => {
    console.log("Verifying OTP...");

    if (!OTPlessSignin) {
      console.error("OTPlessSignin is not initialized");
      return;
    }

    const phno = document.getElementById("mobile-input").value;
    const otp = document.getElementById("otp-input").value;

    console.log("Phone Number:", phno);
    console.log("OTP:", otp);

    try {
      const res = await OTPlessSignin.verify({
        channel: "PHONE",
        phone: phno,
        otp: otp,
        countryCode: "+91",
      });

      console.log("Verification Response:", res);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <>
      <div
        className="headless"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div id="mobile-section">
          <input id="country-code-input" placeholder="Country Code" />
          <input id="mobile-input" placeholder="Enter mobile number" />
          <button
            style={{
              margin: "0px 10px",
              padding: "12px 24px",
              borderRadius: "5px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background-color 0.3s",
              boxShadow: "0px 2px 3px 0px",
            }}
            onClick={phoneAuth}
          >
            Request OTP
          </button>
        </div>
        <div id="otp-section">
          <input id="otp-input" placeholder="Enter OTP" />
        </div>
        <button
          style={{
            margin: "0px 10px",
            padding: "12px 24px",
            borderRadius: "5px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
            boxShadow: "0px 2px 3px 0px",
          }}
          onClick={verifyOTP}
        >
          Verify OTP
        </button>
      </div>
    </>
  );
};

export default Headless;
