import { School, Book, Person } from "@mui/icons-material";
import { Box, Typography, Card } from "@mui/material";

const Landing = () => {
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Bienvenido al Sistema administrativo
      </Typography>

      <Box sx={{ maxWidth: 600, mx: "auto", my: 4 }}>
        <Typography variant="h6" paragraph>
          Esta plataforma le permite administrar su institución educativa.
        </Typography>

        <Typography paragraph color="text.secondary">
          Administre alumnos, materias, maestros y calificaciones en un solo
          lugar.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          mt: 4,
        }}
      >
        <Card
          sx={{
            width: 200,
            height: 180,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <School sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
          <Typography variant="h6">Alumnos</Typography>
        </Card>

        <Card
          sx={{
            width: 200,
            height: 180,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Book sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
          <Typography variant="h6">Materias</Typography>
        </Card>

        <Card
          sx={{
            width: 200,
            height: 180,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Person sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
          <Typography variant="h6">Maestros</Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default Landing;
