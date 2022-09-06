package com.crypto.server.user;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class UserController {
	//	@SchemaMapping(typeName = "Query", value = "firstQuery")
	@QueryMapping
	public String firstQuery() {
		return "first query";
	}
}
