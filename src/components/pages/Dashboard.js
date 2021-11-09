import { useEffect, useState, useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import DashboardAside from "../layouts/DashboardAside";
import DashboardHeader from "../layouts/DashboardHeader";
import { Redirect } from "react-router-dom";
import "./Dashboard.css";
import Board from "./Board";
import Manager from "./Manager";
import Admin from "./Admin";
import DashboardFooter from "../layouts/DashboardFooter";
import { asideList } from "./../../helpers/dataset/asideNavList";
import OrderBook from "./OrderBook";
import Market from "./Market";
import AutoTrade from "../pages/AutoTrade";
import Finaces from "./Finaces";
import Calculator from "../layouts/Calculator";
import News from "../pages/News";
import LeaderBoard from "./LeaderBoard";
// import useInterval from "./../hooks/useInterval";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [adminSelected, setAdminSelected] = useState(false);
  const [managerSelected, setManagerSelected] = useState(false);
  const [levIsh, setLevIsh] = useState(false);
  const [buysell, setBuysell] = useState(false);
  const [support, setSupport] = useState(false);

  const myRef3 = useRef("");

  // Action creators
  const { getWebData, getAllAssets, getDefaultAsset } = useActions();

  // Redux state data
  const { webData } = useSelector((state) => state.web);

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    getWebData();
    getDefaultAsset();
    getAllAssets();

    // eslint-disable-next-line
  }, []);

  // useInterval(() => {
  //   getAllStockAssets();
  //   getAllUserTrades(user && user._id);

  //   if (Object.keys(currentSelectedStock).length > 0) {
  //     setCurrentSelectedStock(currentSelectedStock);
  //   } else {
  //     setDefaultSelectedStock();
  //   }
  // }, 3000);

  useEffect(() => {
    [...asideList].forEach((tab) => {
      switch (window.location.pathname) {
        case tab.path:
          if (selectedTab !== tab.id) {
            setSelectedTab(tab.id);
            setAdminSelected(false);
            setManagerSelected(false);
          }
          break;
        case "/dashboard/manager":
          if (!managerSelected) {
            setManagerSelected(true);
            setSelectedTab(null);
            setAdminSelected(false);
          }
          break;
        case "/dashboard/admin":
          if (!adminSelected) {
            setAdminSelected(true);
            setSelectedTab(null);
            setManagerSelected(false);
          }
          break;
        default:
          break;
      }
    });
  }, [selectedTab, adminSelected, managerSelected]);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div
      ref={myRef3}
      style={{
        minHeight: "100vh",
        background: "#131722",
      }}
    >
      <DashboardHeader
        data={webData}
        support={support}
        setSupport={setSupport}
      />

      <section className="dash-contents">
        <div className="dash-row">
          <DashboardAside
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            setAdminSelected={setAdminSelected}
            setManagerSelected={setManagerSelected}
            managerSelecteds={managerSelected}
            adminSelected={adminSelected}
          />

          {selectedTab === 0 && (
            <Board
              buysell={buysell}
              setBuysell={setBuysell}
              levIsh={levIsh}
              setLevIsh={setLevIsh}
              data={webData}
            />
          )}
          {managerSelected && (
            <>
              <Manager />
            </>
          )}

          {/* Renders the  Admin page if user is an Admin*/}
          {adminSelected && (
            <Fragment>
              <Admin />
            </Fragment>
          )}

          {/* Renders the  order book page*/}
          {selectedTab === 1 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <OrderBook />
            </div>
          )}

          {/* Renders the  order book page*/}
          {selectedTab === 3 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <Market />
            </div>
          )}

          {selectedTab === 2 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <Finaces />
            </div>
          )}

          {selectedTab === 4 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <AutoTrade />
            </div>
          )}

          {selectedTab === 5 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <Calculator />
            </div>
          )}

          {selectedTab === 6 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <News />
            </div>
          )}

          {selectedTab === 7 && (
            <div
              className="order-book-section orderBookComponent"
              style={{ display: "block" }}
            >
              <LeaderBoard />
            </div>
          )}

          {/* Renders the  manager page if user is a manager*/}
        </div>
      </section>

      <DashboardFooter setSupport={setSupport} />
    </div>
  );
};

export default Dashboard;
