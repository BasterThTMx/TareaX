package com.monjaras.backend.subject;

import com.monjaras.backend.dtos.SubjectInfoDTO;
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

    @GetMapping("/getSubjectsInfo")
    public List<SubjectInfoDTO> getSubjectsInfo() {
        return subjectService.getSubjectsInfo();
    }
}
