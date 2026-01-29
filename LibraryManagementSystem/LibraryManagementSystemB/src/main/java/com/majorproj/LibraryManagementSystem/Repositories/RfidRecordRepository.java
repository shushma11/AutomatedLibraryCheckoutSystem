package com.majorproj.LibraryManagementSystem.Repositories;
import com.majorproj.LibraryManagementSystem.Entities.RfidRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RfidRecordRepository extends JpaRepository<RfidRecord, Long> {

    // Find last record of a user where exitTime is NULL (means currently inside)
    Optional<RfidRecord> findTopByUserIdAndExitTimeIsNullOrderByEntryTimeDesc(Long userId);
    RfidRecord findTopByUserRollNoOrderByEntryTimeDesc(String rollNo);
}