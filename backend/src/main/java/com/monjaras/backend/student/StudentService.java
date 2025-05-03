package com.monjaras.backend.student;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StudentService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Student> getAll() {
        BasicQuery query = new BasicQuery("{}");
        return mongoTemplate.find(query, Student.class);
    }
}
