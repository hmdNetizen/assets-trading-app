import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import { message } from "antd";
import "./Orders.css";
import Spinner from "./Spinner";
import { tradesMargin } from "../../helpers/getOpenTradesMargin";
import { calculatePandL } from "../../helpers/calculatePandL";
import { animateBalance } from "../../helpers/animateBalance";
import { getUserBalance } from "../../helpers/getUserBalance";

const spinnerStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Orders = (props) => {
  const { buysell, setBuysell } = props;

  const { user } = useSelector((state) => state.auth);
  const { openTrades } = useSelector((state) => state.profile);
  const { loading, userTrades, error } = useSelector((state) => state.trades);
  const { allStockAssets } = useSelector((state) => state.stock);
  const { webData } = useSelector((state) => state.web);

  const {
    getAllUserTrades,
    deleteUserTrade,
    closeUserTrade,
    setCurrentlyActiveTrade,
  } = useActions();

  const openTradesMargin = tradesMargin(openTrades);

  const balance = getUserBalance(user, openTradesMargin);

  const handleDeleteUserTrade = (tradeId) => {
    if (error) {
      message.error("Trade could not be deleted");
    } else {
      deleteUserTrade(tradeId);
      setTimeout(() => {
        message.success("Trade deleted succesfully");
        setCurrentlyActiveTrade({});
      }, 6000);
    }
  };

  const handleCloseUserTrade = (trade, closeRate) => {
    if (error) {
      message.error("Trade could not be closed");
      return;
    }

    closeUserTrade(trade._id, {
      closeRateOfAsset: closeRate.price,
    });

    setTimeout(() => {
      message.success("Your trade has been closed successfully");
      setCurrentlyActiveTrade({});
    }, 6000);

    setTimeout(() => {
      animateBalance(
        "balance",
        balance,
        balance +
          trade.margin +
          calculatePandL(
            trade,
            closeRate,
            webData ? webData.leverageAmount : 1
          ) -
          trade.margin,
        3000
      );
    }, 7000);
  };

  const limitTradeList =
    userTrades.length > 7 ? userTrades.slice(0, 7) : userTrades;

  return (
    <div
      className="order orders-table"
      style={{ height: buysell ? "65vh" : "15vh", overflow: "auto" }}
    >
      <div className="dtls" style={{ height: "100%" }}>
        <span
          className="text"
          onClick={() => {
            setBuysell((prev) => !prev);
            getAllUserTrades();
          }}
        >
          Open positions
        </span>
        {/* <span className="text">Pending orders</span> */}
        <svg
          className={buysell ? "expand toggled" : "expand untoggled"}
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            setBuysell((prev) => !prev);
            getAllUserTrades(user && user._id);
          }}
        >
          <path
            d="M5 15.5L12 8.5L19 15.5"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          className="all-tables tablesI"
          style={{ display: buysell ? "block" : "" }}
        >
          {loading ? (
            <Spinner
              type="Rings"
              color="#00BFFF"
              height={100}
              width={100}
              style={spinnerStyle}
            />
          ) : (
            <div
              className="tables tablesI"
              id="open-positions"
              style={{
                display: buysell ? "block" : "",
                overflowX: "scroll",
                overflowY: "scroll",
              }}
            >
              <table>
                <tbody>
                  <tr>
                    <th>DATE</th>
                    <th>ID</th>
                    <th>INSTRUMENT</th>
                    <th>MARGIN</th>
                    <th>INVESTMENT</th>
                    <th>DIRECTION</th>
                    <th>OPEN RATE</th>
                    <th>MARKET RATE</th>
                    <th>P&L</th>
                    <th>PROFIT/LOSS</th>
                    <th>STATUS</th>
                  </tr>
                  {limitTradeList.length > 0 ? (
                    limitTradeList.map((item, i) => {
                      return (
                        allStockAssets.length > 0 &&
                        allStockAssets
                          .filter((stock) => {
                            if (item.id === stock.id) {
                              return true;
                            } else {
                              return false;
                            }
                          })
                          .map((asset) => (
                            <tr key={item._id}>
                              <td>{item.created_at.slice(0, 10)}</td>
                              <td>00{i + 1}</td>
                              {asset.sy}
                              {/* <td>{setCurrentAsset(item.id).sy}</td> */}
                              <td>
                                {user && user.currency.sign}
                                {new Intl.NumberFormat("en-US").format(
                                  item.traded_amount
                                )}
                              </td>
                              <td>{item.opening_price}</td>
                              <td
                                className="rise"
                                style={
                                  item.trade_type === "buy"
                                    ? {
                                        color: "#54ac40",
                                      }
                                    : {
                                        color: "red",
                                      }
                                }
                              >
                                {item.trade_type}
                              </td>
                              <td>
                                {item.opening_price.toString().slice(0, 8)}
                              </td>
                              <td>
                                {/* {item.isOpen
                                  ? asset.rate.toString().slice(0, 8)
                                : "---"} */}
                                {asset.rate.toString().slice(0, 8)}
                              </td>
                              <td
                                style={{
                                  color:
                                    item.isOpen &&
                                    calculatePandL(
                                      item,
                                      asset,
                                      webData ? webData.leverageAmount : 1
                                    ) < 0
                                      ? "red"
                                      : item.isOpen &&
                                        calculatePandL(
                                          item,
                                          asset,
                                          webData ? webData.leverageAmount : 1
                                        ) > 0
                                      ? "#54ac40"
                                      : "#fff",
                                }}
                              >
                                {item.isOpen &&
                                  calculatePandL(
                                    item,
                                    asset,
                                    webData ? webData.leverageAmount : 1
                                  ) > 0 &&
                                  "+"}

                                {item.isOpen
                                  ? new Intl.NumberFormat("en-US")
                                      .format(
                                        calculatePandL(
                                          item,
                                          asset,
                                          webData ? webData.leverageAmount : 1
                                        )
                                      )
                                      .slice(0, 8)
                                  : "---"}
                              </td>
                              <td
                                style={{
                                  color:
                                    item.profit > 0
                                      ? "#54ac40"
                                      : item.loss > 0
                                      ? "red"
                                      : "#fff",
                                }}
                              >
                                {new Intl.NumberFormat("en-US").format(
                                  item.profit.toString().slice(0, 6)
                                )}
                                /{new Intl.NumberFormat("en-US").format(0)}
                              </td>
                              <td
                                style={{
                                  display: "flex",
                                  height: "100%",
                                  alignItems: "center",
                                  width: "75%",
                                }}
                              >
                                <button
                                  className="orderBtn btn-green"
                                  style={{
                                    marginRight: 20,
                                  }}
                                >
                                  {item.status === 0 ? "Open" : "closed"}
                                </button>

                                {item.status === 0 && (
                                  <button
                                    className="orderBtn btn-red"
                                    onClick={() => {
                                      handleCloseUserTrade(item, asset);
                                    }}
                                  >
                                    CLOSE
                                  </button>
                                )}

                                <i
                                  className="fas fa-trash trashS"
                                  onClick={() => {
                                    if (item.isOpen) {
                                      closeUserTrade(item._id, {
                                        closeRateOfAsset: asset.price,
                                      });
                                    }

                                    handleDeleteUserTrade(item._id);
                                  }}
                                >
                                  {" "}
                                </i>
                              </td>
                            </tr>
                          ))
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        rowSpan="10"
                        align="center"
                        style={{
                          minWidth: "100%",
                          fontWeight: "bold",
                          margin: "0 auto",
                          textAlign: "center",
                          padding: 10,
                        }}
                      >
                        There are no open trades
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Orders.propTypes = {
  buysell: PropTypes.bool,
  setBuysell: PropTypes.func.isRequired,
};

export default Orders;
