import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SideMenu } from "..";

export const Index = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", minHeight: "5%" }}>
      <SideMenu onCollapse={setCollapsed} />

      <AppBar position="relative">
        <Toolbar>
          <ShoppingCartIcon sx={{ mr: 2 }} />
          <Typography variant="h6">Minimarket Aron</Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin-left 200ms",
          ml: collapsed ? "56px" : "240px",
          p: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
