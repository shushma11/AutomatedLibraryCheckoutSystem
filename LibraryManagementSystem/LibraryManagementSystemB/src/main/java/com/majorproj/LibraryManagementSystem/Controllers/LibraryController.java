package com.majorproj.LibraryManagementSystem.Controllers;

import com.majorproj.LibraryManagementSystem.Services.RfidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/library")
public class LibraryController {

    private static final int TOTAL_SEATS = 100; // fixed for now

    @Autowired
    private RfidService rfidService;

    @GetMapping("/info")
    public Map<String, Object> getLibraryInfo() {

        long studentsInside = rfidService.getStudentsInsideCount();

        return Map.of(
                "totalSeats", TOTAL_SEATS,
                "studentsInside", studentsInside,
                "lastUpdated", LocalDateTime.now()
        );
    }
}
