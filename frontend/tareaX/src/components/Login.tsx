import { auth, googleProvider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
} from "@mui/icons-material";

import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ email, password, rememberMe });
    // Aquí iría la lógica de autenticación
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Usuario autenticado: ", user);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "grey.50",
      }}
    >
      {/* Sección del formulario */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ mb: 5, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              ServiSaltillo
            </Typography>
            <Typography
              variant="h5"
              component="h1"
              sx={{ mt: 3, fontWeight: "bold" }}
            >
              Bienvenido de nuevo
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Ingresa tus credenciales para acceder a tu cuenta
            </Typography>
          </Box>

          <Card elevation={4}>
            <CardContent sx={{ p: 4 }}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ "& .MuiTextField-root": { mb: 3 } }}
              >
                <TextField
                  label="Correo electrónico"
                  type="email"
                  fullWidth
                  variant="outlined"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                />

                <TextField
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  variant="outlined"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        ></IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Recordarme"
                  />
                  <Typography variant="body2" color="primary">
                    ¿Olvidaste tu contraseña?
                  </Typography>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mb: 2, py: 1.5 }}
                >
                  Iniciar Sesión
                </Button>
              </Box>

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2">
                  ¿No tienes una cuenta?{" "}
                  <Typography
                    component="span"
                    variant="body2"
                    color="primary"
                    sx={{ fontWeight: "medium" }}
                  >
                    Regístrate
                  </Typography>
                </Typography>
              </Box>

              <Box sx={{ position: "relative", mt: 4, mb: 3 }}>
                <Divider>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1,
                      textTransform: "uppercase",
                      color: "text.secondary",
                    }}
                  >
                    O continúa con
                  </Typography>
                </Divider>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 6 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Google />}
                    sx={{ py: 1.2 }}
                  >
                    Google
                  </Button>
                </Grid>
                <Grid size={{ xs: 6, md: 6 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Facebook />}
                    sx={{ py: 1.2 }}
                  >
                    Facebook
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary">
              Al iniciar sesión, aceptas nuestros Términos de Servicio y{" "}
              Política de Privacidad
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Sección de imagen */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          flex: 1,
          position: "relative",
          bgcolor: "primary.dark",
        }}
      >
        <Box
          component="img"
          src="/placeholder.svg?height=1080&width=1920"
          alt="Login"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.7,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 6,
            zIndex: 1,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              maxWidth: 450,
              bgcolor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Conecta con los mejores servicios
            </Typography>
            <Typography variant="body1" paragraph>
              Encuentra profesionales de calidad, agenda citas y comparte tus
              experiencias en nuestra plataforma.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Box
                  key={star}
                  component="span"
                  sx={{
                    color: "primary.main",
                    fontSize: "24px",
                  }}
                >
                  ★
                </Box>
              ))}
            </Box>
            <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
              "Una excelente plataforma para encontrar servicios de calidad.
              ¡Totalmente recomendada!"
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              — María García, Cliente
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );

  //   return (
  //     <>

  //       {<div>
  //                 <h2>Inicia sesión con Google</h2>
  //                 <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
  //             </div>}
  //     </>
  //   );
};

export default Login;
