package com.majorproj.LibraryManagementSystem.Controllers;

import com.majorproj.LibraryManagementSystem.Services.BookService;
import com.majorproj.LibraryManagementSystem.Services.UserService;
import com.majorproj.LibraryManagementSystem.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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

    @PostMapping("/{userId}/assign-rfid")
    public ResponseEntity<?> assignRfid(
            @PathVariable Long userId,
            @RequestBody Map<String, String> request) {

        userService.assignRfidToUser(userId, request.get("rfidTagId"));
        return ResponseEntity.ok("RFID assigned successfully");
    }

    @PostMapping("/check")
    public ResponseEntity<?> checkRfid(@RequestBody Map<String, String> request) {
        String uid = request.get("uid");
        boolean assigned = userService.isRfidAssigned(uid);

        Map<String, Object> response = new HashMap<>();
        response.put("uid", uid);
        response.put("status", assigned ? "ASSIGNED" : "UNASSIGNED");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/is-inside-library")
    public ResponseEntity<?> isUserInsideLibrary(@RequestBody Map<String, String> request) {

        String rollNo = request.get("rollNo"); // extract rollNo from JSON
        boolean inside = userService.isUserInsideLibrary(rollNo);

        Map<String, Object> response = new HashMap<>();
        response.put("rollNo", rollNo);
        response.put("insideLibrary", inside);

        return ResponseEntity.ok(response);
    }





}
