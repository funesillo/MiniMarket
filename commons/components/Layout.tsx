import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SideMenu } from ".";
import { collapsedWidth } from "../styles/sideMenuStyle";

export const Index = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const APP_BAR_HEIGHT = 64;

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="fixed"
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          height: `${APP_BAR_HEIGHT}px`,
          justifyContent: "center",
        })}
      >
        <Toolbar sx={{ minHeight: `${APP_BAR_HEIGHT}px` }}>
          <ShoppingCartIcon sx={{ mr: 2 }} />
          <Typography variant="h6">Minimarket Aron</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flexGrow: 1, mt: `${APP_BAR_HEIGHT}px` }}>
        <SideMenu onCollapse={setCollapsed} />

        <Box
          component="main"
          sx={() => ({
            flexGrow: 1,
            transition: "margin-left 200ms",
            ml: {
              xs: 0,
              md: collapsed ? `${collapsedWidth}px` : "3%",
            },
            p: 2,
            overflow: "auto",
            minHeight: 0,
          })}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
