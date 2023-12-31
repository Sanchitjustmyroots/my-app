import { Typography, Grid, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axios from "axios";
import Modal from "@mui/material/Modal";
import "../App.css";
import { margin, styled } from "@mui/system";

const useStyles = styled((theme) => ({
  responsiveModalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "600px",
    bgcolor: "background.paper",
    padding: theme.spacing(4),
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
}));

const initialValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  phoneNumber: "",
  dob: "",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Users = () => {
  const [user, setUser] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [fromdata, setFormData] = useState(initialValues);
  const [currentindex, setCurrentindex] = useState(null);

  const classes = useStyles();

  const handleChange = (index) => {
    setId(index);
    setCurrentindex(index);
    setOpen(true);

    setFormData({
      firstName: user[index].firstName || "",
      lastName: user[index].lastName || "",
      userName: user[index].userName || "",
      email: user[index].email || "",
      phoneNumber: user[index].phoneNumber || "",
      dob: user[index].dob || "",
    });
  };

  const handleClose = () => setOpen(false);

  const handleonChange = (data) => {
    const phoneNumberPattern = /^\d{12}$/;

    if (!phoneNumberPattern.test(fromdata.phoneNumber)) {
      alert("Phone number must have exactly 12 digits.");
      return;
    }

    axios
      .put(`http://43.205.31.129:4040/api/admin/user/update`, {
        firstName: fromdata.firstName,
        lastName: fromdata.lastName,
        userName: fromdata.userName,
        email: fromdata.email,
        phoneNumber: fromdata.phoneNumber,
        DOB: fromdata.dob,
      })
      .then((res) => {
        if (res.data.success === true) {
          const temp = [...user];
          //   const tempobject= {...temp[index]}
          temp[currentindex] = { ...data, ...fromdata };
          //   console.log(temp)
          //   console.log(currentindex)
          setUser(temp);
          setOpen(false);
          //   console.log({fromdata})
        } else {
          alert(res.message[0]);
          setFormData(initialValues);
        }
      })
      .catch((err) => {
        setFormData(initialValues);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://43.205.31.129:4040/api/customer?perPage=50&pageNo=1&phoneNumber=91&firstName=&lastName=&email=`
      )
      .then((result) => {
        console.log(result.data.data.users);
        setUser(result.data.data.users);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "grey" }}>
      <h1>User's Details </h1>
      <Grid container spacing={2}>
        {user.map((data, index) => {
          return (
            <>
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    height: 250,
                    display: "flex",
                    flexDirection: "column", // To align content vertically
                    justifyContent: "space-between", // To distribute content evenly
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
                    borderRadius: "10px", // Rounded corners
                    padding: "16px", // Adjust padding as needed
                    background: "white",
                  }}
                >
                  {" "}
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      FirstName:{data.firstName}{" "}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      LastName: {data.lastName}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      Username: {data.userName}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      PhoneNumber: {data.phoneNumber}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      DateofBirth: {data.dob}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      Email: {data.email}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      ReferCode: {data.referCode}
                    </Typography>
                    <Button
                      onClick={() => handleChange(index)}
                      size="small"
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  {user[id] && (
                    <>
                      <Typography variant="h6" component="h2">
                        Edit users details{" "}
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        First Name
                      </Typography>
                      <input
                        type="text"
                        class="input-field"
                        value={fromdata.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...fromdata,
                            firstName: e.target.value,
                          })
                        }
                      />
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Last Name
                      </Typography>
                      <input
                        type="text"
                        class="input-field"
                        value={fromdata.lastName}
                        onChange={(e) =>
                          setFormData({ ...fromdata, lastName: e.target.value })
                        }
                      />
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        User Name
                      </Typography>
                      <input
                        type="text"
                        class="input-field"
                        value={fromdata.userName}
                        onChange={(e) =>
                          setFormData({ ...fromdata, userName: e.target.value })
                        }
                      />
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Phone Number
                      </Typography>
                      <input
                        type="text"
                        class="input-field"
                        maxLength={12}
                        value={fromdata.phoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...fromdata,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Date-of-Birth
                      </Typography>
                      <input
                        type="date"
                        class="input-field"
                        value={fromdata.dob}
                        onChange={(e) =>
                          setFormData({ ...fromdata, dob: e.target.value })
                        }
                      />
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Email
                      </Typography>
                      <input
                        type="text"
                        class="input-field"
                        value={fromdata.email}
                        onChange={(e) =>
                          setFormData({ ...fromdata, email: e.target.value })
                        }
                      />
                      <br />

                      <Button
                        sx={{ margin: "20px", alignItems: "center" }}
                        variant="contained"
                        onClick={() => handleonChange(data)}
                      >
                        {" "}
                        Update{" "}
                      </Button>
                    </>
                  )}
                </Box>
              </Modal>
            </>
          );
        })}
      </Grid>

      {/* <Grid  item xs={2} >  */}
    </div>
  );
};

export default Users;
