import * as React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../../api/axios";
import Alert from "@mui/material/Alert";
import useAuth from "../../hooks/useAuth";

const LOGIN_URL = "/login";
type AlertHTML = {
  severity: any;
  message: string;
};

export default function Login() {
  const { auth, setAuth, setUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<AlertHTML | null>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    console.log(`${hours}:${minutes}:${seconds}`); 
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString();
    email ? "" : setEmailError("Required");

    const password = data.get("password")?.toString();
    password ? "" : setPasswordError("Required");
    
    const rememberMe = data.get("remember") ? true : false;
    
    if (!email || !password) return;

    setAlert(null);
    setLoading(true);

    try {
      const res = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email,
          password,
          rememberMe
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(res?.data));
      const firstName = res?.data?.firstName;
      const lastName = res?.data?.lastName;
      const accessToken = res?.data?.accessToken;

      setAuth(accessToken);
      setUser({ firstName, lastName, email, password });

      if (res.data)
        setAlert({ severity: "success", message: "Login  successful" });

      navigate(from, { replace: true });
    } catch (error: any) {
      if (!error?.response) {
        setAlert({ severity: "error", message: "No Server Response" });
      } else if (error.response?.status === 400) {
        setAlert({
          severity: "error",
          message: "Missing Username or Password",
        });
      } else if (error.response?.status === 401) {
        setAlert({ severity: "error", message: "Unauthorized" });
      } else {
        setAlert({ severity: "error", message: "Login Failed" });
      }
    } finally {
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      setLoading(false);
    }
  };

  return (
    <>
      {auth ? (
        <Navigate to="/" />
      ) : (
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
              Login
            </Typography>
            {alert && (
              <Alert
                sx={{ marginTop: 2 }}
                severity={alert.severity == "success" ? "success" : "error"}
              >
                {alert.message}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(emailError)}
                helperText={emailError}
                onChange={handleEmailChange}
                inputProps={{
                  type: "email",
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                error={Boolean(passwordError)}
                helperText={passwordError}
                onChange={handlePasswordChange}
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
              <FormControlLabel
                control={
                  <Checkbox name="remember" value="remember" color="primary" />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={Boolean(emailError || passwordError || loading)}
              >
                Login
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
              <Grid container>
                <Grid item xs>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/forgotPassword");
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/register");
                    }}
                  >
                    Don't have an account? Register
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
