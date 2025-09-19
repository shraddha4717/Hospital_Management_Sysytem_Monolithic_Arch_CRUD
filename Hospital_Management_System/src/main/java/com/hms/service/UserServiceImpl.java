package com.hms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.model.User;
import com.hms.repo.UserRepository;

@Service
public class UserServiceImpl implements UserService
{
	@Autowired
	UserRepository repository;
	
	@Override
	public User createNew(User u) {
		// TODO Auto-generated method stub
		return repository.save(u);
	}

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public void deleteData(Long id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);
	}

	@Override
	public User updateData(User user, Long id)
	{
		User byId = repository.findById(id).get();
		
		byId.setFirstName(user.getFirstName());
		byId.setLastName(user.getLastName());
		return repository.save(byId);
	}

	

}
