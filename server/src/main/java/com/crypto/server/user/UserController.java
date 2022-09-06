package com.crypto.server.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserController {
	//	@SchemaMapping(typeName = "Query", value = "firstQuery")
	@Autowired
	UserRepository userRepository;

	@QueryMapping
	public List<User> allUsers() {
		return userRepository.findAll();
	}
}
