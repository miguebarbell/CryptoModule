package com.crypto.server;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
class ServerApplicationTests {

	@Autowired
	EndPointTest endPointTest;

	@Test
	@DisplayName("Context Loads")
	void contextLoads() {
		assertThat(endPointTest).isNotNull();
	}



}
