package com.majorproj.LibraryManagementSystem.dto;

import com.majorproj.LibraryManagementSystem.Entities.IssuedBook;

public class IssuedBookResponseDTO {
    private Long id;
    private String issueDate;
    private String returnDate;
    private boolean returned;

    private String userName;
    private String userEmail;
    private String bookTitle;
    private String bookAuthor;

    public IssuedBookResponseDTO(IssuedBook issuedBook) {
        this.id = issuedBook.getId();
        this.issueDate = issuedBook.getIssueDate().toString();
        this.returnDate = issuedBook.getReturnDate() == null ? null : issuedBook.getReturnDate().toString();
        this.returned = issuedBook.isReturned();
        this.userName = issuedBook.getUser().getName();
        this.userEmail = issuedBook.getUser().getEmail();
        this.bookTitle = issuedBook.getBook().getTitle();
        this.bookAuthor = issuedBook.getBook().getAuthor();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
    }

    public String getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }

    public boolean isReturned() {
        return returned;
    }

    public void setReturned(boolean returned) {
        this.returned = returned;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getBookAuthor() {
        return bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }
}
