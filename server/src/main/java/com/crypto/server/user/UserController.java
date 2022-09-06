package com.crypto.server.user;

import com.crypto.server.currency.Currency;
import com.crypto.server.currency.Helpers;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserController {
	//	@SchemaMapping(typeName = "Query", value = "firstQuery")

	private final UserRepository userRepository;
	private final List<Currency> allCurrencies = Helpers.allCurrencies();

	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@QueryMapping
	public List<User> allUsers() {
		return userRepository.findAll();
	}

	@QueryMapping
	public User findUser(@Argument String userId) {
		return userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
	}

	@MutationMapping
	public String addUser(@Argument String user, @Argument List<String> currencies) {
		// save or update the current user
		List<String> currenciesMatched = allCurrencies.stream().map(Currency::getId)
		                                              .filter(
				                                              id -> currencies.stream().filter(id::equals).count() == 1)
		                                              .toList();
		User newUser = new User(user, currenciesMatched);
		userRepository.save(newUser);
		return "added User: " + user + " Currencies: " + currenciesMatched;
	}
}
