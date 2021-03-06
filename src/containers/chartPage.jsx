import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import ChartOptions from '../config/chartOptions';

const ChartPage = () => {
  const [dailyReport, setDailyReport] = useState([]);
  const [sortedDailyReport, setSortedDailyReport] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dateRange, setDateRange] = useState([]);

  const [chartLabel, setChartLabel] = useState([]);
  const [chartDataConfirmed, setChartDataConfirmed] = useState([]);
  const [chartDataRecovered, setChartDataRecovered] = useState([]);
  const [chartDataDeaths, setChartDataDeaths] = useState([]);

  const compare = (a, b) => {
    if ( a.chartLabelDate < b.chartLabelDate ){
      return -1;
    }
    if ( a.chartLabelDate > b.chartLabelDate ){
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    let sorted = dailyReport;
    setSortedDailyReport(sorted.sort(compare));

  }, [dailyReport])

  useEffect(() => {
    setChartLabel(sortedDailyReport.map(data => {
      let monthIndoList = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
      let date = new Date(data.chartLabelDate).getDate();
      let monthIndo = monthIndoList[new Date(data.chartLabelDate).getMonth()];

      return `${date} ${monthIndo}`
    }));
  }, [sortedDailyReport])


  useEffect(() => {
    setChartDataConfirmed(sortedDailyReport.map(data => data.confirmed));
    setChartDataRecovered(sortedDailyReport.map(data => data.recovered));
    setChartDataDeaths(sortedDailyReport.map(data => data.deaths));
  }, [sortedDailyReport])

  const initDate = () => {
    let firstCaseDate = new Date('2020-03-02');
    let today = new Date();

    setStartDate(firstCaseDate);
    setEndDate(today.setDate(today.getDate() - 1));
  }

  useEffect(() => {
    initDate();
  }, [])

  const getDateRange = (start, end) => {
    let arrDate = [];
    let arrDateFormatted = [];
    let date = new Date(start);

    while (date <= end) {
      arrDate.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    arrDate.map((data, index) => (
      arrDateFormatted.push(`${data.getMonth()+1}-${data.getDate()}-${data.getFullYear()}`)
    ));

    setDateRange(arrDateFormatted);
  }
  
  useEffect(() => {
    getDateRange(startDate, endDate);
  }, [startDate, endDate])

  useEffect(() => {
    dateRange.map((data, index) => (
      axios.get(`https://covid19.mathdro.id/api/daily/${data}`)
        .then(res => {
            const filtered = res.data.filter((data2, index) => (data2.countryRegion === 'Indonesia'));
            return filtered;
          }
        )

        .then(filtered => {
          let chartLabelYear  = data.split('-')[2];
          let chartLabelMonth = data.split('-')[0];
          let chartLabelDate  = data.split('-')[1];

          filtered[0]['chartLabelDate'] = new Date(`${chartLabelYear}-${chartLabelMonth}-${chartLabelDate}`);
          setDailyReport(dailyReport => [...dailyReport, ...filtered])
        })

        .catch(err => {
          console.log('Error when fetching data from API', err);
        })
    ));
  }, [dateRange]);

  const getChartData = () => {
    return {
      labels: chartLabel,
      datasets: [
        {
          label: 'Confirmed',
          data: chartDataConfirmed,
          // backgroundColor: '#000A12',
          borderColor: '#f2b900',
          borderWidth: 1
        },
        {
          label: 'Recovered',
          data: chartDataRecovered,
          // backgroundColor: '#000A12',
          borderColor: '#52cc99',
          borderWidth: 1
        },
        {
          label: 'Deaths',
          data: chartDataDeaths,
          // backgroundColor: '#000A12',
          borderColor: '#f26353',
          borderWidth: 1
        },
      ]
    }
  }

  return (
    <div className="content">
      <h2>
        Growth Charts<br />
        <small>Covid-19 Case in Indonesia</small>
      </h2>

      <div className="card-chart">
        <Line data={getChartData()} options={ChartOptions}/>
      </div>

      <div className="footer">
        Data From : <a href="https://github.com/mathdroid/covid-19-api">mathdroid/covid-19-api</a>
      </div>
    </div>
  )
}

export default ChartPage;
