package com.spare_parts.main.service;

 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
 
import com.spare_parts.main.exception.UserException;

import com.spare_parts.main.model.UserData;

import com.spare_parts.main.repository.UserDataRepository;
 
@Service

public class UserServiceImpl implements UserService{

	@Autowired

	private UserDataRepository userRepo;
	public List<UserData> findAll() {
		return userRepo.findAll();
	}

	public UserData findOne(int id) {
		return userRepo.findById(id)
				.orElseThrow(() -> new UserException("This User not found " + id));
	}

	public UserData newUser(UserData newUser) {
		UserData newUserEmail = userRepo.findByEmail(newUser.getEmail());
		if (newUserEmail == null) {
			return userRepo.save(newUser);
		} else {
			throw new UserException("This User has already in DB !");
		}
	}

	public UserData updateUser(UserData newUser, int id) {
		return userRepo.findById(id)
		.map(x->{
			return userRepo.save(newUser);
		}).orElseGet(()->{
			throw new UserException("Not found User");
		});
	}
	
	public List<UserData> searchByName(String name) {
		String fn = name;
		String ln = name;
//		SELECT * FROM Users WHERE firstname Like "%name%";
		return userRepo.findAllByFirstnameLikeOrLastnameLike("%"+fn+"%", "%"+ln+"%");
	}
 
	public void deleteUser(int id) {
		userRepo.deleteById(id);
	}

	public long countAll() {
		return userRepo.count();
	}

}
