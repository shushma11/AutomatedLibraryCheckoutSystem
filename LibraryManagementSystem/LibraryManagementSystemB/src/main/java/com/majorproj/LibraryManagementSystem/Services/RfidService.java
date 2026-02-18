//package com.majorproj.LibraryManagementSystem.Services;
//
//import com.majorproj.LibraryManagementSystem.Entities.RfidRecord;
//import com.majorproj.LibraryManagementSystem.Entities.User;
//import com.majorproj.LibraryManagementSystem.Repositories.RfidRecordRepository;
//import com.majorproj.LibraryManagementSystem.Repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.Optional;
//
//@Service
//public class RfidService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private RfidRecordRepository rfidRecordRepository;
//
//    /**
//     * Called by ESP32 whenever RFID is scanned
//     */
//    public String handleRfidScan(String rfidTagId) {
//
//        // 1️⃣ Check if UID is assigned to any user
//        Optional<User> userOpt = userRepository.findByRfidTagId(rfidTagId);
//
//        if (userOpt.isEmpty()) {
//            return "UID: " + rfidTagId + " | NOT ASSIGNED";
//        }
//
//        User user = userOpt.get();
//
//        // 2️⃣ Check if user is already inside (exitTime = null)
//        Optional<RfidRecord> openRecord =
//                rfidRecordRepository.findTopByUserIdAndExitTimeIsNullOrderByEntryTimeDesc(user.getId());
//
//        if (openRecord.isPresent()) {
//            // EXIT
//            RfidRecord record = openRecord.get();
//            record.setExitTime(LocalDateTime.now());
//            rfidRecordRepository.save(record);
//
//            return "EXIT | " + user.getName();
//        } else {
//            // ENTRY
//            RfidRecord record = new RfidRecord();
//            record.setUser(user);
//            record.setRfidTagId(rfidTagId);
//            record.setEntryTime(LocalDateTime.now());
//
//            rfidRecordRepository.save(record);
//
//            return "ENTRY | " + user.getName();
//        }
//    }
//}



package com.majorproj.LibraryManagementSystem.Services;

import com.majorproj.LibraryManagementSystem.Entities.RfidRecord;
import com.majorproj.LibraryManagementSystem.Entities.User;
import com.majorproj.LibraryManagementSystem.Repositories.RfidRecordRepository;
import com.majorproj.LibraryManagementSystem.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;


@Service
public class RfidService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RfidRecordRepository rfidRecordRepository;
    private boolean adminScanPending = false;
    private String lastScannedRfid;
    @Value("${admin.secret.key}")
    private String adminSecretKey;

    // ================= ADMIN RFID ASSIGN =================
    public void storeAdminScannedRfid(String rfidTagId) {
        lastScannedRfid = rfidTagId;
    }

    public String getLastScannedRfid() {
        String rfid = lastScannedRfid;
        lastScannedRfid = null;
        return rfid;
    }

    // ================= STUDENT ENTRY / EXIT =================
    public String handleStudentScan(String rfidTagId) {

        if (adminScanPending) {
            lastScannedRfid = rfidTagId;
            adminScanPending = false;   // consume once
            return "ADMIN_RFID_CAPTURED";
        }

        // 1️⃣ Check if RFID belongs to any user
        User user = userRepository
                .findByRfidTagId(rfidTagId)
                .orElse(null);

        if (user == null) {
            return "UNKNOWN_RFID";
        }

        // 2️⃣ Get latest record for this RFID
        Optional<RfidRecord> lastRecordOpt =
                rfidRecordRepository
                        .findTopByRfidTagIdOrderByEntryTimeDesc(rfidTagId);

        LocalDateTime now = LocalDateTime.now();

        // 3️⃣ FIRST ENTRY (no record OR exit already done)
        if (lastRecordOpt.isEmpty()
                || lastRecordOpt.get().getExitTime() != null) {

            RfidRecord record = new RfidRecord();
            record.setRfidTagId(rfidTagId);
            record.setEntryTime(now);
            record.setUser(user);

            rfidRecordRepository.save(record);
            return "ENTRY_ALLOWED";
        }

        // 4️⃣ EXIT
        RfidRecord openRecord = lastRecordOpt.get();
        openRecord.setExitTime(now);
        rfidRecordRepository.save(openRecord);

        return "EXIT_RECORDED";
    }

    public String handleAdminScan(String secretKey) {
        if (adminSecretKey.equals(secretKey)) {
            adminScanPending = true;
            return "KEY_MATCHED";
        }
        return "SECRET_KEY_INVALID";
    }

    public long getStudentsInsideCount() {
        return rfidRecordRepository.countStudentsInside();
    }
}


//@Service
//public class RfidService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private RfidRecordRepository rfidRecordRepository;
//
//    // ⭐ stores last scanned unassigned RFID (for admin signup)
//    private String lastScannedRfid;
//
//    /**
//     * Called by ESP32 whenever RFID is scanned
//     */
//    public String handleRfidScan(String rfidTagId) {
//
//        Optional<User> userOpt = userRepository.findByRfidTagId(rfidTagId);
//
//        // 🔹 Case 1: RFID NOT YET ASSIGNED (Admin enrollment)
//        if (userOpt.isEmpty()) {
//            lastScannedRfid = rfidTagId;
//            return "UNASSIGNED | " + rfidTagId;
//        }
//
//        User user = userOpt.get();
//
//        // 🔹 Case 2: ENTRY / EXIT logic
//        Optional<RfidRecord> openRecord =
//                rfidRecordRepository
//                        .findTopByUserIdAndExitTimeIsNullOrderByEntryTimeDesc(user.getId());
//
//        if (openRecord.isPresent()) {
//            // EXIT
//            RfidRecord record = openRecord.get();
//            record.setExitTime(LocalDateTime.now());
//            rfidRecordRepository.save(record);
//
//            return "EXIT | " + user.getName();
//        } else {
//            // ENTRY
//            RfidRecord record = new RfidRecord();
//            record.setUser(user);
//            record.setRfidTagId(rfidTagId);
//            record.setEntryTime(LocalDateTime.now());
//
//            rfidRecordRepository.save(record);
//
//            return "ENTRY | " + user.getName();
//        }
//    }
//
//    // ⭐ Used by frontend to auto-fill signup form
//    public String getLastScannedRfid() {
//        return lastScannedRfid;
//    }
//}
