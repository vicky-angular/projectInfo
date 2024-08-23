import React, { useEffect, useState } from "react";
import { TextField, Button, } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import "./HistoryList.css";
import { db } from "../../firebaseConfig";
import { getDocs, collection,  query, where, } from "firebase/firestore";
import { doc, updateDoc } from 'firebase/firestore';

async function fetchDataFromFirestore(table) {
  const usersRef = collection(db, table);

  // Create a query with multiple conditions
  let q = query(
    usersRef,
    where("status", "!=", "WITHDRAW") 
  );
 
  // Execute the query
  const querySnapshot = await getDocs(q);

  const data = [];
  querySnapshot?.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  console.log(data)
  return data;
}

const updateStatus = async (documentId, newStatus) => {
  try {
    // Get a reference to the document in the 'orders' collection
    const docRef = doc(db, "Applications", documentId);

    // Update the 'status' field
    await updateDoc(docRef, {
      ...newStatus
    });

    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};


const HistoryList = () => {
  const isAdmin = false; // set to true for admin, false for non-admin

  const userData = isAdmin ? {name: 'Sahil', Unit: 'DX', id: '6481564', }: {
    name: 'Rohit', Unit: 'DX', id: '845845', skill: 'React, Node'
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);
  async function fetchData() {
    // const userIdForApps = isAdmin ? userData.id : userData.id;
    const applications = await fetchDataFromFirestore("Applications", userData.id);
   
    setApplications(applications)
  }
  useEffect(() => {
    fetchData();
  }, []);
  // console.log("FETCH PROJECT WHICH YOU GOT---", projects);

  const columns = [
    { field: "projectName", headerName: "Project Name", width: 200 },
    { field: "applicantName", headerName: "Applicant", width: 200 },
    { field: "skill", headerName: "Skill", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "viewInfo",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (<>
      {!isAdmin && (
          <Button
          data-testid={`test-action-btn-${params.id}`}
          variant="contained"
          size="small"
          onClick={() => {
            console.log(params)
            updateStatus(params.id, {status: 'WITHDRAW'})
            setTimeout(() => {
            fetchData()
              
            });
          }}
        >
         Withdraw
        </Button>
      )}
        {isAdmin && (<>
          <Button
          variant="contained"
          size="small"
          onClick={() => {
            updateStatus(params.id, {status: 'ACCEPTED'})}}
        >
         Accept
        </Button>
          <Button
          variant="contained"
          size="small"
          onClick={() => {updateStatus(params.id, {status: 'REJECTED'})}}
        >
         Reject
        </Button></>)}
      </>
      ),
    },
  ];




  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = applications.filter((row) => {
    return (
      row.projectName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      row.skill?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      row.applicant?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      row.status?.toLowerCase()?.includes(searchTerm.toLocaleLowerCase())
    );
  });

  return (
    <div className="projects-container" data-testid="test-history">
      <div className="search-bar-container">
        <TextField
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by project name, skills, Applicant, or status"
          variant="outlined"
          fullWidth
        />
      </div>
      
      <div className="table-container">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
};


HistoryList.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default HistoryList;
