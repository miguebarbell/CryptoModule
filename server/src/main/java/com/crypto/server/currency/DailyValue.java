package com.crypto.server.currency;

public class DailyValue {
	private final String date;
	private final Double value;

	DailyValue(String date, Double value) {
		this.date = date;
		this.value = value;
	}

	public String getDate() {
		return date;
	}

	public Double getValue() {
		return value;
	}
}
