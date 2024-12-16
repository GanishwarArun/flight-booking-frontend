import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import RouteSelection from "./components/RouteSelection/RouteSelection";
import LogOrsign from "./components/Login-Signup/LogOrsign";
import Signup from "./components/Login-Signup/Signup";
import CompletedTrip from "./components/CompletedTrip/CompletedTrip";
import Profile from "./components/Profile/Profile";
import TicketPage from "./components/TicketPage/TicketPage";
import CancelPage from "./components/CancelPage/CancelPage";
import CompletedPage from "./components/CompletedTrip/CompletedTrip";
import UpcomingPage from "./components/TicketPage/TicketPage";
import CancelledPage from "./components/CancelledTicket/CancelledTicket";
import FeaturesPage from "./components/ChangingFeatures/FeaturesPage";
import ServicePage from "./components/ServicePage/ServicePage";
import BookTicket from "./components/BookTicket/BookTicket";
import RouteSelector from "./components/routeSelector/Routeselector";
import "./index.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LogOrsign />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/routes" element={<RouteSelection />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/getTicket" element={<TicketPage />} />
          <Route path="/cancelPage" element={<CancelPage />} />
          <Route path="/completedPage" element={<CompletedPage />} />
          <Route path="/upcomingPage" element={<UpcomingPage />} />
          <Route path="/cancelledPage" element={<CancelledPage />} />
          <Route path="/featuresPage" element={<FeaturesPage />} />
          <Route path="/ServicePage" element={<ServicePage />} />
          <Route path="/book-ticket" element={<BookTicket />} />
          <Route path="/route-selector" element={<RouteSelector />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import React from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Homepage from "./components/Homepage/Homepage";
// import RouteSelection from "./components/RouteSelection/RouteSelection";
// import LogOrsign from "./components/Login-Signup/LogOrsign";
// import Signup from "./components/Login-Signup/Signup";
// import CompletedTrip from "./components/CompletedTrip/CompletedTrip";

// import Profile from "./components/Profile/Profile";
// import TicketPage from './components/TicketPage/TicketPage';
// import CancelPage from "./components/CancelPage/CancelPage"
// import CompletedPage from "./components/CompletedTrip/CompletedTrip";
// import UpcomingPage from "./components/TicketPage/TicketPage"
// import CancelledPage from "./components/CancelledTicket/CancelledTicket";
// import FeaturesPage from "./components/ChangingFeatures/FeaturesPage";
// import ServicePage from './components/ServicePage/ServicePage';
// import "./index.css";
// import "./App.css";

