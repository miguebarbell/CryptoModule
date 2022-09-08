package com.crypto.server.currency;

public class News {
	String title;
	String url;
	String summary;
	String imageUrl;
	String source;

	News(String title, String url, String summary, String imageUrl, String source) {
		this.title = title;
		this.url = url;
		this.summary = summary;
		this.imageUrl = imageUrl;
		this.source = source;
	}
}
