import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Modal, Box, Typography, Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import "./Projects.css";
import { db } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { addDoc } from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, updateDoc } from 'firebase/firestore';


async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "Projects"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  console.log(data)
  return data;
}

const saveToDB = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "Projects"), {
      ...data,
      
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", data);
  }
};

const updateStatus = async (documentId, newStatus) => {
  try {
    // Get a reference to the document in the 'orders' collection
    const docRef = doc(db, "Projects", documentId);

    // Update the 'status' field
    await updateDoc(docRef, {
      ...newStatus
    });

    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

const Projects = () => {
  const [userData, setUserData] = useState({name: 'Sahil', Unit: 'DX', id: '6481564'});
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // set to true for admin, false for non-admin
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setProjects(data);
    }
    fetchData();
  }, []);
  console.log("FETCH PROJECT WHICH YOU GOT---", projects);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Project Name", width: 150 },
    { field: "skill", headerName: "Technology", width: 150 },
    { field: "domain", headerName: "Domain", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "postedBy", headerName: "Posted By", width: 100 },
    {
      field: "viewInfo",
      headerName: "View Info",
      width: 170,
      renderCell: (params) => (<>
      <Button
          variant="contained"
          size="small"
          onClick={() => handleViewInfoClick(params.row)}
        >
          View Info
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleViewInfoClick(params.row)}
        >
          <DeleteIcon />
        </Button>
      </>
        
      ),
    },
  ];



  const handleViewInfoClick = (data) => {
    console.log("THE ROW DATA---->", data);
    setSelectedRow(data);
    setFormData({ ...data });
    setOpenModal(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = projects.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.unit.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      row.postedBy.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  });
console.log(filteredRows)
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e, field) => {
    if (field === "primarySkill" || field === "secondarySkill") {
      const values = e.target.value;
      setFormData({ ...formData, [field]: values.join(",") });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleSaveChanges = () => {
    // API call to save changes
    console.log("Changes saved!", formData);
    handleCloseModal();
    saveToDB({...formData,
      status: 'OPEN',
      postedBy: userData.name
    })
  };
  return (
    <div className="projects-container">
      <div className="search-bar-container">
        <TextField
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by project name, skills, domain, or technology"
          variant="outlined"
          fullWidth
        />
      </div>
      {isAdmin && < >
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            setOpenModal(true)
          }}
        >
          Publish
        </Button>
      </>}
      <div className="table-container">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 10,
            boxShadow: 10,
            width: 600,
            maxHeight: 500,
            overflowY: "auto",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Project Details
          </Typography>
          {true && (
            <IconButton onClick={() => setIsEditMode(true)}>
              <EditIcon />
            </IconButton>
          )}

          {isEditMode ? (
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Project Name:
                  </Typography>
                  <TextField
                    value={formData.name}
                    onChange={(e) => {handleInputChange(e, "name")}}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Domain:
                  </Typography>
                  <TextField
                    value={formData.domain}
                    onChange={(e) => handleInputChange(e, "domain")}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Unit:
                  </Typography>
                  <TextField
                    value={formData.unit}
                    onChange={(e) => {handleInputChange(e, "unit")}}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Technology:
                  </Typography>
                  <TextField
                    value={formData.skill}
                    onChange={(e) => handleInputChange(e, "skill")}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Description:
                  </Typography>
                  <TextField
                    value={formData.description}
                    onChange={(e) => {handleInputChange(e, "description")}}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, ml: 2 }}
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Project Name:
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {selectedRow && selectedRow.projectName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Posted By:
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {selectedRow && selectedRow.postedBy}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Domain:
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {selectedRow && selectedRow.domain}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Technology:
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {selectedRow && selectedRow.technology}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Primary Skills:
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {selectedRow && selectedRow.primarySkills}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Secondary Skills:
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {selectedRow && selectedRow.secondarySkills}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    technology:
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {selectedRow && selectedRow.skill}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, float: "right" }}
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Projects;
