package com.crypto.server.currency;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CryptCurrencyController {
	private final ObjectMapper objectMapper = new ObjectMapper();

	@GetMapping("/api/currencies/")
	List<HashMap<String, String>> getCurrencies() throws JsonProcessingException {
		return Helpers.allCurrencies().stream().map(currency -> {
			HashMap<String, String> map = new HashMap<>();
			map.put("id", currency.id);
			map.put("name", currency.name);
			return map;
		}).collect(Collectors.toList());
	}

}
