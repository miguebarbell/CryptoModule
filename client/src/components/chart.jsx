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
const dataset = [];
const Chart = ({user}) => {
	const [cryptoUser, setCryptoUser] = useState(findUserr);
	const [hackyUpdates, setHackyUpdates] = useState(0);
	useEffect(() => {
		const fetch = async () => {
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
								borderColor    : 'rgb(53, 62, 235)'
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
		fetch();
		setTimeout(() => setHackyUpdates(1), 1000);
	}, [user]);
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
				text   : "Your Currencies"
			}
		}
	};
	return (
		<>
			<div>This is the chart</div>
			{hackyUpdates !== 0 ? <Line
				// type='line'
				data={data}
				options={options}
			/> : <h1>Updating chart...</h1>}
		</>
	);
};
export default Chart;
