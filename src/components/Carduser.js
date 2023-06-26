import React, { useEffect, useState } from "react";
import "../styles/user.css";
import Auth from "../images/Auth.jpg";
import axios from 'axios';
import { Link } from "react-router-dom";
import {  Grid,   Card,   CardContent,  Button,  Typography,  ThemeProvider,} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";


const theme = createTheme();

const Usercard = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  // const [services, setServices] = useState([]);
// const [selectedService, setSelectedService] = useState("");

  const [newContractData, setNewContractData] = useState({
    service: "",
    type: "",
    cost: "",
  });
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewContractData({
      service: "",
      type: "",
      cost: "",
    });
  };
  const calculateTotalCost = (selectedServiceId, subscriptionType) => {
  const selectedService = services.find((service) => service.id === selectedServiceId);
  if (selectedService) {
    // Perform the calculation based on the selected service and subscription type
    // Replace the example logic with your own calculation
    let cost = selectedService.cost_3month;
    switch (subscriptionType) {
      case "one_month":
        cost *= 1;
        break;
      case "two_month":
        cost *= 2;
        break;
      case "three_month":
        cost *= 3;
        break;
      default:
        cost = 0;
    }
    return cost;
  }
  return 0;
};

  const handleSubmit = () => {
    // Perform any validation or data processing here
    
    // Call the API to create the new contract
    // You can use axios or any other library for making the API call
    setNewContractData({ ...newContractData, service: selectedService });

    // Example using axios:
    axios.post("http://localhost/brief6/contracts/", newContractData)
      .then(response => {
        console.log("New contract created successfully");
        // Perform any additional actions after creating the contract
        handleCloseModal();
      })
      .catch(error => {
        console.error("Failed to create new contract:", error);
        // Handle the error case appropriately
      });
  };
  useEffect(() => {
    fetch("http://localhost/brief6/services/")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);
   
  useEffect(() => {
    fetch("http://localhost/brief6/contracts/")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (service) => {
    setSelectedService(service);
  };

  const getDaysRemaining = (expire_date) => {
    const currentDate = new Date();
    const expirationDate = new Date(expire_date);
    const diffTime = Math.abs(expirationDate - currentDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getColorClass = (expire_date) => {
    const days = getDaysRemaining(expire_date);
    if (days <= 3) return "danger";
    if (days <= 10) return "warning";
    if (days > 10) return "light";
    return "";
  };
  var userId = parseInt(sessionStorage.getItem("user_id")); // Convert userId to the appropriate data type
  const filteredContracts = services.filter(
    (contract) => contract.user_id === userId
  );

  return (
    <ThemeProvider theme={theme}>
      <div
        className="container"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
      <Button variant="contained" onClick={handleOpenModal}>Create new contract</Button>
        <div className="main" style={{ marginTop: "25px" }}>
          {filteredContracts.length > 0 ? (
            <Grid container spacing={2} className="mycard">
              {filteredContracts.map((item) =>
                item.status === 1 ? (
                  <Grid item key={item.id} xs={12} sm={6} md={4}>
                    <Card className={`card ${getColorClass(item.expire_date)}`}>
                      <CardContent>
                        <Typography variant="h5">
                          Cost: {item.total_cost}
                        </Typography>
                        <Typography variant="h6">
                          {item.service_name}
                        </Typography>
                      </CardContent>
                      <div className="icon-box">
                        <Button
                          variant="contained"
                          onClick={() => handleClick(item)}
                        >
                          Details
                        </Button>
                      </div>
                    </Card>
                  </Grid>
                ) : null
              )}
            </Grid>
          ) : (
            <Typography variant="h5">
              You don't have any contracts yet
            </Typography>
          )}
        </div>

        {selectedService && (
          <div className="modal">
            <div className="modalContent">
              <Typography variant="h4">Details</Typography>
              <Typography>
                Service Name: {selectedService.service_name}
              </Typography>
              <Typography>
                Employee Name: {selectedService.emplyee_name}
              </Typography>
              <Typography>Cost: {selectedService.total_cost}</Typography>
              <Typography>Start Date: {selectedService.start_date}</Typography>
              <Typography>
                Expire Date: {selectedService.expire_date}
              </Typography>
              <Button onClick={() => setSelectedService(null)}>Close</Button>
            </div>
          </div>
        )}
         <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Create New Contract</DialogTitle>
        <DialogContent>
  <FormControl fullWidth margin="normal">
    <InputLabel id="service-label">Service</InputLabel>
    <Select
      labelId="service-label"
      id="service"
      value={selectedService}
      onChange={(e) => setSelectedService(e.target.value)}
    >
      {services.map((service) => (
        <MenuItem key={service.id} value={service.id}>
          {service.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <FormControl fullWidth margin="normal">
    <InputLabel id="subscription-label">Subscription Type</InputLabel>
    <Select
      labelId="subscription-label"
      id="subscription"
      value={newContractData.subscription}
      onChange={(e) => setNewContractData({ ...newContractData, subscription: e.target.value })}
    >
      <MenuItem value="one_month">One Month</MenuItem>
      <MenuItem value="two_month">Two Months</MenuItem>
      <MenuItem value="three_month">Three Months</MenuItem>
    </Select>
  </FormControl>

  <InputLabel>Total Cost:</InputLabel>
  <Typography>{calculateTotalCost(selectedService, newContractData.subscription)}</Typography>

  {/* Add other form fields for employee, startDate, and expireDate */}
</DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default Usercard;
