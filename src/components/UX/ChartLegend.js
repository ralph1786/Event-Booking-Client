import React from "react";
import "./ChartLegend.scss";

function ChartLegend() {
  return (
    <div className="price-range">
      <h2>Price Range</h2>
      <p>
        Lowest-Tier-Events: <span>$0-$49.99</span>
      </p>
      <p>
        Mid-Tier-Events: <span>$50.00-$149.99</span>
      </p>
      <p>
        Upper-Tier-Events: <span>$150.00-$500.00</span>
      </p>
    </div>
  );
}

export default ChartLegend;
