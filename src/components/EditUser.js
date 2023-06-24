import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    getUser();
  }, []);


  function getUser() {
    axios.get(`http://localhost/users-api/user/${id}`).then(function (response) {
      const { id, name, email, password, phone } = response.data;
      setInputs((prevInputs) => ({
        ...prevInputs,
        id: id || "",
        name: name || "",
        email: email || "",
        password: password || "",
        phone: phone || ""
      }));
    });
  }
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost/users-api/user/${id}/edit`, inputs)
      .then(function (response) {
        console.log(response.data);
        setOpen(false);
        navigate("/");
      });
  };

  const stopEditing = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <Dialog open={open} onClose={stopEditing}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
      <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="name"
            label="Name"
            value={inputs.name}
            onChange={handleChange}
          />
          <TextField
            type="email"
            name="email"
            label="Email"
            value={inputs.email}
            onChange={handleChange}
          />
          <TextField
            type="number"
            name="phone"
            label="Phone"
            value={inputs.phone}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={stopEditing}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
