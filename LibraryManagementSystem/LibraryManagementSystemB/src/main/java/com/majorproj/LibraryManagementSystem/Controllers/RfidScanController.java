package com.majorproj.LibraryManagementSystem.Controllers;

import com.majorproj.LibraryManagementSystem.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/rfid")
public class RfidScanController {

    private static String latestRfid = null;

    @Autowired
    private UserRepository userRepository;

    // Called by ESP32
    @PostMapping("/scan-temp")
    public ResponseEntity<?> scanTemp(@RequestBody Map<String, String> req) {

        String rfidTagId = req.get("rfidTagId");
        System.out.println(rfidTagId);
        if (rfidTagId == null || rfidTagId.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Invalid RFID"));
        }

        if (userRepository.findByRfidTagId(rfidTagId).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "RFID already assigned"));
        }

        // 🔥 STORE latest scanned RFID
        latestRfid = rfidTagId;

        return ResponseEntity.ok(Map.of("rfidTagId", rfidTagId));
    }


    @GetMapping("/latest-temp")
    public ResponseEntity<?> getLatestTemp() {

        if (latestRfid == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "No RFID scanned yet"));
        }

        return ResponseEntity.ok(Map.of("rfidTagId", latestRfid));
    }
}
