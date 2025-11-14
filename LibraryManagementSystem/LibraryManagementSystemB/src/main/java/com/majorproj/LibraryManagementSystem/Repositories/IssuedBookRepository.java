package com.majorproj.LibraryManagementSystem.Repositories;

import com.majorproj.LibraryManagementSystem.Entities.Book;
import com.majorproj.LibraryManagementSystem.Entities.IssuedBook;
import com.majorproj.LibraryManagementSystem.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IssuedBookRepository extends JpaRepository<IssuedBook, Long> {
    List<IssuedBook> findByUser(User user);

    List<IssuedBook> findByBook(Book book);

    Optional<IssuedBook> findByUserAndBookAndReturnedFalse(User user, Book book);
    Optional<IssuedBook> findByIdAndUser(Long id, User user);


}
