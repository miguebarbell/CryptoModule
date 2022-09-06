package com.crypto.server.currency;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class CryptCurrencyController {
	private final ObjectMapper objectMapper = new ObjectMapper();


	@SchemaMapping(typeName = "Query", value = "availableCurrencies")
	public List<Currency> getCurrencies() {
		return Helpers.allCurrencies();
	}
}
