package com.monjaras.backend.subject;

import com.monjaras.backend.dtos.SubjectInfoDTO;
import com.monjaras.backend.student.Student;
import com.monjaras.backend.teacher.Teacher;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
@AllArgsConstructor
public class SubjectService {

    private final MongoTemplate mongoTemplate;
    private final SubjectRepository subjectRepository;

    public List<Subject> getSubjects() {
        Query query = new Query();
        return mongoTemplate.find(query, Subject.class);
    }

    public List<Subject> getSubjectByName(String name) {
        return subjectRepository.findByName(name);
    }

    public List<Subject> getSubject(String id) {
        Query query = new Query(where("_id").is(new ObjectId(id)));
        return mongoTemplate.find(query, Subject.class);
    }

    public List<Subject> addSubject(Subject subject) {
        Subject savedSubject = subjectRepository.save(subject);
        String subjectId = savedSubject.getId();

        List<ObjectId> studentIds = subject.getStudents().stream()
                .map(ObjectId::new)
                .collect(Collectors.toList());

        List<ObjectId> teacherIds = subject.getTeachers().stream()
                .map(ObjectId::new)
                .collect(Collectors.toList());

        Query studentQuery = new Query(Criteria.where("_id").in(studentIds));
        Update studentUpdate = new Update().addToSet("subjects", subjectId);
        mongoTemplate.updateMulti(studentQuery, studentUpdate, Student.class);

        Query teacherQuery = new Query(Criteria.where("_id").in(teacherIds));
        Update teacherUpdate = new Update().addToSet("subjects", subjectId);
        mongoTemplate.updateMulti(teacherQuery, teacherUpdate, Teacher.class);

        return List.of(savedSubject);
    }


    public List<Subject> updateSubject(Subject subject) {
        return List.of(subjectRepository.save(subject));
    }

    public void deleteSubject(Subject subject) {
        subjectRepository.delete(subject);
    }

    public List<SubjectInfoDTO> getSubjectsDetail() {
        List<Subject> subjects = getSubjects();
        return (List<SubjectInfoDTO>) subjects.stream().map(subject -> {
            int studentCount = subject.getStudents() != null ? subject.getStudents().size() : 0;
            int teacherCount = subject.getTeachers() != null ? subject.getTeachers().size() : 0;
            return new SubjectInfoDTO(subject.getId(), subject.getName(), studentCount, teacherCount);
        }).collect(Collectors.toList());
    }
}
