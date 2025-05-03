package com.monjaras.backend.subject;

import com.monjaras.backend.dtos.StudentDTO;
import com.monjaras.backend.dtos.TeacherDTO;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "subjects")
public class Subject {
    @Id
    private String id;
    private String name;

    private List<TeacherDTO> teachers;
    private List<StudentDTO> students;
}
