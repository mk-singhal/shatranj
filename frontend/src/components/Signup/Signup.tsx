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

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    firstName ? "" : setFirstNameError("Required");
    const lastName = data.get("lastName");
    lastName ? "" : setLastNameError("Required");
    const email = data.get("email");
    email ? "" : setEmailError("Required");
    const password = data.get("password");
    password ? "" : setPasswordError("Required");
    const confirmPassword = data.get("confirmPassword");
    confirmPassword ? "" : setConfirmPasswordError("Required");

    if (!firstName || !lastName || !email || !password || !confirmPassword)
      return;
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    });
  };

  const password = React.useRef<HTMLInputElement | null>(null);
  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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

  return (
    <Container component="main" maxWidth="xs">
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
          Sign up
        </Typography>
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
            Sign Up
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  // color: green[500],
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
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
