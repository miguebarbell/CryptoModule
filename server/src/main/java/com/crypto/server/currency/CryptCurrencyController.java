package com.crypto.server.currency;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.core.env.Environment;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@Controller
public class CryptCurrencyController {
	private final ObjectMapper objectMapper = new ObjectMapper();
	//	private final Environment env;
	private final String API_KEY;
	HttpClient httpClient = HttpClient.newHttpClient();

	public CryptCurrencyController(Environment env) {
//		this.env = env;
		this.API_KEY = env.getProperty("API_KEY");
	}

	@SchemaMapping(typeName = "Query", value = "daily")
	public JSONObject timeSeries(@Argument String currency) throws IOException, InterruptedException, JSONException {
		// todo: return the neccesary information to the client
		// todo: make a way to create a cache so don't make unnecessary external requests

		URI uri = URI.create("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol="
				+ currency + "&market=USD" + "&apikey=" + API_KEY);
		HttpRequest request = HttpRequest.newBuilder().uri(uri).GET().build();
		HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
		JSONObject json = new JSONObject(response.body());
		Object metadata = new JSONObject(String.valueOf(json.get("Meta Data")));
		System.out.println("metadata.getClass() = " + metadata.getClass());
		System.out.println("metadata = " + metadata);
//		System.out.println("Meta Data = " + json.get("Meta Data"));
//		System.out.println("Time Series = " + json.get("Time Series (Digital Currency Daily)"));
		return json;
	}

	@SchemaMapping(typeName = "Query", value = "news")
	public List<News> getNews(@Argument List<String> currencies) throws IOException, InterruptedException, JSONException {
		List<News> news = new ArrayList<>();
		String currenciesUri = "";
		for (int i = 0; i < currencies.size(); i++) {
			currenciesUri = currenciesUri.concat("CRYPTO:" + currencies.get(i));
			if (i != currencies.size() - 1) {
				currenciesUri = currenciesUri.concat(",");
			}
		}
		URI uri = URI.create("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=" + currenciesUri +
				"&limit=1&apikey=" + API_KEY);
		HttpRequest request = HttpRequest.newBuilder().uri(uri).GET().build();
		HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
		JSONObject json = new JSONObject(response.body());
		JSONArray feed = json.getJSONArray("feed");
		for (int i = 0; i < feed.length(); i++) {
			String title = feed.getJSONObject(i).getString("title");
			String url = feed.getJSONObject(i).getString("url");
			String summary = feed.getJSONObject(i).getString("summary");
			String imageUrl = feed.getJSONObject(i).getString("banner_image");
			String source = feed.getJSONObject(i).getString("source");
			String date = feed.getJSONObject(i).getString("time_published");
			news.add(new News(title, url, summary, imageUrl, source, date));
		}
		return news;
	}

	@SchemaMapping(typeName = "Query", value = "availableCurrencies")
	public List<Currency> getCurrencies() {
		return Helpers.allCurrencies();
	}


}
