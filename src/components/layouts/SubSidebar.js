import { Fragment } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import { RiDeleteBinFill } from "react-icons/ri";
import "./Sidebar.css";

const SubSidebar = ({ view, getRate }) => {
  const { user, loading } = useSelector((state) => state.auth);

  const {
    currentSelectedStock,
    defaultStockAsset,
    loading: stockLoading,
    stocksSelected,
  } = useSelector((state) => state.stock);

  // Action Creators
  const { deleteStock, setCurrentAsset } = useActions();

  return (
    <div className="sidebar-wrapper">
      <header className="d-flex align-items-center justify-content-between">
        <p className="watchlist mb-0">Watchlist</p>
        <Form inline>
          <FormControl
            type="text"
            placeholder="BTCETH ..."
            className="search"
          />
        </Form>
      </header>
      <nav style={{ height: 350 }}>
        <ul id="watching-list" className="mb-0">
          <li>Symbol</li>
          <li className="ml-auto">Last</li>
          <li className="ml-4">Chng (%)</li>
        </ul>
        <ul id="stock-list-display" className="p-0 w-100 text-left">
          {stocksSelected.length === 0 ? (
            <li
              id="watching-list-item"
              onClick={() => setCurrentAsset(defaultStockAsset.id)}
            >
              <span>{defaultStockAsset.sy}</span>
              <span>
                {Object.keys(defaultStockAsset).length > 0 &&
                  defaultStockAsset.rate.toString().slice(0, 8)}
              </span>
              {/* <span
                className={`${
                  defaultSelectedStock.changesPercentage < 0
                    ? "loss-percentage"
                    : "profit-percentage"
                }`}
              >
                {Object.keys(defaultSelectedStock).length > 0 &&
                  defaultSelectedStock.changesPercentage.toFixed(2)}
              </span> */}
            </li>
          ) : (
            stocksSelected.map((stock, index) => (
              <li id="watching-list-item" key={index}>
                <span
                  style={{ flex: 3 }}
                  onClick={() => setCurrentAsset(stock.id)}
                >
                  {stock.sy}
                </span>
                <span style={{ flex: 2 }}>
                  {stock.rate.toString().slice(0, 8)}
                </span>
                <span
                  style={{ flex: 1, justifySelf: "center" }}
                  className={`${
                    stock.changesPercentage < 0
                      ? "loss-percentage"
                      : "profit-percentage"
                  }`}
                >
                  {stock.changesPercentage
                    ? stock.changesPercentage.toFixed(2)
                    : ""}
                </span>
                <RiDeleteBinFill
                  className="ml-2 text-danger"
                  onClick={() => deleteStock(stock.id)}
                />
              </li>
            ))
          )}
        </ul>
        {!loading && user && user.isTrading && (
          <Fragment>
            <div className="isTradingI">AutoCopy Trader is active</div>
            <img
              style={{ width: " 100%" }}
              src={"https://www.virtualdj.com/images/ajax-loading-big.gif"}
              alt="auto trading"
            />
          </Fragment>
        )}
      </nav>
      {/* <ul className="watchlist-details"></ul> */}

      <div className="infocurrency-wrapper p-2 h-100">
        <header
          className="details-wrapper d-flex align-items-center justify-content-between"
          style={{ margin: " 0 0 5%" }}
        >
          <p className="watchlist mb-0">DETAILS</p>
        </header>
        <h6>
          {!stockLoading &&
          stocksSelected.length > 0 &&
          Object.keys(currentSelectedStock).length > 0
            ? currentSelectedStock.sy
            : defaultStockAsset.sy}
        </h6>
        <p className="mb-0 badge-code">
          {!stockLoading &&
          stocksSelected.length > 0 &&
          Object.keys(currentSelectedStock).length > 0
            ? currentSelectedStock.type
            : defaultStockAsset.type}
        </p>
        <p className="price mt-4 mb-0">
          {!stockLoading &&
          stocksSelected.length > 0 &&
          Object.keys(currentSelectedStock).length > 0
            ? currentSelectedStock.rate
            : defaultStockAsset.rate}
          {/* {getRate(view.symbol ? view.symbol : "")} */}
        </p>
      </div>
    </div>
  );
};

export default SubSidebar;
