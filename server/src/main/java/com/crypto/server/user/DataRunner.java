package com.crypto.server.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataRunner implements CommandLineRunner {
	@Autowired
	UserRepository userRepository;

	@Override
	public void run(String... args) throws Exception {
		List<String> user1Currencies = new ArrayList<>();
		user1Currencies.add("BTC");
		user1Currencies.add("ETH");
		CryptoUser newuser1 = new CryptoUser("miguel@debloat.us", user1Currencies);
		userRepository.save(newuser1);
		List<String> user2Currencies = new ArrayList<>();

		user2Currencies.add("ETH");
		CryptoUser newuser2 = new CryptoUser("jerry@usmc.gov", user2Currencies);
		userRepository.save(newuser2);
	}
}
