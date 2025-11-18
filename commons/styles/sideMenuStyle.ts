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
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  listItemButton: (collapsed: boolean) => ({
    minHeight: 48,
    justifyContent: collapsed ? "center" : "flex-start",
    px: 2.5,
    width: "100%",
    display: "flex",
    alignItems: "center",
  }),
  listItemIcon: (collapsed: boolean) => ({
    minWidth: 0,
    mr: collapsed ? 0 : 2,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: 10,
  }),
  listItemText: (collapsed: boolean) => ({
    opacity: collapsed ? 0 : 1,
    width: collapsed ? 0 : "auto",
    minWidth: collapsed ? 0 : "unset",
    padding: 0,
    margin: 0,
    overflow: "hidden",
    transition: "opacity 0.2s, width 0.2s",
    whiteSpace: "nowrap",
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
