package com.majorproj.LibraryManagementSystem.dto;
import com.majorproj.LibraryManagementSystem.Entities.User;

public class UserDTO {
    private Long id;
    private String name;
    private String rollNo;
    private String year;
    private String branch;
    private String section;

    public UserDTO(Long id, String name, String rollNo, String year, String branch, String section) {
        this.id = id;
        this.name = name;
        this.rollNo = rollNo;
        this.year = year;
        this.branch = branch;
        this.section = section;
    }

    public UserDTO() {
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.rollNo = user.getRollNo();
        this.year = user.getYear();
        this.branch = user.getBranch();
        this.section = user.getSection();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
