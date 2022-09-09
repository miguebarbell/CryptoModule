import axios from "axios";

const API_URL = "http://localhost:8080/graphql";

export const findUser = async (username) => {
	const query = `query {
	cryptoFindUser(userId : "${username}"){
		user
		currencies
	 }
	}
	`;
	const result = await axios.post(API_URL, {query});
	return result.data;
};

export const availableCurrencies = async () => {
	const query = `query {
	cryptoAvailableCurrencies {
  id
  name
}
	}`;
	const result = await axios.post(API_URL, {query});
	return result.data;
};

export const cryptoDaily = async (currency) => {
	const query = `query {
		cryptoDaily(currency : "${currency}") {
			date
			value
		}	
	}`;
	const result = await axios.post(API_URL, {query});
	return result.data;
};

export const cryptoNews = async (currencies) => {
	const query = `query {
			cryptoNews(currencies : ${currencies}) {
			title
			url
			summary
			imageUrl
			source
		}
	}`;
	const result = await axios.post(API_URL, {query});
	return result.data;
};
