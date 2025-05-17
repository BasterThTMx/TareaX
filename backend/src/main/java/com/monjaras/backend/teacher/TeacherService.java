package com.monjaras.backend.teacher;

import com.monjaras.backend.student.Student;
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
public class TeacherService {

    private final MongoTemplate mongoTemplate;
    private final TeacherRepository teacherRepository;

    public List<Teacher> getTeachers() {
        return teacherRepository.findAll();
    }

//    public List<Student> getStudent(String id) {
//        Query query = new Query(where("_id").is(new ObjectId(id)));
//        return mongoTemplate.find(query, Student.class);
//    }

    public List<Teacher> addTeacher(Teacher teacher) {
        return List.of(teacherRepository.save(teacher));
    }

    public List<Teacher> updateTeacher(Teacher teacher) {
        return List.of(teacherRepository.save(teacher));
    }

    public void deleteTeacher(Teacher teacher) {
        teacherRepository.delete(teacher);
    }

    public List<Teacher> getTeachersById(List<String> ids) {
        List<ObjectId> objectIds = ids.stream()
                .map(ObjectId::new)
                .collect(Collectors.toList());

        Query query = new Query(Criteria.where("_id").in(objectIds));
        return mongoTemplate.find(query, Teacher.class);
    }
}
