import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import {
  Book as BookIcon,
  Person as PersonIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import { SubjectInfo } from "../../types/subject.interface";
import { useState } from "react";
import SubjectDetail from "./SubjectDetail";

const SubjectCard = ({
  id,
  name,
  totalTeachers,
  totalStudents,
}: SubjectInfo) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [openDetail, setOpenDetail] = useState(false);

  const handleCardClick = (id: string) => {
    setSelectedSubject(id);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            transform: "translateY(-2px)",
          },
        }}
        onClick={() => handleCardClick(id)}
      >
        <CardHeader
          sx={{
            bgcolor: "#D5A7FF",
            color: "#393939",
            p: 2,
          }}
          avatar={
            <Avatar sx={{ bgcolor: "#000" }}>
              <BookIcon />
            </Avatar>
          }
          title={
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {name}
            </Typography>
          }
        />
        <CardContent sx={{ p: 2, flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon sx={{ color: "#000" }} />
              <Typography variant="body2">Profesores</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {totalTeachers}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SchoolIcon sx={{ color: "#000" }} />
              <Typography variant="body2">Alumnos</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {totalStudents}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {selectedSubject && (
        <SubjectDetail
          open={openDetail}
          subjectId={id}
          // subject={selectedSubject}
          onClose={handleCloseDetail}
          // onUpdate={handleUpdateSubject}
        />
      )}
    </>
  );
};

export default SubjectCard;
