package com.crypto.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EndPointTest {
	@GetMapping("/api/test")
	public String test() {
		String response = "OK";
		return response;
	}
}
