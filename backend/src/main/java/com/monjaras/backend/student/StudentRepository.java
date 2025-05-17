package com.monjaras.backend.student;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends MongoRepository <Student, String> {
//    List<Student> findByName(String name);
//    Optional<Student> findById(String id);
}
