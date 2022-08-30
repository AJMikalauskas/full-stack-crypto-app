import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const MyChart = (props) => {
  const [dataTest, setDataTest] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

      //, [0,0], [1,10.46], [2,20], [66666666663,30]
  //console.log(LineData);
  const LineData = ["Time", "Price"];
  //! console.log(dataTest);

  function getUnixTimeValue(item) {
    let dateCnvrtr = new Date(item);
    //console.log(dateCnvrtr);
    let dateHours = dateCnvrtr.getHours();
    let dateMin = dateCnvrtr.getMinutes();

    if (dateCnvrtr.getHours() > 12) {
      //dateHours -= 12;
      // This is then PM
    }
    if (dateCnvrtr.getMinutes() < 10) {
      dateMin = "0" + dateCnvrtr.getMinutes();
    }
    var dates = dateHours + ":" + dateMin;
    //console.log(dates);

    return dates;
  }

  useEffect(() => {
    fetch(
      `https://coingecko.p.rapidapi.com/coins/${props.coinName}/market_chart?vs_currency=usd&days=${props.daysForChart}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
          "X-RapidAPI-Key":
            "3fb132f0a4msh01884afa74b3096p1653c7jsnd2db1dce89cf",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
          const newArr = data.prices.map(timeAndPriceSolo => [new Date(timeAndPriceSolo[0]), timeAndPriceSolo[1]]);
          newArr.unshift(LineData);
          //console.log(newArr);
          setDataTest(newArr);
          //console.log(new Date(1652826241960));
          //console.log(data.prices[0]);
        //setDataTest([LineData, ...data.prices]);
            //console.log(data.prices);
        //setDataTest(prevStateEx => ([ prevStateEx, ...data.prices]));
        //populateLineData(data.prices);
        // the data useState above isn't set until we exit this useEffect()
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // console.log(data);
    // populateLineData();
  }, []);

  //if (loading) return console.log("Loading!");
 //if (error) return console.log("Error!");
//  const LineData = ["x", "Price"];
//   console.log(dataTest);
  //dataTest.unshift(LineData);
    //setDataTest(withoutStringsOldData => [LineData,...withoutStringsOldData]);
  //setDataTest(dataTest.concat(LineData));
//   function populateLineData(dataForCharts) {
       //! IMPORTANT console.log(dataTest);
//     const LineData = [["x", "Price"]];
//     //console.log(dataForCharts.length);
//     //console.log(dataForCharts[0][0]);
//     // Faster in opposite or --, but have to start from beginning so use minorly slower ++
//     for (let i = 0; i < dataForCharts.length; i++) {
//         // getUnixTimeValue() -> need to pass number in 
//         let timeAndPriceInfo = [dataForCharts[i][0],dataForCharts[i][1]]
//       LineData.push(timeAndPriceInfo);
//     }
//     // What I would return here?
//     console.log(LineData);
//     return LineData;
//   }
  const LineChartOptions = {
    //  y-axis is price of crypto/stock
    //  x-axis is time in day

    //   hAxis: {
    //     title: 'Time',
    //   },
    //   vAxis: {
    //     title: 'Popularity',
    //   },
    //   series: {
    //     1: { curveType: 'function' },
    //   },
    legend: "none",
    // textPosition: 'none',
    hAxis: { textPosition: 'none', format: 'M/d/yy', baselineColor: "none" },
    vAxis: { textPosition: 'none', baselineColor: "none" },
    width: `${props.width}`,
    height: `${props.height}`,
    'chartArea': {'width': '100%', 'height': '80%'},
    //backgroundColor: 'none'
    // axes: {
    //     x: {

    //     }
    // }
  };
  return (
    <div className="container mt-5">
      {/* <h2>React Google Line Chart Example</h2> */}
      <Chart
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={dataTest}
        options={LineChartOptions}
        //   rootProps={{ 'data-testid': '2' }}
      />
    </div>
  );
};
//}
export default MyChart;
