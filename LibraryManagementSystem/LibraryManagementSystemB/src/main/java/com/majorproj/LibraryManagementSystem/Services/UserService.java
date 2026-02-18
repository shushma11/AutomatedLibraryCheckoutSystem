package com.majorproj.LibraryManagementSystem.Services;

import com.majorproj.LibraryManagementSystem.Entities.RfidRecord;
import com.majorproj.LibraryManagementSystem.Entities.Role;
import com.majorproj.LibraryManagementSystem.Entities.User;
import com.majorproj.LibraryManagementSystem.Repositories.RfidRecordRepository;
import com.majorproj.LibraryManagementSystem.Repositories.UserRepository;
import com.majorproj.LibraryManagementSystem.dto.SignupRequest;
import com.majorproj.LibraryManagementSystem.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RfidRecordRepository rfidRecordRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Value("${admin.secret.key}")
    private String adminSecretKey; // load from properties

//    public User registerUser(SignupRequest req) {
//        if (userRepository.existsByEmail(req.getEmail())) {
//            throw new RuntimeException("Email already in use");
//        }
//
//        Role role;
//
//        if ("ADMIN".equalsIgnoreCase(req.getRole())) {
//            if (req.getSecretKey() == null || !req.getSecretKey().equals(adminSecretKey)) {
//                throw new RuntimeException("Invalid admin secret key — access denied.");
//            }
//            role = Role.ADMIN;
//        } else {
//            role = Role.STUDENT;
//        }
//
//        User user = new User(
//                null,
//                req.getName(),
//                req.getEmail(),
//                passwordEncoder.encode(req.getPassword()),
//                role,
//                req.getRollNo(),
//                req.getYear(),
//                req.getBranch(),
//                req.getSection(),
//                req.getRfidTagId(),
//                null
//        );
//
//        return userRepository.save(user);
//    }

    public User registerUser(SignupRequest req) {

        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        // 🔒 Prevent duplicate RFID assignment
        if (req.getRfidTagId() != null &&
                userRepository.findByRfidTagId(req.getRfidTagId()).isPresent()) {
            throw new RuntimeException("RFID already assigned to another student");
        }

        Role role;

        if ("ADMIN".equalsIgnoreCase(req.getRole())) {
            if (req.getSecretKey() == null || !req.getSecretKey().equals(adminSecretKey)) {
                throw new RuntimeException("Invalid admin secret key — access denied.");
            }
            role = Role.ADMIN;
        } else {
            role = Role.STUDENT;
        }

        User user = new User(
                null,
                req.getName(),
                req.getEmail(),
                passwordEncoder.encode(req.getPassword()),
                role,
                req.getRollNo(),
                req.getYear(),
                req.getBranch(),
                req.getSection(),
                req.getRfidTagId(),
                null
        );

        return userRepository.save(user);
    }


    public List<UserDTO> getAllStudents() {
        List<User> students = userRepository.findByRole(Role.STUDENT);
        return students.stream().map(UserDTO::new).collect(Collectors.toList());
    }

    public Map<String, String> getUserBasicInfo(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Map<String, String> response = new HashMap<>();
            response.put("name", user.getName());
            response.put("rollNumber", user.getRollNo());
            return response;
        } else {
            return null; // or throw exception
        }
    }

    public void assignRfidToUser(Long userId, String rfidTagId) {

        // 1️⃣ Check if RFID is already assigned
        Optional<User> existingUser = userRepository.findByRfidTagId(rfidTagId);
        if (existingUser.isPresent()) {
            throw new RuntimeException("RFID already assigned to another student");
        }

        // 2️⃣ Fetch student
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3️⃣ Assign RFID
        user.setRfidTagId(rfidTagId);
        userRepository.save(user);
    }

    public boolean isRfidAssigned(String rfidTagId) {
        return userRepository.findByRfidTagId(rfidTagId).isPresent();
    }

//    public boolean isUserInsideLibrary(String rollNo) {
//
//        // Get last RFID record for the user
//        RfidRecord lastRecord =
//                rfidRecordRepository
//                        .findTopByUserRollNoOrderByEntryTimeDesc(rollNo);
//
//        // If last entry exists and exitTime is null → inside
//        return lastRecord != null && lastRecord.getExitTime() == null;
//    }
public boolean isUserInsideLibrary(String rollNo) {

    User user1 =  userRepository.findByRollNo(rollNo)
            .orElseThrow(() -> new RuntimeException("User not found"));

    RfidRecord lastRecord =
            rfidRecordRepository.findTopByUserOrderByEntryTimeDesc(user1);

    return lastRecord != null && lastRecord.getExitTime() == null;
}



}