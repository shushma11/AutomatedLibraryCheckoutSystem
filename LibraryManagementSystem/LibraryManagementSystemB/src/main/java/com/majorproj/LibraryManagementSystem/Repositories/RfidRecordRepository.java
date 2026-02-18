//package com.majorproj.LibraryManagementSystem.Repositories;
//import com.majorproj.LibraryManagementSystem.Entities.RfidRecord;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.Optional;
//
//public interface RfidRecordRepository extends JpaRepository<RfidRecord, Long> {
//
//    // Find last record of a user where exitTime is NULL (means currently inside)
//    Optional<RfidRecord> findTopByUserIdAndExitTimeIsNullOrderByEntryTimeDesc(Long userId);
//    RfidRecord findTopByUserRollNoOrderByEntryTimeDesc(String rollNo);
//}

package com.majorproj.LibraryManagementSystem.Repositories;

import com.majorproj.LibraryManagementSystem.Entities.RfidRecord;
import com.majorproj.LibraryManagementSystem.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

//public interface RfidRecordRepository extends JpaRepository<RfidRecord, Long> {
//
//    // For ENTRY / EXIT toggle
//    Optional<RfidRecord> findTopByUserIdAndExitTimeIsNullOrderByEntryTimeDesc(String rollNo);
//
//    // For checking last activity
//    RfidRecord findTopByUser_IdOrderByEntryTimeDesc(Long userId);
//}
public interface RfidRecordRepository extends JpaRepository<RfidRecord, Long> {

    // Find last RFID record for a user
    RfidRecord findTopByUserOrderByEntryTimeDesc(User user);

    // Find active entry (no exit yet)
    Optional<RfidRecord> findTopByUserAndExitTimeIsNull(User user);

    Optional<RfidRecord> findTopByUserIdAndExitTimeIsNullOrderByEntryTimeDesc(Long id);

    Optional<RfidRecord> findTopByRfidTagIdOrderByEntryTimeDesc(String rfidTagId);

    @Query("""
        SELECT COUNT(r)
        FROM RfidRecord r
        WHERE r.entryTime IS NOT NULL
        AND r.exitTime IS NULL
    """)
    long countStudentsInside();
}
