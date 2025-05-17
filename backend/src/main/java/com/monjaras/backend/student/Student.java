package com.monjaras.backend.student;

import com.monjaras.backend.dtos.SubjectDTO;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.CollectionCallback;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "students")
public class Student {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private String phoneNumber;
    private List<SubjectDTO> subjects;
}
