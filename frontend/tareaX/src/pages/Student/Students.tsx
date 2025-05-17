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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
  TablePagination,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { Student } from "../../types/student.interface";
import { useState } from "react";
import useFetchPost from "../../hooks/useFetchPost";

const Students = () => {
  const {
    data,
    error,
    loading,
    fetchGET: fetchStudents,
  } = useFetch<Student>("students/getStudents");
  const { fetchPOST } = useFetchPost<Student>();
  const [openForm, setOpenForm] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subjects: [],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenForm = (student?: Student) => {
    if (student) {
      setCurrentStudent(student);
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phoneNumber: student.phoneNumber,
        subjects: [student.subjects],
      });
    } else {
      setCurrentStudent(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        subjects: [],
      });
    }
    setOpenForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleOpenDelete = (student: Student) => {
    setCurrentStudent(student);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    if (currentStudent) {
      const result = await fetchPOST("students/deleteStudent", {
        ...formData,
        id: currentStudent.id,
      });

      if (!error) {
        setSnackbar({
          open: true,
          message: "Alumno eliminado correctamente",
          severity: "success",
        });
        fetchStudents();
      }
    }
    fetchStudents();
    handleCloseDelete();
  };

  const handleSubmit = async () => {
    if (currentStudent) {
      const result = await fetchPOST("students/updateStudent", {
        ...formData,
        id: currentStudent.id,
      });

      if (!error) {
        fetchStudents();
        setSnackbar({
          open: true,
          message: "Alumno actualizado correctamente",
          severity: "success",
        });
      }
    } else {
      const result = await fetchPOST("students/addStudent", { ...formData });
      if (!error) {
        fetchStudents();
        setSnackbar({
          open: true,
          message: "Alumno agregado correctamente",
          severity: "success",
        });
      }
    }
    handleCloseForm();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedAlumnos = data
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
            <Typography variant="h4">Alumnos</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenForm()}
            >
              Nuevo Alumno
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
                {paginatedAlumnos.length > 0 ? (
                  paginatedAlumnos.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.firstName}</TableCell>
                      <TableCell>{student.lastName}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phoneNumber}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenForm(student)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleOpenDelete(student)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No hay alumnos registrados
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
              {currentStudent ? "Editar Alumno" : "Nuevo Alumno"}
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
                {currentStudent ? "Actualizar" : "Crear"}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar a{" "}
                {currentStudent?.fullName}? Esta acción no se puede deshacer.
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

export default Students;
