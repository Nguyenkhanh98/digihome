import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import BGImg from "@/assets/images/img/login_bg.jpg";
import { useNavigate } from "react-router-dom";
import { useInjectLang } from "@/hooks/useLang";
import useStyle from "./style";
export function LoginComponent({ handleSubmit,errors }: any) {
  const classes = useStyle();
  const navigate = useNavigate();
  const injectLang = useInjectLang();
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${BGImg})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            right: "50%",
            top: "10%",
            transform: "translate(50%, 10%)",
            fontSize: "25px",
            color: "white",
            fontFamily: "cursive",
          }}
        >
          Wellcome back to your dreamhouse
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
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
              error={errors.email}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <div className={classes.link}>Forgot password?</div>
              </Grid>
              <Grid item>
                <div
                  className={classes.link}
                  onClick={() => navigate(injectLang("register"))}
                >
                  {"Don't have an account? Sign Up"}
                </div>
              </Grid>
            </Grid>
          </Box>

          <Box style={{ marginTop: 40 }}>
            <Button
              variant="contained"
              onClick={() => navigate(injectLang(""))}
            >
              Back home
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginComponent;
