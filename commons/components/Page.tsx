import { Box, Typography } from "@mui/material";
import React from "react";

interface PageProps {
  title: string;
  children: React.ReactNode;
}

export const Index: React.FC<PageProps> = ({ title, children }) => (
  <Box sx={{ mt: 2, mb: 2 }}>
    <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
      {title}
    </Typography>
    {children}
  </Box>
);
