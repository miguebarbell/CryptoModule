package com.crypto.server;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootApplication
public class ServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Configuration
	public static class MongoDBConfiguration {
		private final String dbName = "crypto";
		//		private String portNumber = "27017";
		private final String serverName = "crypto";
		private final String pass = "PAhFmAvdQAJYSCXa";

		@Bean
		public MongoClient mongo() {

			ConnectionString connectionString = new ConnectionString("mongodb+srv://" + serverName + ":" + pass +
					">@cluster0.fwthgzu.mongodb.net/?retryWrites=true&w=majority");
			MongoClientSettings settings = MongoClientSettings.builder()
			                                                  .applyConnectionString(connectionString)
			                                                  .build();
			return MongoClients.create(settings);
		}

		@Bean
		public MongoTemplate mongoTemplate() throws Exception {
			return new MongoTemplate(mongo(), dbName);
		}
	}
}
