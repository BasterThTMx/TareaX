import {
  Dialog,
  AppBar,
  Toolbar,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Tabs,
  Tab,
  DialogContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Fab,
} from "@mui/material";

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Search as SearchIcon,
  AccountCircle as AccountIcon,
} from "@mui/icons-material";

import { Subject, SubjectInfo } from "../../types/subject.interface";
import { useEffect, useState } from "react";
import useFetchPost from "../../hooks/useFetchPost";
import { Student } from "../../types/student.interface";
import { Teacher } from "../../types/teacher.interface";

const SubjectDetail = ({ open, subjectId, onClose }) => {
  const [value, setValue] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [studentsData, setStudentsData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const {
    data: subjectData,
    loading: subjectDataLoading,
    fetchPOST: subjectRequest,
  } = useFetchPost<Subject>();

  let params = { id: subjectId };
  let endpoint = "subjects/getSubject";
  useEffect(() => {
    if (open && subjectId) {
      subjectRequest(endpoint, params);
    }
  }, [subjectId, open]);

  const { data: studentsDataPOST, fetchPOST: requestStudents } =
    useFetchPost<Student>();

  const { data: teachersDataPOST, fetchPOST: requestTeachers } =
    useFetchPost<Teacher>();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!subjectData) return;
      const subject = subjectData[0];
      const studentIds = subject?.students ?? [];
      const teacherIds = subject?.teachers ?? [];

      if (studentIds.length > 0) {
        const result = await requestStudents(
          "students/getStudentsById",
          studentIds
        );
        setStudentsData(result);
      }

      if (teacherIds.length > 0) {
        const result = await requestTeachers(
          "teachers/getTeachersById",
          teacherIds
        );
        setTeachersData(result);
      }
    };

    fetchUsers();
  }, [subjectData]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let subjectDetails;

  // useEffect(() => {
  //   subjectRequest(endpoint, params);
  // }, [selectedUserId]);

  // const handleUserDetails = (userId: string) => {
  //   setSelectedUserId(userId);
  // };

  if (subjectData) {
    subjectDetails = subjectData[0] ?? [];
  }

  const currentData = value === 0 ? teachersData : studentsData;

  return (
    <div>
      {subjectDataLoading && <div>Cargando...</div>}
      {subjectData && (
        <Dialog
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              height: "90vh",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <AppBar position="static" color="default" elevation={0}>
            <Toolbar>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                {subjectData ? (
                  <TextField
                    autoFocus
                    fullWidth
                    value={subjectDetails.name}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end">
                            <SaveIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      {subjectDetails.name}
                    </Typography>
                    <IconButton color="inherit">
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </Box>
              <IconButton
                edge="end"
                color="inherit"
                onClick={onClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Maestros" />
              <Tab label="Alumnos" />
            </Tabs>
          </AppBar>
          <DialogContent
            dividers
            sx={{
              p: 0,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflow: "hidden",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "20px" }}
            >
              {/* {data?.name} */}
            </Typography>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre(s)</TableCell>
                    <TableCell>Apellido(s)</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Telefono</TableCell>
                    <TableCell align="right" sx={{ width: "36px" }}>
                      Información
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData?.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.firstName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.lastName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.phoneNumber}
                      </TableCell>
                      <TableCell align="center">
                        {/* <IconButton
                          color="primary"
                          onClick={() => handleUserDetails(row.id)}
                        >
                          <AccountIcon />
                        </IconButton> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SubjectDetail;
