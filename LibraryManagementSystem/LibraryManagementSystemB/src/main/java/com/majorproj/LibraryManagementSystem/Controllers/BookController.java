package com.majorproj.LibraryManagementSystem.Controllers;

import com.majorproj.LibraryManagementSystem.Entities.Book;
import com.majorproj.LibraryManagementSystem.Services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
public class BookController {

    // ✅ Fetching admin secret key from application.properties
    @Value("${admin.secret.key}")
    private String adminSecretKey;

    @Autowired
    private BookService bookService;

    // ✅ Add new book (Admin only)
    @PostMapping("/add")
    public ResponseEntity<?> addBook(@RequestBody BookRequest bookRequest) {
        System.out.println(adminSecretKey+"       "+bookRequest.getSecretKey());
        if (!adminSecretKey.equals(bookRequest.getSecretKey())) {
            System.out.println(adminSecretKey+"       "+bookRequest.getSecretKey());
            return ResponseEntity.status(403).body("Access Denied: Invalid Secret Key");
        }

        Book book = new Book();
        book.setTitle(bookRequest.getTitle());
        book.setAuthor(bookRequest.getAuthor());
        book.setIsbn(bookRequest.getIsbn());
        book.setCategory(bookRequest.getCategory());
        book.setAvailable(bookRequest.getCount() != 0);
        book.setCount(bookRequest.getCount());
        Book savedBook = bookService.addBook(book);
        return ResponseEntity.ok(savedBook);
    }

    // 📚 Get all books
    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    // 🔍 Get book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
    }


    // ✏️ Update book (Admin only)
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody BookRequest bookRequest) {
        if (!adminSecretKey.equals(bookRequest.getSecretKey())) {
            return ResponseEntity.status(403).body("Access Denied: Invalid Secret Key");
        }

        Book updatedBook = new Book();
        updatedBook.setTitle(bookRequest.getTitle());
        updatedBook.setAuthor(bookRequest.getAuthor());
        updatedBook.setIsbn(bookRequest.getIsbn());
        updatedBook.setCategory(bookRequest.getCategory());
        updatedBook.setCount(bookRequest.getCount());

        return ResponseEntity.ok(bookService.updateBook(id, updatedBook));
    }


    // ❌ Delete book (Admin only)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id, @RequestParam String secretKey) {
        if (!adminSecretKey.equals(secretKey)) {
            return ResponseEntity.status(403).body("Access Denied: Invalid Secret Key");
        }
        bookService.deleteBook(id);
        return ResponseEntity.ok("Book deleted successfully");
    }

    @PostMapping("/scan")
    public ResponseEntity<?> scanBook(@RequestBody ScanBookRequest request) {

        Book book = bookService.getBookByIsbn(request.getIsbn())
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        if (book.getCount() <= 0) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Book not available"));
        }

// return book info including available count
        Map<String, Object> response = Map.of(
                "id", book.getId(),
                "title", book.getTitle(),
                "author", book.getAuthor(),
                "isbn", book.getIsbn(),
                "availableCount", book.getCount()
        );

        return ResponseEntity.ok(response);

    }

    // DTO for Request
    public static class BookRequest {
        private String title;
        private String author;
        private String isbn;
        private String category;
        private boolean available;
        private String secretKey;
        private int count;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getAuthor() { return author; }
        public void setAuthor(String author) { this.author = author; }

        public String getIsbn() { return isbn; }
        public void setIsbn(String isbn) { this.isbn = isbn; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public boolean isAvailable() { return available; }
        public void setAvailable(boolean available) { this.available = available; }

        public String getSecretKey() { return secretKey; }
        public void setSecretKey(String secretKey) { this.secretKey = secretKey; }

        public int getCount() {
            return count;
        }

        public void setCount(int count) {
            this.count = count;
        }
    }
    public static class ScanBookRequest {
        private String isbn;
        private String rollNo;

        public String getIsbn() { return isbn; }
        public void setIsbn(String isbn) { this.isbn = isbn; }

        public String getRollNo() { return rollNo; }
        public void setRollNo(String rollNo) { this.rollNo = rollNo; }
    }



}
