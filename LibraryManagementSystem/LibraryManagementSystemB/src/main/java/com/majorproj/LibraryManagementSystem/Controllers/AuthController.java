package com.majorproj.LibraryManagementSystem.Controllers;


import com.majorproj.LibraryManagementSystem.Entities.User;
import com.majorproj.LibraryManagementSystem.Repositories.UserRepository;
import com.majorproj.LibraryManagementSystem.Services.UserService;
import com.majorproj.LibraryManagementSystem.dto.AuthResponse;
import com.majorproj.LibraryManagementSystem.dto.LoginRequest;
import com.majorproj.LibraryManagementSystem.dto.SignupRequest;
import com.majorproj.LibraryManagementSystem.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
    private JwtUtil jwtUtil;


    @Autowired
    private UserService userService;


    @Autowired
    private UserRepository userRepository;


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        try {
            User saved = userService.registerUser(req);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
            );

            UserDetails ud = (UserDetails) auth.getPrincipal();
            User user = userRepository.findByEmail(ud.getUsername()).orElseThrow();

            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

            // Include user id in response
            return ResponseEntity.ok(new AuthResponse(token, user.getRole().name(), user.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

}
