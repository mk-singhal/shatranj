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

const REGISTER_URL = "register";
type AlertHTML = {
  severity: any;
  message: string;
};

export default function Register() {
  const password = React.useRef<HTMLInputElement | null>(null);

  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

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

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setFirstNameError("Required");
    } else if (!e.target.validity.valid) {
      setFirstNameError("Only alphabets & space allowed");
    } else {
      setFirstNameError("");
    }
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setLastNameError("Required");
    } else if (!e.target.validity.valid) {
      setLastNameError("Only alphabets allowed");
    } else {
      setLastNameError("");
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setEmailError("Required");
    } else if (!e.target.validity.valid) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!lastName) {
      setLastNameError("Required");
      return;
    }
    const email = data.get("email");
    if (!email) {
      setEmailError("Required");
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
    } catch (error: any) {
      if (!error?.response) {
        setAlert({ severity: "error", message: "No Server Response" });
        console.log("No Server Response");
      } else if (error.response?.status === 409) {
        setAlert({ severity: "error", message: "Email already registered" });
        console.log("Email already registered");
      } else {
        setAlert({ severity: "error", message: "Registeration Failed" });
        console.log("Registeration Failed");
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
                autoComplete="given-name"
                name="firstName"
                required
                error={Boolean(firstNameError)}
                helperText={firstNameError}
                onChange={handleFirstNameChange}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputProps={{
                  pattern: "[a-zA-z ]+",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={Boolean(lastNameError)}
                helperText={lastNameError}
                onChange={handleLastNameChange}
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
              <TextField
                required
                error={Boolean(emailError)}
                helperText={emailError}
                onChange={handleEmailChange}
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
                onChange={handlePasswordChange}
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
