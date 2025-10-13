package com.majorproj.LibraryManagementSystem.Entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rfid_records")
public class RfidRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rfidTagId; // scanned tag ID from Arduino

    private LocalDateTime entryTime;

    private LocalDateTime exitTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // link scanned tag to user

    public RfidRecord() {
    }

    public RfidRecord(Long id, String rfidTagId, LocalDateTime entryTime, LocalDateTime exitTime, User user) {
        this.id = id;
        this.rfidTagId = rfidTagId;
        this.entryTime = entryTime;
        this.exitTime = exitTime;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRfidTagId() {
        return rfidTagId;
    }

    public void setRfidTagId(String rfidTagId) {
        this.rfidTagId = rfidTagId;
    }

    public LocalDateTime getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(LocalDateTime entryTime) {
        this.entryTime = entryTime;
    }

    public LocalDateTime getExitTime() {
        return exitTime;
    }

    public void setExitTime(LocalDateTime exitTime) {
        this.exitTime = exitTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
