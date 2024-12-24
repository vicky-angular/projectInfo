import React from 'react';
import { Box, Typography } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

// Define interfaces
interface AnnouncementProps {
  icon: SvgIconComponent; // Material-UI icon component
  content: string; // Dynamic content to display
  iconColor?: string; // Optional icon color
  contentVariant?: 'body1' | 'body2' | 'subtitle1' | 'subtitle2'; // Typography variant
}

// Announcement component
const Announcement: React.FC<AnnouncementProps> = ({
  icon: Icon,
  content,
  iconColor = 'primary',
  contentVariant = 'body1',
}) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Icon color={iconColor as any} /> {/* Render the icon */}
      <Typography variant={contentVariant}>{content}</Typography> {/* Render the content */}
    </Box>
  );
};

export default Announcement;
