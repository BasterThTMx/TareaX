package com.monjaras.backend.teacher;

import com.monjaras.backend.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @GetMapping("/getTeachers")
    public List<Teacher> getTeachers() {
        return teacherService.getTeachers();
    }

    @PostMapping("/addTeacher")
    public List<Teacher> addTeacher(@RequestBody Teacher teacher) {
        teacher.setFullName(teacher.getFirstName() + " " + teacher.getLastName());
        return teacherService.addTeacher(teacher);
    }

    @PostMapping("/updateTeacher")
    public List<Teacher> updateTeacher(@RequestBody Teacher teacher) {
        teacher.setFullName(teacher.getFirstName() + " " + teacher.getLastName());
        return teacherService.updateTeacher(teacher);
    }

    @PostMapping("/deleteTeacher")
    public void deleteTeacher(@RequestBody Teacher teacher) {
        teacherService.deleteTeacher(teacher);
    }

    @PostMapping("/getTeachersById")
    public List<Teacher> getTeachersById(@RequestBody List<String> ids) {
        return teacherService.getTeachersById(ids);
    }
}
