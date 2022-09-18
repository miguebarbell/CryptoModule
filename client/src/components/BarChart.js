// import {color} from "chart.js/types/helpers";
import {Box, Card, CardContent, CardHeader, Divider, useMediaQuery, useTheme} from "@mui/material";
import {deepPurple, lightBlue, lime, pink, purple, teal} from "@mui/material/colors";
import axios from "axios";
import {BarElement, CategoryScale, Chart, LinearScale} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import numeral from 'numeral';
import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChart = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(
     theme.breakpoints.up('md'),
     { defaultMatches: true }
  );
  const [chartData, setChartData] = useState([]);

  const fetchTopCoins = () => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false', {
      headers: {
        'Accept': 'application/json',
      }
    })
       .then(response => {
         setChartData(response.data);
       })
       .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchTopCoins();
  }, []);

  const data = {
    // copy data from the state to a new array,
    // sort it by current_price in descending order,
    // take top 10 results using slice
    // and then map
    labels: chartData.sort((a, b) => b.current_price - a.current_price).slice(0, 10).map(coin => coin.name),
    datasets: [{
      data: chartData.sort((a, b) => b.current_price - a.current_price).slice(0, 10).map(coin => coin.current_price),
      label: `${chartData.length} Most Expensive Cryptocurrencies`,
      backgroundColor: [
        theme.palette.primary.dark,
        theme.palette.error.dark,
        theme.palette.primary.dark,
        theme.palette.success.dark,
        deepPurple[600],
        pink[400],
        lightBlue[300],
        teal[400],
        purple[300],
        lime[500]
      ],
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: isMd ? true : false,
        color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary,
        anchor: 'end',
        align: 'top',
        labels: {
          title: {
            font: {
              weight: 'bold',
              size: 13,
            },
            padding: 10,
          },
        },
        formatter: (value) => numeral(value).format('$0,0.00'),
      },
    },
    scales: {
      x: {
        ticks: {
          // color: theme.palette.text.primary,
          color      : 'white',
          maxRotation: 45,
          minRotation: 45
        },
        title: {
          display: true,
          // text: 'Cryptocurrencies',
          color: theme.palette.text.primary,
          font: {
            weight: 'bold',
            size: 18,
          },
          padding: 10,
        },
      },
      y: {
        ticks: {
          // color: theme.palette.text.primary,
          color   : 'white',
          padding : 10,
          callback: (value) => numeral(value).format('$0,0.00')
        },
        display: true,
        borderDash: [5, 5],
        title: {
          display: true,
          // text: 'Current price',
          color  : theme.palette.text.primary,
          font   : {
            weight: 'bold',
            size  : 18
          },
          padding: 10
        },
      },
    },
  };

  const barchartStyle = {
    backgroundColor: 'rgba(0,0,0,0.8)',
    backdropFilter : 'blur(7px)',
    color          : 'white'

  };

  return (
    <Card sx={barchartStyle}>
      <CardHeader
        sx={{fontFamily: 'Chakra Petch'}}
        title="Top 10 Most Expensive Cryptocurrencies"
        // subheader='Top 10 Most Expensive Cryptocurrencies Measured By Their Market Price'
      />
      <Divider/>
      <CardContent>
        <Box sx={{height: 400, position: 'relative', fontFamily: 'Chakra Petch'}}>
          <Bar
            data={data}
              options={options}
              plugins={[ChartDataLabels]}
           />
         </Box>
       </CardContent>
     </Card>
  )
}
export default BarChart
