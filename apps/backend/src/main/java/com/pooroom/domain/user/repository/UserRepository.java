package com.pooroom.domain.user.repository;

import com.pooroom.domain.user.entity.User;
import com.pooroom.domain.user.entity.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    
    Optional<User> findByEmailAndStatus(String email, UserStatus status);
    
    boolean existsByEmail(String email);
    
    Optional<User> findByNickname(String nickname);
    
    boolean existsByNickname(String nickname);

    @Query("SELECT u FROM User u WHERE u.email = :email AND u.status = :status")
    Optional<User> findActiveUserByEmail(@Param("email") String email, @Param("status") UserStatus status);
}