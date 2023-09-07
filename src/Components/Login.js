import { React, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import "../App.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

  const handleClose = () => setOpen(false);

  const onOtp = (e) => {
    e.preventDefault();
    axios
      .post(`http://43.205.31.129:4040/api/web/auth/verifyMobileOtp`, {
        firstName: formData.firstname,
        lastName: formData.lastname,
        phoneNumber: formData.phone,
        email: formData.email,
        otp: isOtp,
        city: formData.location,
      })
      .then((res) => {
        if (isOtp.length > 0) {
          history.push("/usersdetail");
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
        // city: formData.city,
        // contact_name: formData.bname,
        // contact_email: formData.bemail,
        // brand_contact_number: formData.bphone,
        email: formData.email,
      })
      .then((res) => {
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
          alert(res.data.message[0]);
          setFormData(initialValues);
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
              Sign Up
              <small>Let us create your account</small>
            </h2>
          </div>
          <form onSubmit={onSubmit} class="card-form">
            <div class="input">
              <input
                type="text"
                id="firstname"
                class="input-field"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    firstname: e.target.value,
                  }));
                }}
                required
              />
              <label class="input-label">First Name</label>
            </div>
            <div class="input">
              <input
                type="text"
                id="lastname"
                class="input-field"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    lastname: e.target.value,
                  }));
                }}
                required
              />
              <label class="input-label">Last Name</label>
            </div>
            <div class="input">
              <input
                type="text"
                class="input-field"
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
              <label class="input-label">Email</label>
            </div>
            <div class="input">
              <input
                type="text"
                id="phoneNumber"
                class="input-field"
                maxLength="12"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }));
                }}
                required
              />
              <label class="input-label">Phone</label>
            </div>

            <div class="input">
              <input
                type="text"
                id="location"
                class="input-field"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }));
                }}
                required
              />
              <label class="input-label">locaton</label>
            </div>
            <div class="action">
              {/* <button  onClick={submitForm}
            type="submit"  class="action-button">Sign Up</button> */}

              {/* <Button onClick={submitForm} type="submit" class = "action-button"> Sign Up </Button> */}

              <Button
                onClick={() => {
                  // history.push('/usersdetail');
                }}
                type="submit"
                variant="contained"
              >
                Sign Up{" "}
              </Button>
            </div>
          </form>
          <div class="card-info">
            <p>
              By signing up you are agreeing to our{" "}
              <a href="#">Terms and Conditions</a>
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
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Signup;
