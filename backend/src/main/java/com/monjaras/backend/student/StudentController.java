package com.monjaras.backend.student;

import com.monjaras.backend.subject.Subject;
import com.monjaras.backend.subject.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/getStudents")
    public List<Student> getStudents() {
        return studentService.getStudents();
    }

    @PostMapping("/getStudent")
    public List<Student> getSubject(@RequestBody Map<String, Object> params) {
        String id = (String) params.get("id");
        return studentService.getStudent(id);
    }

    @PostMapping("/addStudent")
    public List<Student> addStudent(@RequestBody Student student) {
        student.setFullName(student.getFirstName() + " " + student.getLastName());
        return studentService.addStudent(student);
    }

    @PostMapping("/updateStudent")
    public List<Student> updateStudent(@RequestBody Student student) {
        student.setFullName(student.getFirstName() + " " + student.getLastName());
        return studentService.updateStudent(student);
    }

    @PostMapping("/getStudentsById")
    public List<Student> getStudentsById(@RequestBody List<String> ids) {
        return studentService.getStudentsById(ids);
    }

    @PostMapping("/deleteStudent")
    public void deleteStudent(@RequestBody Student student) {
        studentService.deleteStudent(student);
    }
}
