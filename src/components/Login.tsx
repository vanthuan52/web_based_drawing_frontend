import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

interface User {
  username: string;
  password: string;
}

const LoginLogout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = () => {
    // Replace with actual authentication logic
    if (user.username === "admin" && user.password === "admin") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ username: "", password: "" });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {!isLoggedIn ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={300}
          p={3}
          border={1}
          borderColor="grey.300"
          borderRadius={2}
        >
          <Typography variant="h5" mb={2}>
            Log In
          </Typography>
          <TextField
            label="Username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={300}
          p={3}
          border={1}
          borderColor="grey.300"
          borderRadius={2}
        >
          <Typography variant="h5" mb={2}>
            Welcome, {user.username}!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            fullWidth
            sx={{ mt: 2 }}
          >
            Log Out
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LoginLogout;