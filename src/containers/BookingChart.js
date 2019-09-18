import React from "react";
import { Bar } from "react-chartjs-2";

const BOOKINGS_PRICE_BREAKDOWN = {
  "Lowest-Tier": {
    min: 0,
    max: 50
  },
  "Mid-Tier": {
    min: 50,
    max: 150
  },
  "Upper-Tier": {
    min: 150,
    max: 100000
  }
};

function BookingChart(props) {
  const chartData = { labels: [], datasets: [] };
  let values = [];
  for (let bucket in BOOKINGS_PRICE_BREAKDOWN) {
    const filteredBookingsCount = props.bookings.reduce((acc, current) => {
      console.log(current);
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
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: values
    });
    values = [...values];
    values[values.length - 1] = 0;
  }

  return (
    <div style={{ width: "75%", margin: "10rem auto" }}>
      <Bar
        data={chartData}
        width={50}
        height={100}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  );
}

export default BookingChart;
