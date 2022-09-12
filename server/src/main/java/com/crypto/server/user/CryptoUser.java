package com.crypto.server.user;

//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.data.annotation.Id;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

//@Data
//@NoArgsConstructor
//@Builder
//@Document(collection = "users")
@Entity
public class CryptoUser {
//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
//	private int id;

	@Id
	@Column
	private String userEmail;
	@ElementCollection
	@Column
	private List<String> currencies;

	public CryptoUser() {

	}


	public CryptoUser(String user, List<String> currencies) {
		this.userEmail = user;
		this.currencies = currencies;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public List<String> getCurrencies() {
		return currencies;
	}
}
