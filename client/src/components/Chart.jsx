import {CircularProgress} from '@mui/material';
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip
} from 'chart.js';
import {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import {findUserr} from "../data/findUser";
import {cryptoDaily, findUser} from "../data/queries";
import AddCurrencies from "./AddCurrencies";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
const labels = [];
let dataset = [];
const Chart = ({user, reload}) => {
	const [cryptoUser, setCryptoUser] = useState(findUserr);
	const [hackyUpdates, setHackyUpdates] = useState(false);
	const fetch = async () => {
		dataset = [];
		try {
			const userPromised = await findUser(user);
			setCryptoUser(userPromised.data.cryptoUser);
			userPromised.data.cryptoFindUser.currencies.map(async (currency, index) => {
				const fetchValues = async () => {
					try {
						const dailyValuesPromised = await cryptoDaily(currency);
						let data = [];
						if (dailyValuesPromised.data.cryptoDaily && (dataset.length <= userPromised.data.cryptoFindUser.currencies.length)) for await (let valuePromised of dailyValuesPromised.data.cryptoDaily) {
							data.push(valuePromised.value);
							if (labels.length < dailyValuesPromised.data.cryptoDaily.length) labels.push(valuePromised.date);
						}
						let chartdata = {
							label          : currency,
							data           : data,
							backgroundColor: colors[index],
							borderColor    : colors[colors.length - 1 - index],
							pointRadius    : 1
						};
						if (dataset.map(values => values.label)
						           .filter(value => value === currency).length === 0) dataset.push(chartdata);
					} catch (err) {
						console.log("error fetching daily values");
						console.log(err);
					}
				};
				await fetchValues();
			});
		} catch (err) {
			console.log("error fetching user");
			console.log(err);
		}
	};
	useEffect(() => {
		setHackyUpdates(false);
		fetch();
		setTimeout(() => setHackyUpdates(true), 500);
	}, [user, reload]);
	const colors = [
		"rgba(245, 40, 145, 0.5)",
		"rgba(39, 223, 245, 0.5)",
		"rgba(245, 236, 39, 0.5)",
		"rgba(39, 73, 245, 0.5)",
		"rgba(245, 142, 39, 0.5"
	];
	const data = {
		labels,
		datasets: dataset
	};
	const options = {
		responsive: true,
		plugins   : {
			// filler: {
			// 	propagate: true
			// },
			legend: {
				position: 'top'
			},
			title : {
				display: true,
				text: "Currencies Watching prices in USD"
			}
		}
	};
	return (
		<>
			{
				data.datasets.length !== 0 ?
				hackyUpdates && reload
				? <Line
					// type='line'
					data={data}
					options={options}
				/> :
				<CircularProgress size={200} thickness={2} sx={{padding: '3rem'}}/>
				                           : <AddCurrencies/>
			}
		</>
	);
};
export default Chart;
