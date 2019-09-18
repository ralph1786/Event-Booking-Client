import React from "react";
import "./BookingTabs.scss";

function BookingTabs(props) {
  return (
    <div className="bookings__tabs">
      <button
        className={props.activeTab === "List" ? "active" : ""}
        onClick={() => props.tabChange("List")}
      >
        List
      </button>
      <button
        className={props.activeTab === "Chart" ? "active" : ""}
        onClick={() => props.tabChange("Chart")}
      >
        Chart
      </button>
    </div>
  );
}

export default BookingTabs;
