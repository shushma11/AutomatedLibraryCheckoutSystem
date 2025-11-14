package com.majorproj.LibraryManagementSystem.Controllers;
import com.majorproj.LibraryManagementSystem.Services.BookTransactionService;
import com.majorproj.LibraryManagementSystem.dto.BookTransactionResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class BookTransactionController {

    @Autowired
    private BookTransactionService transactionService;

    @GetMapping("/all")
    public List<BookTransactionResponseDTO> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/user/{userId}")
    public List<BookTransactionResponseDTO> getTransactionsByUser(@PathVariable Long userId) {
        return transactionService.getTransactionsByUser(userId);
    }

    @GetMapping("/book/{bookId}")
    public List<BookTransactionResponseDTO> getTransactionsByBook(@PathVariable Long bookId) {
        return transactionService.getTransactionsByBook(bookId);
    }
}
