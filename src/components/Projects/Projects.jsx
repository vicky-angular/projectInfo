import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Modal, Box, Typography, Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import './Projects.css';



const Projects = () => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'projectName', headerName: 'Project Name', width: 150 },
        { field: 'domain', headerName: 'Domain', width: 100 },
        { field: 'technology', headerName: 'Technology', width: 100 },
        { field: 'unitName', headerName: 'Unit Name', width: 100 },
        { field: 'primarySkill', headerName: 'Primary Skill', width: 100 },
        { field: 'secondarySkill', headerName: 'Secondary Skill', width: 100 },
        { field: 'viewInfo', headerName: 'View Info', width: 100, 
          renderCell: (params) => (
              <Button
                variant="contained"
                size="small"
                onClick={() => handleViewInfoClick(params.row)}
              >
                View Info
              </Button>
            ), },
      ];
      
      const rows = [
        { id: 1, projectName: 'Project 1', unitName: 'management', primarySkill: 'React, JavaScript',  secondarySkill: 'salesforce, api', domain: 'Web Development', technology: 'Frontend' },
        { id: 2, projectName: 'Project 2', unitName: 'management', primarySkill: 'Node.js, Express', secondarySkill: 'salesforce, api', domain: 'Backend Development', technology: 'API' },
        { id: 3, projectName: 'Project 3', unitName: 'management', primarySkill: 'Angular, TypeScript', secondarySkill: 'salesforce, api',  domain: 'Web Development', technology: 'Frontend' },
        { id: 4, projectName: 'Project 4', unitName: 'management', primarySkill: 'Vue.js, JavaScript', secondarySkill: 'salesforce, api', domain: 'Web Development', technology: 'Frontend' },
        { id: 5, projectName: 'Project 5', unitName: 'management', primarySkill: 'Python, Django', secondarySkill: 'salesforce, api', domain: 'Backend Development', technology: 'API' },
      ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // set to true for admin, false for non-admin
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const handleViewInfoClick =  (data) => {
    console.log('THE ROW DATA---->', data);
    setSelectedRow(data);
    setFormData({...data})
    setOpenModal(true);
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.primarySkill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.secondarySkill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.technology.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e, field) => {
    if (field === 'primarySkill' || field === 'secondarySkill') {
        const values = e.target.value;
        setFormData({ ...formData, [field]: values.join(',') });
      }else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleSaveChanges = () => {
    // API call to save changes
    console.log('Changes saved!', formData);
    handleCloseModal();
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{
        bgcolor: 'background.paper',
        p: 4,
        borderRadius: 10,
        boxShadow: 10,
        width: 600,
        maxHeight: 500,
        overflowY: 'auto',
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Project Details
        </Typography>
        {true && (
      <IconButton
        onClick={() => setIsEditMode(true)}
      >
        <EditIcon />
      </IconButton>
    )}

        {isEditMode ? (
            <form>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Project Name:</Typography>
      <TextField
        value={formData.projectName}
        onChange={(e) => handleInputChange(e, 'projectName')}
        variant="outlined"
        size="small"
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Primary:</Typography>
      <FormControl sx={{ m: 1, width: 100 }}>
        {/* <InputLabel id="demo-multiple-name-label">Name</InputLabel> */}
        <Select
  multiple
  value={formData.primarySkill ? formData.primarySkill.split(',') : []}
  onChange={(e) => handleInputChange(e, 'primarySkill')}
  renderValue={(selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  )}
  variant="outlined"
  size="small"
  fullWidth
>
  {formData?.primarySkill?.split(',').map((skill, index) => (
    <MenuItem key={index} value={skill.trim()}>{skill.trim()}</MenuItem>
  ))}
</Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Secondary:</Typography>
      <FormControl sx={{ m: 1, width: 100 }}>
    <Select
      multiple
      value={formData.secondarySkill ? formData.secondarySkill.split(',') : []}
      onChange={(e) => handleInputChange(e, 'secondarySkill')}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => (
            <Chip key={value} label={value} />
          ))}
        </Box>
      )}
      variant="outlined"
      size="small"
      fullWidth
    >
      {formData?.secondarySkill?.split(',').map((skill, index) => (
        <MenuItem key={index} value={skill.trim()}>{skill.trim()}</MenuItem>
      ))}
    </Select>
  </FormControl>
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Domain:</Typography>
      <TextField
        value={formData.domain}
        onChange={(e) => handleInputChange(e, 'domain')}
        variant="outlined"
        size="small"
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Technology:</Typography>
      <TextField
        value={formData.technology}
        onChange={(e) => handleInputChange(e, 'technology')}
        variant="outlined"
        size="small"
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
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
                                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Project Name:</Typography>
                                      <Typography sx={{ fontSize: 14 }}>{selectedRow && selectedRow.projectName}</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Skills:</Typography>
                                      <Typography sx={{ fontSize: 14 }}>{selectedRow && selectedRow.skills}</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Domain:</Typography>
                                      <Typography sx={{ fontSize: 14 }}>{selectedRow && selectedRow.domain}</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Technology:</Typography>
                                      <Typography sx={{ fontSize: 14 }}>{selectedRow && selectedRow.technology}</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Start Date:</Typography>
                                      <Typography sx={{ fontSize: 14 }}>{selectedRow && selectedRow.startDate}</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>End Date:</Typography>
                                      <Typography sx={{ fontSize: 14 }}>{selectedRow && selectedRow.endDate}</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Budget:</Typography>
                                      <Typography sx={{ fontSize: 14 }}>{selectedRow && selectedRow.budget}</Typography>
                                  </Grid>
                              </Grid><Button
                                  variant="contained"
                                  color="primary"
                                  sx={{ mt: 2, float: 'right' }}
                                  onClick={handleCloseModal}
                              >
                                  Close
                              </Button></>
             
        )}
        </Box>
     </Modal>
    </div>
  );
};

export {Projects};