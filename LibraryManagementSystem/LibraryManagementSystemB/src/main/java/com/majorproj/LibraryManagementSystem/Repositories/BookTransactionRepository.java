package com.majorproj.LibraryManagementSystem.Repositories;

import com.majorproj.LibraryManagementSystem.Entities.BookTransaction;
import com.majorproj.LibraryManagementSystem.Entities.User;
import com.majorproj.LibraryManagementSystem.Entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookTransactionRepository extends JpaRepository<BookTransaction, Long> {

    List<BookTransaction> findByUser(User user);

    List<BookTransaction> findByBook(Book book);

    List<BookTransaction> findByUserId(Long userId);

    List<BookTransaction> findByBookId(Long bookId);
}
