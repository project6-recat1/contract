import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const UserList = ({ openEditUserPopup }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
      getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await axios.get('http://localhost/users-api/users/');
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost/users-api/user/${id}/delete`);
      console.log(response.data);
      await getUsers();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <React.Fragment>
      <Title>Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
              <Link
                className="btn btn-info"
                to={`/user/${user.id}/edit`}
                style={{ marginRight: "10px" }}
                onClick={() => openEditUserPopup()}
              >
                Edit
              </Link>

                <IconButton onClick={() => deleteUser(user.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default UserList;
