package com.crypto.server.currency;

public class News {
	private final String date;
	private final String title;
	private final String url;
	private final String summary;
	private final String imageUrl;
	private final String source;

	News(String title, String url, String summary, String imageUrl, String source, String date) {
		this.title = title;
		this.url = url;
		this.summary = summary;
		this.imageUrl = imageUrl;
		this.source = source;
		this.date = date;
	}
}
