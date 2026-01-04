package com.majorproj.LibraryManagementSystem.Services;

import com.majorproj.LibraryManagementSystem.Entities.RfidRecord;
import com.majorproj.LibraryManagementSystem.Entities.User;
import com.majorproj.LibraryManagementSystem.Repositories.RfidRecordRepository;
import com.majorproj.LibraryManagementSystem.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class RfidService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RfidRecordRepository rfidRecordRepository;

    /**
     * Called by ESP32 whenever RFID is scanned
     */
    public String handleRfidScan(String rfidTagId) {

        // 1️⃣ Check if UID is assigned to any user
        Optional<User> userOpt = userRepository.findByRfidTagId(rfidTagId);

        if (userOpt.isEmpty()) {
            return "UID: " + rfidTagId + " | NOT ASSIGNED";
        }

        User user = userOpt.get();

        // 2️⃣ Check if user is already inside (exitTime = null)
        Optional<RfidRecord> openRecord =
                rfidRecordRepository.findTopByUserIdAndExitTimeIsNullOrderByEntryTimeDesc(user.getId());

        if (openRecord.isPresent()) {
            // EXIT
            RfidRecord record = openRecord.get();
            record.setExitTime(LocalDateTime.now());
            rfidRecordRepository.save(record);

            return "EXIT | " + user.getName();
        } else {
            // ENTRY
            RfidRecord record = new RfidRecord();
            record.setUser(user);
            record.setRfidTagId(rfidTagId);
            record.setEntryTime(LocalDateTime.now());

            rfidRecordRepository.save(record);

            return "ENTRY | " + user.getName();
        }
    }
}
