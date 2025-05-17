package com.monjaras.backend.subject;

import com.monjaras.backend.dtos.SubjectInfoDTO;
import com.monjaras.backend.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {
    @Autowired
    private SubjectService subjectService;

    @GetMapping("/getSubjects")
    public List<Subject> getSubjects() {
        return subjectService.getSubjects();
    }

    @PostMapping("/getSubject")
    public List<Subject> getSubject(@RequestBody Map<String, Object> params) {
        String id = (String) params.get("id");
        return subjectService.getSubject(id);
    }

    @PostMapping("/getSubjectByName")
    public List<Subject> getSubjectByName(@RequestBody Subject params) {
        return subjectService.getSubjectByName(params.getName());
    }

    @GetMapping("/getSubjectsDetail")
    public List<SubjectInfoDTO> getSubjectsDetail() {
        return subjectService.getSubjectsDetail();
    }

    @PostMapping("/addSubject")
    public List<Subject> addSubject(@RequestBody Subject subject) {
        return subjectService.addSubject(subject);
    }

    @PostMapping("/updateSubject")
    public List<Subject> updateSubject(@RequestBody Subject subject) {
        return subjectService.updateSubject(subject);
    }

    @PostMapping("/deleteSubject")
    public void deleteSubject(@RequestBody Subject subject) {
        subjectService.deleteSubject(subject);
    }
}
