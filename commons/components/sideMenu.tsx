import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Drawer,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { collapsedWidth, drawerWidth, styles } from "../styles/sideMenuStyle";
const navItems = [
  { text: "Ventas", href: "/", icon: <DashboardIcon /> },
  { text: "Caja", href: "/caja", icon: <Inventory2Icon /> },
  { text: "Stock", href: "/productoStock", icon: <ShoppingCartIcon /> },
  { text: "Historial de compras", href: "/historialCompra", icon: <PeopleIcon /> },
  { text: "Historial de caja", href: "/historialCaja", icon: <SettingsIcon /> },
];

interface SideMenuProps {
  onCollapse?: (collapsed: boolean) => void;
}

export const Index: React.FC<SideMenuProps> = ({ onCollapse }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (newState: boolean) => {
    setCollapsed(newState);
    onCollapse?.(newState);
  };

  const width = collapsed ? collapsedWidth : drawerWidth;
  const variant = isDesktop ? "permanent" : "temporary";
  const open = isDesktop ? true : mobileOpen;

  const drawerContent = (
    <Box
      sx={{ ...styles.navBox, height: "100%", position: "relative", pb: 6 }}
      role="presentation"
    >
      <Toolbar sx={styles.toolbar(collapsed)}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: collapsed ? "none" : "block" }}
        >
          MiniMarket
        </Typography>
      </Toolbar>

      <Divider />

      <List sx={styles.list}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={styles.listItemButton(collapsed)}
              onClick={() => {
                if (!isDesktop) setMobileOpen(false);
              }}
            >
                <ListItemIcon sx={styles.listItemIcon(collapsed)}>
                  {React.cloneElement(item.icon, { fontSize: "medium" })}
                </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={styles.listItemText(collapsed)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          pb: 2,
          bgcolor: "background.paper",
          borderTop: "1px solid #eee",
        }}
      >
        <IconButton
          aria-label={collapsed ? "Mostrar menú" : "Ocultar menú"}
          onClick={() => handleCollapse(!collapsed)}
          size="large"
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: width }, flexShrink: { md: 0 } }}
      aria-label="menu lateral"
    >
      {!isDesktop && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setMobileOpen(true)}
          sx={styles.menuButton(theme)}
          aria-label="abrir menú"
          size="large"
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={variant}
        open={open}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "block" },
          "& .MuiDrawer-paper": styles.drawerPaper(width),
        }}
      >
        <Box sx={{ "&:hover .toggleButton": { opacity: 1 } }}>
          {drawerContent}
        </Box>
      </Drawer>
    </Box>
  );
};
