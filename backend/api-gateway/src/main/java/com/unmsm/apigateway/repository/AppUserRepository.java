package com.unmsm.apigateway.repository;

import com.unmsm.apigateway.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, String> {
    Optional<AppUser> findByUsername(String username);
}