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
} from "@mui/icons-material";

import { SubjectInfo } from "../../types/subject.interface";
import useFetchPost from "../../hooks/useFetchPost";
import { useEffect } from "react";

const SubjectDetail = ({ open, subjectId, onClose }) => {
  const params = { id: subjectId };

  const { data, error, loading, fetchData } = useFetchPost<SubjectInfo>(
    "subjects/getSubject",
    params
  );

  useEffect(() => {
    if (open && subjectId) {
      fetchData();
    }
  }, [open, subjectId]);

  console.log(data);

  return (
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
          {/* <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            {editingName ? (
              <TextField
                autoFocus
                fullWidth
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSaveSubjectName} edge="end">
                        <SaveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {subjectName}
                </Typography>
                <IconButton color="inherit" onClick={() => setEditingName(true)}>
                  <EditIcon />
                </IconButton>
              </>
            )}
          </Box> */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        {/* <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Profesores" />
          <Tab label="Alumnos" />
        </Tabs> */}
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
          {data?.name}
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  {/* <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectDetail;
