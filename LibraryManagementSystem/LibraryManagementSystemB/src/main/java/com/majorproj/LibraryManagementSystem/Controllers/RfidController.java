package com.majorproj.LibraryManagementSystem.Controllers;

import com.majorproj.LibraryManagementSystem.Services.RfidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

//@RestController
//@RequestMapping("/api/rfid")
//public class RfidController {
//
//    @Autowired
//    private RfidService rfidService;
//
//    /**
//     * ESP32 will call this API
//     * Example: POST /api/rfid/scan
//     */
//    @PostMapping("/scan")
//    public Map<String, String> scanRfid(@RequestBody Map<String, String> request) {
//
//        String rfidTagId = request.get("rfidTagId");
//        String message = rfidService.handleRfidScan(rfidTagId);
//
//        return Map.of("message", message);
//    }
//}





//Working till admin scan
//package com.majorproj.LibraryManagementSystem.Controllers;
//
//import com.majorproj.LibraryManagementSystem.Services.RfidService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/rfid")
//public class RfidController {
//
//    @Autowired
//    private RfidService rfidService;
//
//    // ESP32 → Backend
//    @PostMapping("/scan")
//    public Map<String, String> scanRfid(@RequestBody Map<String, String> request) {
//        String rfidTagId = request.get("rfidTagId");
//        String message = rfidService.handleRfidScan(rfidTagId);
//        return Map.of("message", message);
//    }
//
//    // Frontend → Get last scanned RFID (Admin signup)
//    @GetMapping("/latest")
//    public Map<String, String> getLatestRfid() {
//        return Map.of(
//                "rfidTagId", rfidService.getLastScannedRfid()
//        );
//    }
//}




// 🔹 ADMIN RFID SCAN (for signup)
//    @PostMapping("/scan-admin")
//    public ResponseEntity<?> scanByAdmin(
//            @RequestBody Map<String, String> req
//    ) {
//        String secretKey = req.get("secretKey");
//
//        if (secretKey == null || secretKey.isEmpty()) {
//            return ResponseEntity.badRequest()
//                    .body(Map.of("message", "Secret key required"));
//        }
//
//        String result = rfidService.handleAdminScan(secretKey);
//
//        if (result.equals("SECRET_KEY_INVALID")) {
//            return ResponseEntity.status(403)
//                    .body(Map.of("message", "Secret key incorrect"));
//        }
//
//        // ✅ DO NOT return rfidTagId here
//        return ResponseEntity.ok(
//                Map.of("message", "Admin verified. Scan RFID now.")
//        );
//    }



@RestController
@RequestMapping("/api/rfid")
public class RfidController {

    @Autowired
    private RfidService rfidService;

    @PostMapping("/scan-admin")
    public ResponseEntity<?> scanByAdmin(@RequestBody Map<String, String> req) {

        String secretKey = req.get("secretKey");

        String result = rfidService.handleAdminScan(secretKey);

        if (result.equals("SECRET_KEY_INVALID")) {
            return ResponseEntity.status(403).body(
                    Map.of("message", "Secret key incorrect")
            );
        }

        return ResponseEntity.ok(
                Map.of("message", "Admin verified. Scan RFID now.")
        );
    }


    @PostMapping("/scan")
    public ResponseEntity<?> scanByStudent(
            @RequestBody Map<String, String> req
    ) {
        String rfidTagId = req.get("rfidTagId");

        String result = rfidService.handleStudentScan(rfidTagId);

        return ResponseEntity.ok(Map.of("message", result));
    }


    // 🔹 STUDENT ENTRY / EXIT (ESP32)


    // 🔹 UI polls this
    @GetMapping("/latest")
    public ResponseEntity<?> getLatestRfid() {
        String rfid = rfidService.getLastScannedRfid();

        if (rfid == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "No RFID scanned"));
        }

        return ResponseEntity.ok(Map.of("rfidTagId", rfid));
    }
}


