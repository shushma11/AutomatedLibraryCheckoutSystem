package com.majorproj.LibraryManagementSystem.Services;

import com.majorproj.LibraryManagementSystem.Entities.Role;
import com.majorproj.LibraryManagementSystem.Entities.User;
import com.majorproj.LibraryManagementSystem.Repositories.UserRepository;
import com.majorproj.LibraryManagementSystem.dto.SignupRequest;
import com.majorproj.LibraryManagementSystem.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;


    @Value("${admin.secret.key}")
    private String adminSecretKey; // load from properties

    public User registerUser(SignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already in use");
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
                null
        );

        return userRepository.save(user);
    }

    public List<UserDTO> getAllStudents() {
        List<User> students = userRepository.findByRole(Role.STUDENT);
        return students.stream().map(UserDTO::new).collect(Collectors.toList());
    }

}