import { Add, Edit, Delete } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Teacher } from "../../types/teacher.interface";
import useFetch from "../../hooks/useFetch";
import useFetchPost from "../../hooks/useFetchPost";

const Teachers = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const {
    data,
    error,
    loading,
    fetchGET: fetchTeachers,
  } = useFetch<Teacher>("teachers/getTeachers");
  const { fetchPOST } = useFetchPost<Teacher>();
  const [openForm, setOpenForm] = useState(false);
  const [currentTeacher, setcurrentTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subjects: [],
    students: [],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenForm = (teacher?: Teacher) => {
    if (teacher) {
      setcurrentTeacher(teacher);
      setFormData({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        phoneNumber: teacher.phoneNumber,
        subjects: [teacher.subjects],
        students: [teacher.students],
      });
    } else {
      setcurrentTeacher(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        subjects: [],
        students: [],
      });
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleOpenDelete = (teacher: Teacher) => {
    setcurrentTeacher(teacher);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (currentTeacher) {
      const result = await fetchPOST("teachers/updateTeacher", {
        ...formData,
        id: currentTeacher.id,
      });
      if (!error) {
        fetchTeachers();
        setSnackbar({
          open: true,
          message: "Alumno actualizado correctamente",
          severity: "success",
        });
      }
    } else {
      const result = await fetchPOST("teachers/addTeacher", { ...formData });
      if (!error) {
        fetchTeachers();
        setSnackbar({
          open: true,
          message: "Alumno agregado correctamente",
          severity: "success",
        });
      }
    }
    handleCloseForm();
  };

  const handleDelete = async () => {
    if (currentTeacher) {
      const result = await fetchPOST("teachers/deleteTeacher", {
        ...formData,
        id: currentTeacher.id,
      });

      if (!error) {
        fetchTeachers();
        setSnackbar({
          open: true,
          message: "Alumno eliminado correctamente",
          severity: "success",
        });
      }
    }
    fetchTeachers();
    handleCloseDelete();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedteachers = data
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];
  return (
    <div>
      {loading && <div>Cargando...</div>}
      {data && (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4">Maestros</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenForm()}
            >
              Nuevo maestro
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre(s)</TableCell>
                  <TableCell>Apellido(s)</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedteachers.length > 0 ? (
                  paginatedteachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>{teacher.firstName}</TableCell>
                      <TableCell>{teacher.lastName}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.phoneNumber}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenForm(teacher)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleOpenDelete(teacher)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No hay maestros registrados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count}`
              }
            />
          </TableContainer>

          <Dialog
            open={openForm}
            onClose={handleCloseForm}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              {currentTeacher ? "Editar maestro" : "Nuevo maestro"}
            </DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Nombre"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Apellido"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Teléfono"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseForm}>Cancelar</Button>
              <Button onClick={handleSubmit} variant="contained">
                {currentTeacher ? "Actualizar" : "Crear"}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar al maestro{" "}
                {currentTeacher?.firstName} {currentTeacher?.lastName}? Esta
                acción no se puede deshacer.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>Cancelar</Button>
              <Button onClick={handleDelete} color="error" variant="contained">
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </div>
  );
};

export default Teachers;
