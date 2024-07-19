import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "../../api/axios.ts";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Fade from "@mui/material/Fade";

const REGISTER_URL = "register";
type AlertHTML = {
  severity: any;
  message: string;
};

export default function Register() {
  const navigate = useNavigate();
  const password = React.useRef<HTMLInputElement | null>(null);

  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

  const [usernameTooltipOpen, setUsernameTooltipOpen] = React.useState(false);
  const handleUsernameTooltipClose = () => {
    setUsernameTooltipOpen(false);
  };
  const handleUsernameTooltipOpen = () => {
    setUsernameTooltipOpen(true);
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<AlertHTML | null>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function validateUsername(username: string): Promise<boolean> {
    try {
      const res = await axios.post(
        "check-username",
        JSON.stringify({ username }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const handleFirstNameChange = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setFirstNameError("Required");
    } else if (!e.target.validity.valid) {
      setFirstNameError("Only alphabets & space allowed");
    } else {
      setFirstNameError("");
    }
  };
  const handleLastNameChange = (e: React.FocusEvent<HTMLInputElement>) => {
    // if (e.target.value === "") {
    //   setLastNameError("Required");
    // } else
    if (!e.target.validity.valid) {
      setLastNameError("Only alphabets allowed");
    } else {
      setLastNameError("");
    }
  };
  const handleEmailChange = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setEmailError("Required");
    } else if (!e.target.validity.valid) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };
  const handleUsernameChange = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    if (e.target.value === "") {
      setUsernameError("Required");
    } else if (!e.target.validity.valid) {
      setUsernameError("Enter a valid username");
      // } else if (await validateUsername(e.target.value)) {
      //   setUsernameError("");
    } else {
      validateUsername(e.target.value)
        .then((res) => {
          console.log(res);
          if (res) {
            setUsernameError("");
          } else {
            setUsernameError("Username already taken");
          }
        })
        .catch((err) => {
          console.log(err);
          setUsernameError("Username already taken");
        });
    }
  };
  const handlePasswordChange = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setPasswordError("Required");
    } else if (e.target.value.length < 8) {
      setPasswordError("Should contain at least 8 or more characters");
    } else {
      setPasswordError("");
    }
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passwordVal = password.current?.value;
    if (e.target.value === "") {
      setConfirmPasswordError("Required");
    } else if (e.target.value !== passwordVal) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    if (!firstName) {
      setFirstNameError("Required");
      return;
    }
    const lastName = data.get("lastName");
    // if (!lastName) {
    //   setLastNameError("Required");
    //   return;
    // }
    const email = data.get("email");
    if (!email) {
      setEmailError("Required");
      return;
    }
    const username = data.get("username");
    if (!username) {
      setUsernameError("Required");
      return;
    }
    const password = data.get("password");
    if (!password) {
      setPasswordError("Required");
      return;
    }
    const confirmPassword = data.get("confirmPassword");
    if (!confirmPassword) {
      setConfirmPasswordError("Required");
      return;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      // console.log(res.accessToken);
      if (res.data && res.data.success)
        setAlert({ severity: "success", message: res.data.success });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      if (!error?.response) {
        setAlert({ severity: "error", message: "No Server Response" });
      } else if (error.response?.status === 400) {
        setAlert({ severity: "error", message: error.response.data.message });
      } else if (error.response?.status === 409) {
        setAlert({ severity: "error", message: error.response.data.message });
      } else {
        setAlert({ severity: "error", message: "Registeration Failed" });
      }
    } finally {
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: {
          xs: "calc(100vh - 56px)",
          sm: "calc(100vh - 64px)",
          md: "100vh",
        },
        alignContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {alert && (
          <Alert
            sx={{ marginTop: 2 }}
            severity={alert.severity == "success" ? "success" : "error"}
          >
            {alert.message}
          </Alert>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                error={Boolean(firstNameError)}
                helperText={firstNameError}
                onBlur={handleFirstNameChange}
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                inputProps={{
                  pattern: "[a-zA-z ]+",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(lastNameError)}
                helperText={lastNameError}
                onBlur={handleLastNameChange}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                inputProps={{
                  pattern: "[A-Za-z]+",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <ClickAwayListener onClickAway={handleUsernameTooltipClose}>
                <div>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={handleUsernameTooltipClose}
                    open={usernameTooltipOpen}
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [3, -13],
                            },
                          },
                        ],
                      },
                    }}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    placement="bottom-end"
                    title={
                      <ul>
                        <li>
                          Username can only contain <b>letters</b>,{" "}
                          <b>numbers</b>, <b>periods</b> and <b>underscores</b>.
                        </li>
                        <li>
                          Username can <em>start</em> and <em>end</em> with{" "}
                          <b>underscores</b> but never with <b>periods</b>.
                        </li>
                        <li>
                          Username length should be between{" "}
                          <b>4 and 20 characters</b>.
                        </li>
                        <li>
                          <b>Spaces</b> are <em>not allowed</em>
                        </li>
                      </ul>
                    }
                  >
                    <TextField
                      required
                      error={Boolean(usernameError)}
                      helperText={usernameError}
                      onBlur={handleUsernameChange}
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      inputProps={{
                        pattern: "^\\w[\\w.]{2,18}\\w$",
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Open Username Tooltip"
                              onClick={handleUsernameTooltipOpen}
                              // onMouseDown={handleMouseDownShowPassword}
                              edge="end"
                            >
                              <InfoIcon />
                              {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Tooltip>
                </div>
              </ClickAwayListener>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                error={Boolean(emailError)}
                helperText={emailError}
                onBlur={handleEmailChange}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputProps={{
                  type: "email",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                error={Boolean(passwordError)}
                helperText={passwordError}
                onBlur={handlePasswordChange}
                fullWidth
                name="password"
                inputRef={password}
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                error={Boolean(confirmPasswordError)}
                helperText={confirmPasswordError}
                onChange={handleConfirmPasswordChange}
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownShowPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={Boolean(
              firstNameError ||
                lastNameError ||
                usernameError ||
                emailError ||
                passwordError ||
                confirmPasswordError ||
                loading
            )}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
