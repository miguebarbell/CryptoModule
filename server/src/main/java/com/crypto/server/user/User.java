package com.crypto.server.user;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Builder
@Document(collection = "users")
public class User {
	@Id
	private String user;
	private List<String> currencies;

	public String getUser() {
		return user;
	}

	public User(String user, List<String> currencies) {
		this.user = user;
		this.currencies = currencies;
	}
}
