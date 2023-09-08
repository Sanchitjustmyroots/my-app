import React, { useState } from 'react';


import { Button } from "@mui/material";
import axios from "axios";
import "../App.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { red } from "@mui/material/colors";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  location: "",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Signup = ({ history }) => {
  const [formData, setFormData] = useState(initialValues);
  const [isOpen, setOpen] = useState(false);
  const [isOtp, setOtp] = useState("");
  const [otpError, setoptError] = useState(null);
  const [formError, setformError] = useState(null);
  const [isLogin, setIsLogin] = useState(true); 
  const[email,setEmail]=useState();


  const handleClose = () => setOpen(false);

  const toggleSignUpForm = () => {
    setIsLogin(!isLogin);
    
  }; 

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post(`
      http://43.205.31.129:4040/api/web/auth/signin`, {
        phoneNumber: formData.phone,
        
       
      })
      .then((res) => {
        console.log(res);

     
       

        if (res.data.success === true) {


          setOpen(true) 

           setEmail(res.data.data.email)

          // isState(res.data.data.email)  
        
     
        } else {
          // Handle login failure, display an error message
          setformError(res.data.message);
          setFormData(initialValues);
          // You may also want to clear the form fields here
          // setFormData(initialValues);
        }
      })
      .catch((err) => {
        console.error(err);
        
      });
  };


  

  const onOtp = (e) => {
    e.preventDefault();
    console.log(email);
    axios
      .post(`http://43.205.31.129:4040/api/web/auth/verifyMobileOtp`, {
        firstName: formData.firstname,
        lastName: formData.lastname,
        phoneNumber: formData.phone,
        email: email,
        otp: isOtp,
        city: formData.location,
      })
      .then((res) => {
        // console.log("form", res);
        if (res.data.success === true) {
          if (isOtp.length > 0) { 
            
            history.push("/usersdetail");
           
          }
        } else {
          setoptError(res.data.error[0]);
        }
        console.log(res);
      });
  };

  

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://43.205.31.129:4040/api/web/auth/signup`, {
        firstName: formData.firstname,
        lastName: formData.lastname,
        phoneNumber: formData.phone,
        // address: formData.address,
        location: formData.location,
      
        email: formData.email,
      })
      .then((res) => {
        console.log(res);
        // setFormData(initialValues);

        if (res.data.success === true) {

          setOpen(true); 

         
                  // setFormData(initialValues)
          // setFormData({
          //   ...formData,
          //   [name]: value,
          // });

          // alert(res.data.message[0]);
        } else {
          setformError(res.data.message);
          
        }
      })
      .catch((err) => {
        setFormData(initialValues);
      });
  };

  return (
    <div>
      {" "}
      <div class="container">
        <div class="card">
          <div class="card-image">
            <h2 class="card-heading">
              {isLogin ? "login" : " Sign up Let us create your account"}
             
            </h2> 
          </div>
          <form onSubmit={isLogin ? onLogin : onSubmit} class="card-form"> 
          
           
            <div class="input">
             {!isLogin &&  <input
                type="text"
                id="firstname"
                class="input-field"
                placeholder='firstname'
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    firstname: e.target.value,
                  }));
                }}
                required
              /> 
             }
              {/* <label class="input-label">First Name</label>  */}
            </div>
            
            <div class="input">
            {!isLogin && <input
                type="text"
                id="lastname"
                placeholder='lastname'
                class="input-field"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    lastname: e.target.value,
                  }));
                }}
                required
              />
            }
              {/* <label class="input-label">Last Name</label> */}
            </div>
            <div class="input">
            {!isLogin && <input
                type="text"
                class="input-field"
                placeholder='email'
                id="email"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
                //value="vlockn@gmail.com"
                required
              />
            }
              {/* <label class="input-label">Email</label> */}
            </div>
            
            <div class="input">
              <input
                type="text"
                id="phoneNumber"
                class="input-field"
                placeholder='91 phone'
                maxLength={12}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }));
                }}
                required
              />
             
              {/* <label class="input-label">Phone</label> */}
            </div> 
            {!setIsLogin && <input type='text' placeholder='enter your otp '/> }

            <div class="input">
            {!isLogin && <input
                type="text"
                id="location"
                placeholder='location'
                class="input-field"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }));
                }}
                required
              />
            }
              {/* <label class="input-label">locaton</label> */}
            </div>
            <div class="action">
            

              <Button
                onClick={() => {
                  // history.push('/usersdetail');
                }}
                type="submit"
                variant="contained"
              >
                {isLogin ? "login" : " Sign up"}
              </Button>
                           
              {formError && <Typography color={red}>{formError}</Typography>}
            </div>
          </form>
          <div class="card-info">
            <p style={{ cursor: "pointer", color:"red", }} onClick={toggleSignUpForm}>
              {" "}
              {isLogin
                ? "New to my-app?  Sign-up Now"
                : " Allready registered login  now "}
            </p>
          </div>
        </div>

        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter Your Otp
            </Typography>
            <input
              type="text"
              maxLength="4"
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter your Otp"
            />

            <Button onClick={onOtp}> Submit Otp </Button>
            {otpError && <Typography sx={{color:"red"}}>{otpError}</Typography>}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Signup;
