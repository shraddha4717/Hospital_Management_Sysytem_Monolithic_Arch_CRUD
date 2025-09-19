package com.hms.service;

import java.util.List;

import com.hms.model.User;

public interface UserService {

	User createNew(User u);

	List<User> getAllUsers();

	void deleteData(Long id);

	User updateData(User user, Long id);

	
}
