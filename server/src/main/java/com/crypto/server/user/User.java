package com.crypto.server.user;

import com.crypto.server.currency.CryptCurrency;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "users")
public class User {

	private ObjectId id;
	private String user;
	private List<CryptCurrency> currencies;
}
