package com.majorproj.LibraryManagementSystem.Controllers;

import com.majorproj.LibraryManagementSystem.Services.BookService;
import com.majorproj.LibraryManagementSystem.Services.UserService;
import com.majorproj.LibraryManagementSystem.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/students")
    public List<UserDTO> getAllStudents() {
        return userService.getAllStudents(); // return basic info: id, name, rollNo, year, branch, section
    }

}
