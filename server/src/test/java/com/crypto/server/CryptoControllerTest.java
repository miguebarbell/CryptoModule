import com.crypto.server.EndPointTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class CryptoControllerTest {
	@Autowired
	EndPointTest endPointTest;

	@Autowired
	private MockMvc mockMvc;

	@Test
	@DisplayName("test endpoint")
	void testStatusOk throws Exception {
		MvcResult response = mockMvc.perform(get("/api/test/"))
				.andExpect(status().isOk())
		System.out.println("response = " + response.getResponse());
	}
}
