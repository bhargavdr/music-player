import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import OtpInput from 'react-otp-input';

const Login = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [login, setLogin] = useState(true);
  const [otp, setOtp] = useState('');
  const [requestId, setRequestId] = useState('');
  const [token, setToken] = useState('');

  const sendOTP = async () => {
    try {
      const response = await fetch(
        'https://dev.api.goongoonalo.com/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      setRequestId(data.requestId);
      setLogin(false);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await fetch(
        'https://dev.api.goongoonalo.com/v1/auth/verify_otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
            requestId: requestId,
            otp: otp,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setToken(data.token);
        alert('Verification successful!');
        console.log(token);
        onLogin();
      } else {
        alert('Verification failed. Please enter the correct OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Verification failed. Please enter the correct OTP.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login) {
      if (phoneNumber) {
        sendOTP();
      } else {
        alert('Please enter a phone number');
      }
    } else {
      if (otp.length === 4) {
        verifyOTP();
      } else {
        alert('Please enter the complete OTP');
      }
    }
  };

  return (
    <div className="login">
      {login ? (<div>
        <h1>Sign In</h1>
        <p>
          Please enter your mobile number to login. We will send an OTP to
          verify your number.
        </p>
        <form onSubmit={handleSubmit}>
          <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            defaultCountry="IN"
            international
            countryCallingCodeEditable={false}
            className="Phone"
          />
          <button type="submit">Sign In</button>
        </form>
      </div>)
      :
      (<div>
        <h1>OTP Verification</h1>
        <p>
          We have sent an OTP to {phoneNumber}. Please enter the code received
          to verify.
        </p>
        <form onSubmit={handleSubmit}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            containerStyle="custom-otp-container"
            inputStyle="custom-otp-input"
            isInputNum={true}
            separator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <button type="submit">Verify</button>
        </form>
        <div className="anchorContainer">
          <span
            onClick={() => {
              alert('OTP RESENT');
              sendOTP();
            }}
          >
            Resend OTP
          </span>
          <span onClick={() => setLogin(true)}>Use another Number</span>
        </div>
      </div>)}
    </div>
  );
};

export default Login;
