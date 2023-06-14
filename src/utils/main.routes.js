import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewRequest from "../pages/UserPanel/NewRequest";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp";
import SignUpDone from "../pages/Login/SignUpDone";

import NewPassword from "../pages/Login/NewPassword";
import RequestRegistered from "../pages/UserPanel/RequestRegistered";
import RequestHistory from "../pages/UserPanel/RequestHistory";
import Profile from "../pages/UserPanel/Profile";
import SubmitReport from "../pages/UserPanel/SubmitReport";
import PassportRequest from "../pages/UserPanel/PassportRequest";
import Request from "../pages/MainPanel/Requests";
import NewIncomeRequest from "../pages/MainPanel/NewIncomeRequest";
import NewIncomeRequestAccepted from "../pages/MainPanel/NewIncomeRequestAccepted";
import RequestRejectedPage from "../pages/MainPanel/RequestRejected";
import ReportHistory from "../pages/MainPanel/ReportHistory";
import Traveling from "../pages/MainPanel/Traveling";
import TravelDone from "../pages/MainPanel/TravelDone";
import TravelTracking from "../pages/UserPanel/TravelTracking";
import TicketList from "../pages/UserPanel/TicketList";
import TicketShow from "../pages/UserPanel/TicketShow";
import Userlist from "../pages/Supervisor/Userlist";
const MainRoutes = (props) =>{
    return(
            <BrowserRouter>
                <Routes>
                    <Route path="/newRequest" element={<NewRequest/>} />
                </Routes>
                <Routes>
                    <Route path="/" element={<Login/>} />
                </Routes>
                <Routes>
                    <Route path="/signup" element={<SignUp/>} />
                </Routes>
                <Routes>
                    <Route path="/signUpDone" element={<SignUpDone/>} />
                </Routes>
          
                <Routes>
                    <Route path="/newPassword" element={<NewPassword/>} />
                </Routes>
                <Routes>
                    <Route path="/requestRegistered" element={<RequestRegistered/>} />
                </Routes>
                <Routes>
                    <Route path="/requestHistory" element={<RequestHistory/>} />
                </Routes>
                <Routes>
                    <Route path="/profile" element={<Profile/>} />
                </Routes>
                <Routes>
                    <Route path="/submitReport" element={<SubmitReport/>} />
                </Routes>
                <Routes>
                    <Route path="/passportRequest" element={<PassportRequest/>} />
                </Routes>
                <Routes>
                    <Route path="/requests" element={<Request/>} />
                </Routes>
                <Routes>
                    <Route path="/newIncomeRequest" element={<NewIncomeRequest/>} />
                </Routes>
                <Routes>
                    <Route path="/newIncomeAccepted" element={<NewIncomeRequestAccepted/>} />
                </Routes>
                <Routes>
                    <Route path="/requestRejected" element={<RequestRejectedPage/>} />
                </Routes>
                <Routes>
                    <Route path="/reportHistory" element={<ReportHistory/>} />
                </Routes>
                <Routes>
                    <Route path="/traveling" element={<Traveling/>} />
                </Routes>
                <Routes>
                    <Route path="/travelDone" element={<TravelDone/>} />
                </Routes>
                <Routes>
                    <Route path="/travelTracking" element={<TravelTracking/>} />
                </Routes>
                <Routes>
                    <Route path="/ticketList" element={<TicketList/>} />
                </Routes>
                <Routes>
                    <Route path="/ticketShow" element={<TicketShow/>} />
                </Routes>
                <Routes>
                    <Route path="/supervisor/userList" element={<Userlist/>}/>
                </Routes>
            </BrowserRouter>
    )
}
export default MainRoutes;