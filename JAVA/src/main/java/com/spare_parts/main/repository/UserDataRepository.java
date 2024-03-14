package com.spare_parts.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spare_parts.main.model.UserData;

public interface UserDataRepository extends JpaRepository<UserData, Integer> {
	UserData findByEmail(String email);
    List<UserData> findAllByFirstnameLikeOrLastnameLike(String fn, String ln);
}