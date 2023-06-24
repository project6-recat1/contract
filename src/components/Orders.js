import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

const API_URL = 'http://localhost/react/mycontracts';

export default function Orders() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setContracts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Title>Recent Contracts</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Expire Date</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Employee</TableCell>
            <TableCell>Status</TableCell>
            {/* <TableCell>Attachment</TableCell> */}
            <TableCell align="right">Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.user_id}</TableCell>
              <TableCell>{row.start_date}</TableCell>
              <TableCell>{row.expire_date}</TableCell>
              <TableCell>{row.service_id}</TableCell>
              <TableCell>{row.employee_id}</TableCell>
              <TableCell>{row.status}</TableCell>
              {/* <TableCell>{row.attachment}</TableCell> */}
              <TableCell align="right">{row.total_cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={event => event.preventDefault()} sx={{ mt: 3 }}>
        See more Contracts
      </Link>
    </React.Fragment>
  );
}
