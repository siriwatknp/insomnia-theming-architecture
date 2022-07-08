import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  ThemeOptions,
  getContrastRatio,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { red } from "@mui/material/colors";
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
import { GoGitMerge, GoGear, GoPerson, GoTriangleDown } from "react-icons/go";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import logo from "./insomnia.svg";

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

const pluginTheme = {
  background: {
    default: "#282a36",
    success: "#50fa7b",
    notice: "#f1fa8c",
    warning: "#ffb86c",
    danger: "#ff5555",
    surprise: "#bd93f9",
    info: "#8be9fd",
  },
  foreground: {
    default: "#f8f8f2",
    success: "#282a36",
    notice: "#282a36",
    warning: "#282a36",
    danger: "#282a36",
    surprise: "#282a36",
    info: "#282a36",
  },
  highlight: {
    default: "rgba(98, 114, 164, .5)",
    xxs: "rgba(98, 114, 164, 0.05)",
    xs: "rgba(98, 114, 164, 0.1)",
    sm: "rgba(98, 114, 164, 0.2)",
    md: "rgba(98, 114, 164, 0.4)",
    lg: "rgba(98, 114, 164, 0.6)",
    xl: "rgba(98, 114, 164, 0.8)",
  },
  styles: {
    sidebar: {
      background: {
        default: "#0f1c23",
      },
    },
    dialog: {
      background: {
        default: "#1b2b34",
      },
    },
    paneHeader: {
      background: {
        success: "#5fb3b3",
        notice: "#fac863",
        warning: "#fac863",
        danger: "#ed6f7d",
        surprise: "#5fb3b3",
        info: "#5a9bcf",
      },
    },
    transparentOverlay: {
      background: {
        default: "rgba(27, 43, 52, 0.5)",
      },
    },
  },
};

export default function App() {
  const [tabIndex, setTabIndex] = React.useState(0);
  // Split theming into multiple parts. For Each part, decide the palette mode base on its background & foreground contrast and let MUI
  // generate appropriate colors for every components inside that scope.
  const paneTheme = createTheme({
    ...deepmerge(insomniaTheme, {
      palette: {
        mode:
          getContrastRatio(
            "rgba(0 0 0 / 0.87)",
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
          getContrastRatio(
            pluginTheme.foreground.default,
            pluginTheme.background.default
          ) > 4.5
            ? "light"
            : "dark",
      },
    }),
    insomnia: pluginTheme,
  });
  return (
    <div>
      <CssBaseline />
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
            <IconButton>
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
    </div>
  );
}
