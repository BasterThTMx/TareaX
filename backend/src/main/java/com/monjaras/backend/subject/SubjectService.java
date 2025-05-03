package com.monjaras.backend.subject;

import com.monjaras.backend.dtos.SubjectInfoDTO;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class SubjectService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Subject> getSubjects() {
        Query query = new Query();
        return mongoTemplate.find(query, Subject.class);
    }

    public List<Subject> getSubject(String id) {
        Query query = new Query(where("_id").is(new ObjectId(id)));
        return mongoTemplate.find(query, Subject.class);
    }

    public List<SubjectInfoDTO> getSubjectsInfo() {
        List<Subject> subjects = getSubjects();
        return (List<SubjectInfoDTO>) subjects.stream().map(subject -> {
            int studentCount = subject.getStudents() != null ? subject.getStudents().size() : 0;
            int teacherCount = subject.getTeachers() != null ? subject.getTeachers().size() : 0;
            return new SubjectInfoDTO(subject.getId(), subject.getName(), studentCount, teacherCount);
        }).collect(Collectors.toList());
    }
}
