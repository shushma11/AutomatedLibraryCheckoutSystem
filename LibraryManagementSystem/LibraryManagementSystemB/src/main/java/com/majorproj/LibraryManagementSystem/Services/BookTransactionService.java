package com.majorproj.LibraryManagementSystem.Services;

import com.majorproj.LibraryManagementSystem.Entities.User;
import com.majorproj.LibraryManagementSystem.Entities.Book;
import com.majorproj.LibraryManagementSystem.Repositories.BookTransactionRepository;
import com.majorproj.LibraryManagementSystem.Repositories.UserRepository;
import com.majorproj.LibraryManagementSystem.Repositories.BookRepository;
import com.majorproj.LibraryManagementSystem.dto.BookTransactionResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookTransactionService {

    @Autowired
    private BookTransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    public List<BookTransactionResponseDTO> getAllTransactions() {
        return transactionRepository.findAll()
                .stream()
                .map(BookTransactionResponseDTO::new)
                .collect(Collectors.toList());
    }

    public List<BookTransactionResponseDTO> getTransactionsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return transactionRepository.findByUser(user)
                .stream()
                .map(BookTransactionResponseDTO::new)
                .collect(Collectors.toList());
    }

    public List<BookTransactionResponseDTO> getTransactionsByBook(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return transactionRepository.findByBook(book)
                .stream()
                .map(BookTransactionResponseDTO::new)
                .collect(Collectors.toList());
    }
}
