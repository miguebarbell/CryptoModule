package com.crypto.server.currency;

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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Controller
public class CryptCurrencyController {
	//	private final ObjectMapper objectMapper = new ObjectMapper();
	private final String API_KEY;
	private final List<Cache> cache = new ArrayList<>();
	HttpClient httpClient = HttpClient.newHttpClient();

	public CryptCurrencyController(Environment env) {
		this.API_KEY = env.getProperty("API_KEY");
	}

	@SchemaMapping(typeName = "Query", value = "cryptoDaily")
	public List<DailyValue> timeSeries(@Argument String currency) throws IOException, InterruptedException, JSONException {
		for (Cache cachedElement : cache) {
			if (cachedElement.getCurrency().equals(currency) && cachedElement.getUpdated().equals(LocalDate.now())) {
				System.out.println("CACHED!!");
				return cachedElement.getValues();
			}
		}
		System.out.println("getting daily from API: " + currency);
		URI uri = URI.create("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol="
				+ currency + "&market=USD" + "&apikey=" + API_KEY);
		HttpRequest request = HttpRequest.newBuilder().uri(uri).GET().build();
		HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
		JSONObject json = new JSONObject(response.body());
//		Object lastRefreshed = json.getJSONObject("Meta Data").get("6. Last Refreshed");
		JSONObject timeSeries = json.getJSONObject("Time Series (Digital Currency Daily)");
		JSONArray names = timeSeries.names();
		List<DailyValue> dailyValues = new ArrayList<>();
//		for (int i = 0; i < names.length(); i++) {
		for (int i = 0; i < 100; i++) {
			String key = names.getString(i);
			JSONObject valueJSON = timeSeries.getJSONObject(key);
			DailyValue dailyValue = new DailyValue(key, valueJSON.getDouble("4b. close (USD)"));
			dailyValues.add(dailyValue);
		}
		LocalDate updated = LocalDate.now();
		Cache updatedCrypto = new Cache(currency, updated, dailyValues);
		cache.add(updatedCrypto);
		return dailyValues;
	}

	@SchemaMapping(typeName = "Query", value = "cryptoNews")
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

	@SchemaMapping(typeName = "Query", value = "cryptoAvailableCurrencies")
	public List<Currency> getCurrencies() {
		return Helpers.allCurrencies();
	}


}
