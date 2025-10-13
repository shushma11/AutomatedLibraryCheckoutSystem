package com.majorproj.LibraryManagementSystem.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    private String isbn; // optional, can be barcode/unique id

    private boolean available; // true if book is in library

    private String category; // example: Programming, Fiction, etc.

    // For real-time tracking of who borrowed it
    @ManyToOne
    @JoinColumn(name = "borrowed_by_id")
    private User borrowedBy;

    public Book() {
    }

    public Book(Long id, String title, String author, String isbn, boolean available, String category, User borrowedBy) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.available = available;
        this.category = category;
        this.borrowedBy = borrowedBy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public User getBorrowedBy() {
        return borrowedBy;
    }

    public void setBorrowedBy(User borrowedBy) {
        this.borrowedBy = borrowedBy;
    }
}