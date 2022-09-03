package com.crypto.server;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class EndPointTestTest {

	@Autowired
	EndPointTest endPointTest;

	@Autowired
	private MockMvc mockMvc;

	@Test
	@DisplayName("test endpoint")
	void testStatusOk() throws Exception {
		MvcResult response = mockMvc.perform(get("/api/test/"))
		                            .andExpect(status().isOk()).andReturn();
		System.out.println("response = " + response.getResponse());
	}
}
