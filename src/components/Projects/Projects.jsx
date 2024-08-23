import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Modal, Box, Typography, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import "./Projects.css";
import { db } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { addDoc } from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, updateDoc } from 'firebase/firestore';
import VisibilityIcon from '@mui/icons-material/Visibility';

async function fetchDataFromFirestore(table) {
  const querySnapshot = await getDocs(collection(db, table));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
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

const apply = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "Applications"), {
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

const updateStatusApp = async (documentId, newStatus) => {
  try {
    // Get a reference to the document in the 'orders' collection
    const docRef = doc(db, "Applications", documentId);

    // Update the 'status' field
    await updateDoc(docRef, {
      ...newStatus
    });

    console.log(documentId,newStatus,  "Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

const Projects = () => {
  const [isAdmin] = useState(false); // set to true for admin, false for non-admin

  const [userData] = useState(isAdmin ? {name: 'Sahil', Unit: 'DX', id: '6481564', }: {
    name: 'Rohit', Unit: 'DX', id: '845845', skill: 'React, Node'
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [applied, setApplied] = useState({})
  // const [applications, setApplications] = useState([]);
  // const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  // const [isEditMode, setIsEditMode] = useState(false);
  async function fetchData() {
    const data = await fetchDataFromFirestore("Projects");
    const applications = await fetchDataFromFirestore("Applications");
    const obj = {}
    applications.forEach(element => {
      if ((element.applicantId === userData.id) && (element.status === 'SUBMITTED'|| element.status === 'ACCEPTED')) {
        obj[element.projectId] = element.id;
      }
    });
    setApplied(obj)
    setProjects(data);
    // setApplications(applications)
  }
  useEffect(() => {
    
    fetchData();
  }, []);
  // console.log("FETCH PROJECT WHICH YOU GOT---", projects);

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Project Name", width: 200 },
    { field: "skill", headerName: "Technology", width: 200 },
    { field: "domain", headerName: "Domain", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "postedBy", headerName: "Posted By", width: 150 },
    {
      field: "viewInfo",
      headerName: "View Info",
      width: 200,
      renderCell: (params) => (<>
      <Button
          variant="contained"
          size="small"
          onClick={() => {handleViewInfoClick(params.row)}}
        >
         <VisibilityIcon />
        </Button>
        {isAdmin && <Button
          variant="contained"
          size="small"
          onClick={() => {updateStatus(params.id, {status: 'CLOSED'})}}
        >
          <DeleteIcon />
        </Button>}
      </>
      ),
    },
  ];



  const handleViewInfoClick = (data) => {
    console.log("THE ROW DATA---->", data);
    // setSelectedRow(data);
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
    <div className="projects-container" data-testid="test-projects">
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
          {isAdmin && (
            <IconButton onClick={() => {
              // setIsEditMode(true)
              }}>
              <EditIcon />
            </IconButton>
          )}
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Project Name:
                  </Typography>
                  <TextField
                    disabled={!isAdmin}
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
                    disabled={!isAdmin}
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
                    disabled={!isAdmin}
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
                    disabled={!isAdmin}
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
                    disabled={!isAdmin}
                    value={formData.description}
                    onChange={(e) => {handleInputChange(e, "description")}}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {isAdmin ? <><Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => {handleSaveChanges()
                      fetchData()
                    }}
                  >
                    Save Changes
                  </Button></> : (<>
                   {applied[formData.id] ? <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      updateStatusApp(applied[formData.id],{
                        status: 'WITHDRAW'
                      })
                      setOpenModal(false);
                      fetchData()
                    }}
                  >
                    Withdraw
                  </Button>: <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      apply({
                        projectId: formData.id,
                        applicantId: userData.id,
                        applicantName: userData.name,
                        skill: userData.skill,
                        status: 'SUBMITTED',
                        projectName: formData.name
                      })
                      setOpenModal(false);
                      fetchData()
                    }}
                  >
                    Apply
                  </Button>} 
                  </>)}
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
        </Box>
      </Modal>
    </div>
  );
};

export default Projects;
