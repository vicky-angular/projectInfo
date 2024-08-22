import * as React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./HistoryList.css";

function HistoryList(props) {
  const historyItems = [
    {
      id: 1,
      projectName: "Project 1",
      description: "Applied on 2022-01-01",
      status: "Approved",
    },
    {
      id: 2,
      projectName: "Project 2",
      description: "Applied on 2022-01-15",
      status: "Rejected",
    },
    {
      id: 3,
      projectName: "Project 3",
      description: "Applied on 2022-02-01",
      status: "Pending",
    },
  ];

  return (
    <div>
      <h1>History</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.projectName}
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

HistoryList.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default HistoryList;
