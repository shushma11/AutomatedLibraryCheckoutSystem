package com.majorproj.LibraryManagementSystem.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // ADMIN or STUDENT

    // Student-specific fields
    private String rollNo;
    private String year;
    private String branch;
    private String section;

    @Column(unique = true)
    private String rfidTagId;


    // Relationship: one student can have many issued books
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<IssuedBook> issuedBooks;

    public User() {
    }

    public User(Long id, String name, String email, String password, Role role, String rollNo, String year, String branch, String section, String rfidTagId, List<IssuedBook> issuedBooks) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.rollNo = rollNo;
        this.year = year;
        this.branch = branch;
        this.section = section;
        this.rfidTagId = rfidTagId;
        this.issuedBooks = issuedBooks;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setFullName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public List<IssuedBook> getIssuedBooks() {
        return issuedBooks;
    }

    public void setIssuedBooks(List<IssuedBook> issuedBooks) {
        this.issuedBooks = issuedBooks;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRfidTagId() {
        return rfidTagId;
    }

    public void setRfidTagId(String rfidTagId) {
        this.rfidTagId = rfidTagId;
    }
}
