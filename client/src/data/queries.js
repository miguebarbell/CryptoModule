import axios from "axios";

const API_URL = "http://localhost:8080/graphql";

export const findUser = async (username) => {
	// console.log(username);
	const query = `query {
		cryptoFindUser(userId : "${username}"){
			userEmail
			currencies
		 }
		}
	`;
	// console.log(query);
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

export const createOrUpdateUser = async (user, currencies) => {
	const mutation = `mutation {
      cryptoAddUser(user : "${user}", currencies : ${JSON.stringify(currencies).toString()}) 
		}
	`;
	const result = await axios.post(API_URL, {query: mutation});
	return result.data;
};
