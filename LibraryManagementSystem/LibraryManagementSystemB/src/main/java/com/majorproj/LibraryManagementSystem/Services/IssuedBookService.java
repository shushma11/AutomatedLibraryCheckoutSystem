package com.majorproj.LibraryManagementSystem.Services;

import com.majorproj.LibraryManagementSystem.Entities.*;
import com.majorproj.LibraryManagementSystem.Repositories.*;
import com.majorproj.LibraryManagementSystem.dto.IssuedBookResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IssuedBookService {

    @Autowired
    private IssuedBookRepository issuedBookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookTransactionRepository transactionRepository;

    // ISSUE BOOK
    public String issueBook(Long userId, Long bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // Check if book has available copies
        if (book.getCount() <= 0) {
            return "Book not available right now.";
        }

        // Prevent the same user from issuing the same book twice without returning
        if (issuedBookRepository.findByUserAndBookAndReturnedFalse(user, book).isPresent()) {
            return "You have already issued this book and not returned it yet.";
        }


        // Create issued record
        IssuedBook issuedBook = new IssuedBook();
        issuedBook.setUser(user);
        issuedBook.setBook(book);
        issuedBook.setIssueDate(LocalDate.now());
        issuedBook.setReturned(false);
        issuedBookRepository.save(issuedBook);

        // Update book availability
        book.setCount(book.getCount() - 1);
        book.setAvailable(book.getCount() > 0);
        bookRepository.save(book);

        // Log transaction
        BookTransaction tx = new BookTransaction();
        tx.setActionType("ISSUE");
        tx.setTimestamp(LocalDateTime.now());
        tx.setUser(user);
        tx.setBook(book);
        tx.setRemarks("Book issued successfully");
        transactionRepository.save(tx);

        return "Book '" + book.getTitle() + "' issued to " + user.getName();
    }

    // RETURN BOOK (safe return per user + book)
    public String returnBook(Long userId, Long bookId) {
        // Fetch user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch book
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // Find the issued record for this user and book that is not yet returned
        IssuedBook issuedBook = issuedBookRepository.findByUserAndBookAndReturnedFalse(user, book)
                .orElseThrow(() -> new RuntimeException("This user has not issued this book or already returned it"));

        // Mark as returned
        issuedBook.setReturned(true);
        issuedBook.setReturnDate(LocalDate.now());
        issuedBookRepository.save(issuedBook);

        // Update book availability
        book.setCount(book.getCount() + 1);
        book.setAvailable(true);
        bookRepository.save(book);

        // Log transaction
        BookTransaction tx = new BookTransaction();
        tx.setActionType("RETURN");
        tx.setTimestamp(LocalDateTime.now());
        tx.setUser(user);
        tx.setBook(book);
        tx.setRemarks("Book returned successfully");
        transactionRepository.save(tx);

        return "Book '" + book.getTitle() + "' returned successfully by " + user.getName();
    }


    // Get all issued books
    public List<IssuedBookResponseDTO> getAllIssuedBooks() {
        return issuedBookRepository.findAll()
                .stream()
                .map(IssuedBookResponseDTO::new)
                .collect(Collectors.toList());
    }

    // Get books issued by a user
    public List<IssuedBookResponseDTO> getIssuedBooksByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return issuedBookRepository.findByUser(user)
                .stream()
                .map(IssuedBookResponseDTO::new)
                .collect(Collectors.toList());
    }
}
