export const drawerWidth = 240;
export const collapsedWidth = 56;

export const styles = {
  drawerPaper: (width: number) => ({
    width,
    boxSizing: "border-box",
    transition: "width 200ms",
    overflowX: "hidden",
  }),
  navBox: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  toolbar: (collapsed: boolean) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: collapsed ? "center" : "space-between",
    px: 2,
  }),
  toggleButton: {
    transition: "opacity 180ms",
    opacity: 0,
    ml: 1,
    bgcolor: "transparent",
    "&:hover": { bgcolor: "action.hover" },
  },
  list: {
    flex: 1,
    overflow: "auto",
  },
  listItemButton: (collapsed: boolean) => ({
    minHeight: 48,
    justifyContent: collapsed ? "center" : "initial",
    px: 2.5,
  }),
  listItemIcon: (collapsed: boolean) => ({
    minWidth: 0,
    mr: collapsed ? 0 : 3,
    justifyContent: "center",
  }),
  listItemText: (collapsed: boolean) => ({
    opacity: collapsed ? 0 : 1,
  }),
  userBox: (collapsed: boolean) => ({
    p: 1,
    textAlign: collapsed ? "center" : "left",
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menuButton: (theme: any) => ({
    position: "fixed",
    top: 12,
    left: 12,
    zIndex: theme.zIndex?.appBar ? theme.zIndex.appBar + 1 : 1200,
    bgcolor: "background.paper",
    boxShadow: 1,
  }),
};