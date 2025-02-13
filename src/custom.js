import React, { useState } from "react";
import { ToggleButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: "8px",
  padding: "10px 20px",
  fontSize: "16px",
  transition: "all 0.2s ease",
  border: "1px solid transparent",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "&:focus": {
      boxShadow: `0 0 4px ${theme.palette.primary.main}`,
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.action.disabled,
      color: theme.palette.text.disabled,
    },
  },
  "&:not(.Mui-selected)": {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:focus": {
      boxShadow: `0 0 4px ${theme.palette.primary.light}`,
    },
    "&:active": {
      backgroundColor: theme.palette.action.selected,
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.text.disabled,
    },
  },
}));

const ToggleButtonComponent = () => {
  const [selected, setSelected] = useState(false);

  const handleToggle = () => {
    setSelected((prev) => !prev);
  };

  return (
    <CustomToggleButton 
      selected={selected} 
      onClick={handleToggle}
      aria-label="toggle button"
    >
      Toggle
    </CustomToggleButton>
  );
};

export default ToggleButtonComponent;
