package com.majorproj.LibraryManagementSystem.dto;

public class IssueRequestDTO {
    private Long userId;
    private Long bookId;
    private String rollNumber;

    public IssueRequestDTO(Long userId, Long bookId, String rollNumber) {
        this.userId = userId;
        this.bookId = bookId;
        this.rollNumber = rollNumber;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }
}
