package com.monjaras.backend.teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Teacher> getAll() {
        BasicQuery query = new BasicQuery("{}");
        return mongoTemplate.find(query, Teacher.class);
    }
}
