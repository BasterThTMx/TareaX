package com.monjaras.backend.dtos;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class SubjectInfoDTO {
    @Id
    private String id;
    private String name;
    private int totalStudents;
    private int totalTeachers;
}
