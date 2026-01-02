package com.majorproj.LibraryManagementSystem.Controllers;

import com.majorproj.LibraryManagementSystem.Services.IssuedBookService;
import com.majorproj.LibraryManagementSystem.dto.IssuedBookResponseDTO;
import com.majorproj.LibraryManagementSystem.dto.IssueRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/issued")
public class IssuedBookController {

    @Autowired
    private IssuedBookService issuedBookService;

    @PostMapping("/issue")
    public ResponseEntity<String> issueBook(@RequestBody IssueRequestDTO request) {
        return issuedBookService.issueBook2(
                request.getUserId(),
                request.getBookId(),
                request.getRollNumber()
        );
    }


    @PostMapping("/issue/{userId}/{bookId}")
    public String issueBook(@PathVariable Long userId, @PathVariable Long bookId) {
        return issuedBookService.issueBook(userId, bookId);
    }

//    @PutMapping("/return/{userId}/{bookId}")
//    public String returnBook(@PathVariable Long userId, @PathVariable Long bookId) {
//        return issuedBookService.returnBook(userId, bookId);
//    }

    @GetMapping("/all")
    public List<IssuedBookResponseDTO> getAllIssuedBooks() {
        return issuedBookService.getAllIssuedBooks();
    }

    @GetMapping("/user/{userId}")
    public List<IssuedBookResponseDTO> getIssuedBooksByUser(@PathVariable Long userId) {
        return issuedBookService.getIssuedBooksByUser(userId);
    }


    @PutMapping("/return/{userId}/{bookId}")
    public ResponseEntity<String> returnBook(@PathVariable Long userId,
                                             @PathVariable Long bookId,
                                             @RequestBody Map<String,String> body) {
        String rollNo = body.get("rollNumber");
        return issuedBookService.returnBook2(userId, bookId, rollNo);
    }

}
