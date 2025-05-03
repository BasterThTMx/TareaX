package com.monjaras.backend.teacher;

import com.monjaras.backend.dtos.SubjectDTO;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "teachers")
public class Teacher {
    @Id
    private String id;
    private String name;

    private List<SubjectDTO> subjects;
}
