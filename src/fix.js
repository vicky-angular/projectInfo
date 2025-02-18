import React from "react";
import { styled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
  // Override styling for the inner ToggleButtons via their grouped class
  "& .MuiToggleButtonGroup-grouped": {
    border: "1px solid transparent", // Remove default border
    borderRadius: 0, // Remove default rounding on all buttons
    // Style first button: add left rounded corners
    "&:first-of-type": {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderBottomLeftRadius: theme.shape.borderRadius,
    },
    // Style last button: add right rounded corners
    "&:last-of-type": {
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
    // Remove the right border on all but the last to avoid double borders
    "&:not(:last-of-type)": {
      borderRight: 0,
    },
  },
}));

const CustomToggleGroup = () => {
  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <StyledToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned">
        Left
      </ToggleButton>
      <ToggleButton value="center" aria-label="center aligned">
        Center
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        Right
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default CustomToggleGroup;
