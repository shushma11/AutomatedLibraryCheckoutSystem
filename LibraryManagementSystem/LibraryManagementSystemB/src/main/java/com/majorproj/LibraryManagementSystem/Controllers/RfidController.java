package com.majorproj.LibraryManagementSystem.Controllers;

import com.majorproj.LibraryManagementSystem.Services.RfidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/rfid")
public class RfidController {

    @Autowired
    private RfidService rfidService;

    /**
     * ESP32 will call this API
     * Example: POST /api/rfid/scan
     */
    @PostMapping("/scan")
    public Map<String, String> scanRfid(@RequestBody Map<String, String> request) {

        String rfidTagId = request.get("rfidTagId");
        String message = rfidService.handleRfidScan(rfidTagId);

        return Map.of("message", message);
    }
}
