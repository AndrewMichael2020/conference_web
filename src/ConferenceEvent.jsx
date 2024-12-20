import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";

const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [showPopup, setShowPopup] = useState(false); // Add this state for controlling the popup visibility
    const venueItems = useSelector((state) => state.venue);
    const avItems = useSelector((state) => state.av);
    const mealsItems = useSelector((state) => state.meals);
    const dispatch = useDispatch();

    // Calculate total cost for the different sections
    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "venue") {
            venueItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "av") {
            avItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "meals") {
            mealsItems.forEach((item) => {
                if (item.selected) {
                    totalCost += item.cost * numberOfPeople;
                }
            });
        }
        return totalCost;
    };

    const venueTotalCost = calculateTotalCost("venue");
    const avTotalCost = calculateTotalCost("av");
    const mealsTotalCost = calculateTotalCost("meals");

    const totalCosts = {
        venue: venueTotalCost,
        av: avTotalCost,
        meals: mealsTotalCost,
    };

    // Handle the popup visibility toggle
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <>
            <navbar className="navbar_event_conference">
                <div className="company_logo">Conference Expense Planner</div>
                <div className="left_navbar">
                    <div className="nav_links">
                        <a href="#venue">Venue</a>
                        <a href="#addons">Add-ons</a>
                        <a href="#meals">Meals</a>
                    </div>
                    <button className="details_button" onClick={() => setShowItems(!showItems)}>
                        Show Details
                    </button>
                    {/* Add a button in the header to trigger the popup */}
                    <button className="total_cost_button" onClick={togglePopup}>
                        Show Total Cost
                    </button>
                </div>
            </navbar>

            {/* Main Content */}
            <div className="main_container">
                {!showItems ? (
                    <div className="items-information">
                        {/* Venue, Add-ons, and Meals Sections */}
                    </div>
                ) : (
                    <div className="total_amount_detail">
                        <TotalCost totalCosts={totalCosts} />
                    </div>
                )}
            </div>

            {/* Popup Modal for Total Cost */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Total Event Cost</h3>
                        <TotalCost totalCosts={totalCosts} />
                        <button className="close-popup" onClick={togglePopup}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConferenceEvent;
