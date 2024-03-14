package com.spare_parts.main.service;
 
import java.util.List;
 
import com.spare_parts.main.model.UserData;
 
public interface UserService {
 
	public List<UserData> findAll();
 
	public UserData findOne(int id);
 
	public UserData updateUser(UserData user, int id);
 
	public UserData newUser(UserData user);
 
	public void deleteUser(int id);
	
	public List<UserData> searchByName(String name);
}