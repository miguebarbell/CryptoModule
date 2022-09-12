package com.crypto.server.currency;

import java.time.LocalDate;
import java.util.List;

public class Cache {
	private final String currency;
	private final List<DailyValue> values;
	private final LocalDate updated;

	public Cache(String currency, LocalDate updated, List<DailyValue> dailyValues) {
		this.currency = currency;
		this.values = dailyValues;
		this.updated = updated;
	}

	public String getCurrency() {
		return currency;
	}

	public List<DailyValue> getValues() {
		return values;
	}

	public LocalDate getUpdated() {
		return updated;
	}
}
