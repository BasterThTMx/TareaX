import { Grid } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { SubjectInfo } from "../../types/subject.interface";
import SubjectCard from "./SubjectCard";

const Subjects = () => {
  const {
    data: subjectData,
    error: subjectError,
    loading: subjectLoading,
  } = useFetch<SubjectInfo>("subjects/getSubjectsInfo");
  return (
    <Grid container spacing={2}>
      {subjectData?.map((subject) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <SubjectCard
            id={subject.id}
            name={subject.name}
            totalStudents={subject.totalStudents}
            totalTeachers={subject.totalTeachers}
          ></SubjectCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Subjects;
