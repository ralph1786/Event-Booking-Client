import React from "react";
import { Bar } from "react-chartjs-2";

const BOOKINGS_PRICE_BREAKDOWN = {
  "Lowest-Tier-Event": {
    min: 0,
    max: 50
  },
  "Mid-Tier-Event": {
    min: 50,
    max: 150
  },
  "Upper-Tier-Event": {
    min: 150,
    max: 100000
  }
};

function BookingChart(props) {
  const chartData = { labels: [], datasets: [] };
  let values = [];
  // eslint-disable-next-line no-unused-vars
  for (let bucket in BOOKINGS_PRICE_BREAKDOWN) {
    const filteredBookingsCount = props.bookings.reduce((acc, current) => {
      // console.log(current);
      if (
        current.event.price > BOOKINGS_PRICE_BREAKDOWN[bucket].min &&
        current.event.price < BOOKINGS_PRICE_BREAKDOWN[bucket].max
      ) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
    values.push(filteredBookingsCount);
    chartData.labels.push(bucket);
    chartData.datasets.push({
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(245, 87, 140, 0.8)",
      hoverBorderColor: "rgb(245, 87, 140)",
      data: values
    });
    values = [...values];
    values[values.length - 1] = 0;
  }

  return (
    <div style={{ width: "75%", margin: "6rem auto" }}>
      <Bar
        data={chartData}
        width={100}
        height={200}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: false
          }
        }}
      />
    </div>
  );
}

export default BookingChart;
