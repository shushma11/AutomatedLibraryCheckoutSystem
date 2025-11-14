package com.majorproj.LibraryManagementSystem.dto;

import com.majorproj.LibraryManagementSystem.Entities.BookTransaction;
import java.time.LocalDateTime;

public class BookTransactionResponseDTO {

    private Long transactionId;
    private String actionType; // ISSUE / RETURN
    private LocalDateTime timestamp;
    private Long userId;
    private String userName;
    private String userRollNo;
    private String userYear;
    private String userBranch;
    private Long bookId;
    private String bookTitle;
    private String remarks;

    public BookTransactionResponseDTO(BookTransaction transaction) {
        this.transactionId = transaction.getId();
        this.actionType = transaction.getActionType();
        this.timestamp = transaction.getTimestamp();
        this.userId = transaction.getUser().getId();
        this.userName = transaction.getUser().getName();
        this.userRollNo = transaction.getUser().getRollNo();   // new
        this.userYear = transaction.getUser().getYear();       // new
        this.userBranch = transaction.getUser().getBranch();   // new
        this.bookId = transaction.getBook().getId();
        this.bookTitle = transaction.getBook().getTitle();
        this.remarks = transaction.getRemarks();
    }

    // Getters and Setters
    public Long getTransactionId() { return transactionId; }
    public void setTransactionId(Long transactionId) { this.transactionId = transactionId; }

    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserRollNo() { return userRollNo; }
    public void setUserRollNo(String userRollNo) { this.userRollNo = userRollNo; }

    public String getUserYear() { return userYear; }
    public void setUserYear(String userYear) { this.userYear = userYear; }

    public String getUserBranch() { return userBranch; }
    public void setUserBranch(String userBranch) { this.userBranch = userBranch; }

    public Long getBookId() { return bookId; }
    public void setBookId(Long bookId) { this.bookId = bookId; }

    public String getBookTitle() { return bookTitle; }
    public void setBookTitle(String bookTitle) { this.bookTitle = bookTitle; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
