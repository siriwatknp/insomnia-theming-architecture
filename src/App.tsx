import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  ThemeOptions,
  getContrastRatio,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { red } from "@mui/material/colors";
import { GoGitMerge, GoGear, GoPerson, GoTriangleDown } from "react-icons/go";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import logo from "./insomnia.svg";
import dracular from "./themes/dracular";
import electron from "./themes/electron-highlighter";
import earlyRiser from "./themes/early-riser";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    insomnia?: any;
  }

  interface Theme {
    insomnia: typeof pluginTheme;
  }
}

const insomniaTheme: ThemeOptions = {
  palette: {
    primary: {
      main: red[600],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          // @ts-expect-error: This should be fixed in Material UI
          backgroundColor: theme.insomnia.styles.sidebar.background.default,
        }),
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 40,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255 255 255 / 0.12)"
              : theme.palette.background.default,
          paddingLeft: "0.25rem",
          paddingRight: "0.25rem",
        }),
        scroller: {
          display: "inline-flex",
        },
        flexContainer: {
          zIndex: 1,
        },
        indicator: ({ theme }) => ({
          height: "calc(100% - 0.5rem)",
          top: "0.25rem",
          borderRadius: 40,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : `rgba(0 0 0 / 0.08)`,
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-selected": {
            color: theme.palette.text.primary,
          },
        }),
      },
    },
  },
};

// Uncomment theme to see the result
const selectedTheme = earlyRiser;
// const selectedTheme = electron;
// const selectedTheme = dracular;

const pluginTheme = selectedTheme.theme;

export default function App() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  // Split theming into multiple parts. For Each part, decide the palette mode base on its background & foreground contrast and let MUI
  // generate appropriate colors for every components inside that scope.
  const paneTheme = createTheme({
    ...deepmerge(insomniaTheme, {
      palette: {
        mode:
          getContrastRatio(
            "#121212",
            pluginTheme.styles.sidebar.background.default
          ) > 4.5
            ? "light"
            : "dark",
        background: {
          default: pluginTheme.styles.sidebar.background.default,
        },
      },
    }),
    insomnia: pluginTheme,
  });
  const bodyTheme = createTheme({
    ...deepmerge(insomniaTheme, {
      palette: {
        mode:
          getContrastRatio("#121212", pluginTheme.background.default) > 4.5
            ? "light"
            : "dark",
        background: {
          default: pluginTheme.background.default,
        },
        text: {
          primary: pluginTheme.foreground.default,
        },
      },
    }),
    insomnia: pluginTheme,
  });
  console.log(bodyTheme);
  const dialogTheme = createTheme({
    ...deepmerge(insomniaTheme, {
      palette: {
        mode:
          getContrastRatio(
            "#121212",
            pluginTheme.styles.dialog.background.default
          ) > 4.5
            ? "light"
            : "dark",
      },
    }),
    insomnia: pluginTheme,
  });
  return (
    <div>
      <ThemeProvider theme={paneTheme}>
        <AppBar
          position="relative"
          color="default"
          enableColorOnDark
          elevation={0}
          sx={{ boxShadow: (theme) => `0 0 0 1px ${theme.palette.divider}` }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: 80,
              gap: 2,
              px: 2,
            }}
          >
            <img src={logo} width="40" height="40" alt="" />
            <Typography sx={{ color: "text.secondary" }}>Insomnia /</Typography>
            <Typography>New Document</Typography>
            <Tabs
              value={tabIndex}
              onChange={(event, val) => setTabIndex(val)}
              sx={{ mx: "auto" }}
            >
              <Tab label="Design" value={0} />
              <Tab label="Debug" value={1} />
              <Tab label="Test" value={2} />
            </Tabs>
            <Button variant="contained" startIcon={<GoGitMerge />}>
              Setup Git sync
            </Button>
            <IconButton onClick={() => setDialogOpen(true)}>
              <GoGear />
            </IconButton>
            <IconButton>
              <GoPerson />
            </IconButton>
          </Box>
        </AppBar>
      </ThemeProvider>
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 80px)",
        }}
      >
        <ThemeProvider theme={paneTheme}>
          <Box
            sx={{
              width: 256,
              borderRight: "1px solid",
              borderColor: "divider",
              color: "text.primary",
              bgcolor: (theme) =>
                theme.insomnia.styles.sidebar.background.default,
            }}
          >
            <Box sx={{ p: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  No environment
                </InputLabel>
                <Select label="No environment"></Select>
              </FormControl>
            </Box>
            <List component="div">
              <ListItemButton selected>
                <ListItemIcon>
                  <Typography color="primary.main">GET</Typography>
                </ListItemIcon>
                New Request
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Typography color="primary.main">GET</Typography>
                </ListItemIcon>
                New Request
              </ListItemButton>
            </List>
          </Box>
        </ThemeProvider>
        <ThemeProvider theme={bodyTheme}>
          <CssBaseline />
          <Box
            sx={{
              flexGrow: 1,
              borderRight: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box
              sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                display: "flex",
                gap: 1,
                height: 64,
              }}
            >
              <Button
                color="primary"
                size="large"
                endIcon={<GoTriangleDown />}
                sx={{ px: 4, borderRadius: 0 }}
              >
                GET
              </Button>
              <InputBase
                defaultValue="http://mockbin.org"
                sx={{ flexGrow: 1 }}
              />
              <Button variant="contained" sx={{ borderRadius: 0 }}>
                Send
              </Button>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
        </ThemeProvider>
      </Box>
      <ThemeProvider theme={dialogTheme}>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setDialogOpen(false)}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
