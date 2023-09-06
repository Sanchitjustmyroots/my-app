import "./App.css";
import { useState } from "react";
import { Button } from "@mui/material";
// import axios from 'axios';

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phoneNumber: "",
  location: "",
};





function App() {
  const [formData, setFormData] = useState(initialValues);

  const submitForm = event => {
    event.preventDefault();
    console.log(formData);
  };

  // const onSubmit = e => {
  //   e.preventDefault();
  //   axios
  //     .post(`${currentUrl}/api/admin/brand_contact_details`, {
  //       brand_name: formData.name,
  //       fssai_no: formData.fssai,
  //       contact_no: formData.phone,
  //       address: formData.address,
  //       state: formData.state,
  //       city: formData.city,
  //       contact_name: formData.bname,
  //       contact_email: formData.bemail,
  //       brand_contact_number: formData.bphone,
  //       email: formData.email,
  //     })
  //     .then(res => {
  //       setFormData(initialValues);

  //       if (res.data.success === true) {
  //         // setFormData(initialValues)
  //         // setFormData({
  //         //   ...formData,
  //         //   [name]: value,
  //         // });

  //         alert(res.data.message[0]);
  //       } else {
  //         alert(res.data.message[0]);
  //         setFormData(initialValues);
  //       }
  //     })
  //     .catch(err => {
  //       setFormData(initialValues);
  //     });
  // };

  return (
    <div className="App">
      <div class="container">
        <div class="card">
          <div class="card-image">
            <h2 class="card-heading">
              Sign Up 
              <small>Let us create your account</small>
            </h2>
          </div>
          <form  class="card-form">
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
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
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

                <Button type="submit" variant="contained">Sign Up </Button>
            </div>
          </form>
          <div class="card-info">
            <p>
              By signing up you are agreeing to our{" "}
              <a href="#">Terms and Conditions</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
