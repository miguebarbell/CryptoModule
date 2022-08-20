## Models for the database

ValuePerDay: store the closed cryptocurrency's value for the specific day.

```java
class ValuePerDay {
	Date date;
	Long value;
	Cryptocurrency currency;
}
```

Cryptocurrency: Store the general information about the cryptocurrency.

```java
class Cryptocurrency {
	String name;
	String code;
	String description;
}
```

Preferences: store the selected cryptocurrencies to track and the user.

```java
class Preferences {
	Set<Cryptocurrency> currencies;
	User user;
}
```
