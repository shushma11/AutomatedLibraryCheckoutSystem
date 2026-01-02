package com.majorproj.LibraryManagementSystem.Controllers;

import com.majorproj.LibraryManagementSystem.Services.BookService;
import com.majorproj.LibraryManagementSystem.Services.UserService;
import com.majorproj.LibraryManagementSystem.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/students")
    public List<UserDTO> getAllStudents() {
        return userService.getAllStudents(); // return basic info: id, name, rollNo, year, branch, section
    }
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserInfo(@PathVariable Long userId) {
        Map<String, String> userInfo = userService.getUserBasicInfo(userId);
        if (userInfo != null) {
            return ResponseEntity.ok(userInfo);
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

}
