package com.monjaras.backend.student;

import com.monjaras.backend.subject.Subject;
import com.monjaras.backend.subject.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@RequiredArgsConstructor
@Service
public class StudentService {

    private final MongoTemplate mongoTemplate;
    private final StudentRepository studentRepository;

    public List<Student> getStudents() {
        BasicQuery query = new BasicQuery("{}");
        return mongoTemplate.find(query, Student.class);
    }

    public List<Student> getStudent(String id) {
        Query query = new Query(where("_id").is(new ObjectId(id)));
        return mongoTemplate.find(query, Student.class);
    }

    public List<Student> getStudentsById(List<String> ids) {
        List<ObjectId> objectIds = ids.stream()
                .map(ObjectId::new)
                .collect(Collectors.toList());

        Query query = new Query(Criteria.where("_id").in(objectIds));
        return mongoTemplate.find(query, Student.class);
    }

    public List<Student> addStudent(Student student) {
        return List.of(studentRepository.save(student));
    }

    public List<Student> updateStudent(Student student) {
        return List.of(studentRepository.save(student));
    }

    public void deleteStudent(Student student) {
        studentRepository.delete(student);
    }
}
