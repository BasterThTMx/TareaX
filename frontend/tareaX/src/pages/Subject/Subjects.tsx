import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { Subject, SubjectInfo } from "../../types/subject.interface";
import SubjectCard from "./SubjectCard";
import { Add, Height } from "@mui/icons-material";
import { useState } from "react";
import { Teacher } from "../../types/teacher.interface";
import { Student } from "../../types/student.interface";
import useFetchPost from "../../hooks/useFetchPost";

const Subjects = () => {
  const {
    data,
    error,
    loading,
    fetchGET: fetchSubjects,
  } = useFetch<SubjectInfo>("subjects/getSubjectsDetail");

  const {
    data: dataStudents,
    error: errorStudents,
    loading: loadingStudents,
    fetchGET: fetchStudents,
  } = useFetch<Student>("students/getStudents");

  const {
    data: dataTeachers,
    error: errorTeachers,
    loading: loadingTeachers,
    fetchGET: fetchTeachers,
  } = useFetch<Teacher>("teachers/getTeachers");

  const { fetchPOST } = useFetchPost<Subject>();
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentSubject, setcurrentSubject] = useState<Subject | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    teachers: [],
    students: [],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleOpenForm = (subject?: Subject) => {
    if (subject) {
      setcurrentSubject(subject);
      setFormData({
        name: subject.name,
        teachers: subject.teachers || [],
        students: subject.students || [],
      });
    } else {
      setcurrentSubject(null);
      setFormData({
        name: "",
        teachers: [],
        students: [],
      });
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleOpenDelete = (subject: Subject) => {
    setcurrentSubject(subject);
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

  const handleSelectChange = (e: SelectChangeEvent<string[]>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleSubmit = async () => {
    if (currentSubject) {
      const result = await fetchPOST("subjects/updateSubject", {
        id: currentSubject.id,
        name: formData.name,
        teachers: formData.teachers?.map((id) => id),
        students: formData.students?.map((id) => id),
      });

      if (!error) {
        fetchSubjects();
        setSnackbar({
          open: true,
          message: "Materia actualizada correctamente",
          severity: "success",
        });
      }
    } else {
      const result = await fetchPOST("subjects/addSubject", {
        name: formData.name,
        teachers: formData.teachers?.map((id) => id),
        students: formData.students?.map((id) => id),
      });
      if (!error) {
        fetchSubjects();
        setSnackbar({
          open: true,
          message: "Materia agregada correctamente",
          severity: "success",
        });
      }
    }
    handleCloseForm();
  };

  const handleDelete = async () => {
    if (currentSubject) {
      const result = await fetchPOST("subjects/deleteSubject", {
        ...formData,
        id: currentSubject.id,
      });

      if (!error) {
        setSnackbar({
          open: true,
          message: "Materia eliminada correctamente",
          severity: "success",
        });
        fetchSubjects();
      }
    }
    fetchSubjects();
    handleCloseDelete();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <div>
      {loading && <div>Cargando...</div>}
      {data && (
        <>
          <div className="flex flex-col w-full">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography variant="h4">Materias</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenForm()}
                sx={{ bgcolor: "#1976d2" }}
              >
                Nueva Materia
              </Button>
            </Box>
            <Grid
              container
              spacing={2}
              sx={{
                alignItems: "start",
                justifyContent: "start",
                height: "60vh",
              }}
            >
              {data
                ? data?.map((subject) => (
                    <Grid
                      key={subject.id}
                      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    >
                      <SubjectCard
                        id={subject.id}
                        name={subject.name}
                        totalStudents={subject.totalStudents}
                        totalTeachers={subject.totalTeachers}
                      ></SubjectCard>
                    </Grid>
                  ))
                : []}
              <Dialog
                open={openForm}
                onClose={handleCloseForm}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle>
                  {currentSubject ? "Editar Materia" : "Nueva Materia"}
                </DialogTitle>
                <DialogContent>
                  <Box component="form" sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Nombre"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="maestros-label">Maestros</InputLabel>
                      <Select
                        labelId="maestros-label"
                        multiple
                        name="teachers"
                        value={formData.teachers}
                        label="Maestros"
                        onChange={handleSelectChange}
                        renderValue={(selected) => {
                          return selected
                            .map((id) => {
                              const teacher = dataTeachers.find(
                                (m) => m.id === id
                              );
                              return teacher
                                ? `${teacher.firstName} ${teacher.lastName}`
                                : "";
                            })
                            .join(", ");
                        }}
                      >
                        {(dataTeachers ?? []).map((teacher) => (
                          <MenuItem key={teacher.id} value={teacher.id}>
                            {teacher.firstName} {teacher.lastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="alumnos-label">Alumnos</InputLabel>
                      <Select
                        labelId="alumnos-label"
                        multiple
                        name="students"
                        value={formData.students}
                        label="Alumnos"
                        onChange={handleSelectChange}
                        renderValue={(selected) => {
                          return selected
                            .map((id) => {
                              const student = dataStudents.find(
                                (a) => a.id === id
                              );
                              return student
                                ? `${student.firstName} ${student.lastName}`
                                : "";
                            })
                            .join(", ");
                        }}
                      >
                        {(dataStudents ?? []).map((student) => (
                          <MenuItem key={student.id} value={student.id}>
                            {student.firstName} {student.lastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseForm}>Cancelar</Button>
                  <Button onClick={handleSubmit} variant="contained">
                    {currentSubject ? "Actualizar" : "Crear"}
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default Subjects;
