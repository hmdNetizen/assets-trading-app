import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import Ibox from "../utils/Ibox";
import { message } from "antd";
import Spinner from "../utils/Spinner";

const ForexBoxContents = ({
  selectedStock,
  setSelectedStock,
  setOpenForex,
}) => {
  const {
    loading,
    crypto,
    commodities,
    forex,
    iex,
    etf,
    stocksSelected,
    allStockAssets,
  } = useSelector((state) => state.stock);
  const { webData } = useSelector((state) => state.web);

  const {
    addStockToList,
    getCryptoAssets,
    getCommodityStocks,
    getInvestorsExchange,
    getExchangeTradedFund,
    getForexStocks,
    setCurrentAsset,
  } = useActions();

  const [showIbox, setShowIbox] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const [filterText, setFilterText] = useState("");

  const handleCurrentItem = (item) => {
    setShowIbox(true);
    setCurrentItem(item);
  };

  const handleAddStockToList = (item) => {
    if (stocksSelected.length >= 5) {
      message.error("You cannot add more than 5 stocks to the delete");
      // stocksSelected.splice(-1, 1, item);
    } else if (stocksSelected.some((stock) => stock.id === item.id)) {
      return stocksSelected;
    } else {
      addStockToList(item);
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    //   setStockLoading(false, 5000);
    // });

    getCryptoAssets();
    getForexStocks();
    getCommodityStocks();
    getInvestorsExchange();
    getExchangeTradedFund();

    // eslint-disable-next-line
  }, []);

  const spinnerStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginTop: -50,
  };

  return (
    <div className="second" style={{ position: "relative" }}>
      {loading ? (
        <Spinner style={spinnerStyle} />
      ) : (
        <div className="all">
          <div className="header">
            <form>
              <input
                type="search"
                name="search"
                value={filterText}
                placeholder="Search Asset"
                onChange={(event) => {
                  setFilterText(event.target.value);
                  setSelectedStock(0);
                }}
              />
            </form>
          </div>
          {showIbox && (
            <Ibox setShowIbox={setShowIbox} currentItem={currentItem} />
          )}
          <table>
            <tbody>
              <tr>
                <th>Asset</th>
                <th>Price</th>
                <th>Leverage</th>
                <th>Today Change</th>
              </tr>
              {selectedStock === 1 &&
                crypto.length > 0 &&
                crypto.map((item, index) => (
                  <tr
                    key={index}
                    onMouseMove={() => handleCurrentItem(item)}
                    onMouseLeave={() => setShowIbox(false)}
                    onClick={() => {
                      setCurrentAsset(item.id);
                      handleAddStockToList(item);
                      setOpenForex(false);
                    }}
                    className="childIsh"
                  >
                    <td>
                      <div className="dash-row dash-row-centralized">
                        <div>
                          <img src={item.image} alt="Asset logo" />
                        </div>
                        <div>
                          <span className="instrument">{item.sy}</span>
                        </div>
                      </div>
                    </td>
                    <td>$ {item.rate}</td>
                    <td>x{webData && webData.leverageAmount}</td>
                    <td>
                      <div className="dash-row dash-row-centralized space-around">
                        <div>
                          <span>-4.18%</span>
                        </div>
                        <div>
                          <i className="jam jam-star-f" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

              {selectedStock === 2 &&
                forex.length > 0 &&
                forex.map((item, index) => (
                  <tr
                    key={index}
                    onMouseMove={() => handleCurrentItem(item)}
                    onMouseLeave={() => setShowIbox(false)}
                    onClick={() => {
                      setCurrentAsset(item.id);
                      handleAddStockToList(item);
                      setOpenForex(false);
                    }}
                    className="childIsh"
                  >
                    <td>
                      <div className="dash-row dash-row-centralized">
                        <div>
                          <img src={item.image} alt="Asset logo" />
                        </div>
                        <div>
                          <span className="instrument">{item.sy}</span>
                        </div>
                      </div>
                    </td>
                    <td>$ {item.rate}</td>
                    <td>x{webData && webData.leverageAmount}</td>
                    <td>
                      <div className="dash-row dash-row-centralized space-around">
                        <div>
                          <span>-4.18%</span>
                        </div>
                        <div>
                          <i className="jam jam-star-f" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              {selectedStock === 3 &&
                iex.length > 0 &&
                iex.map((item, index) => (
                  <tr
                    key={index}
                    onMouseMove={() => handleCurrentItem(item)}
                    onMouseLeave={() => setShowIbox(false)}
                    onClick={() => {
                      setCurrentAsset(item.id);
                      handleAddStockToList(item);
                      setOpenForex(false);
                    }}
                    className="childIsh"
                  >
                    <td>
                      <div className="dash-row dash-row-centralized">
                        <div>
                          <img src={item.image} alt="Asset logo" />
                        </div>
                        <div>
                          <span className="instrument">{item.sy}</span>
                        </div>
                      </div>
                    </td>
                    <td>$ {item.rate}</td>
                    <td>x{webData && webData.leverageAmount}</td>
                    <td>
                      <div className="dash-row dash-row-centralized space-around">
                        <div>
                          <span>-4.18%</span>
                        </div>
                        <div>
                          <i className="jam jam-star-f" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

              {selectedStock === 4 &&
                commodities.length > 0 &&
                commodities.map((item, index) => (
                  <tr
                    key={index}
                    onMouseMove={() => handleCurrentItem(item)}
                    onMouseLeave={() => setShowIbox(false)}
                    onClick={() => {
                      setCurrentAsset(item.id);
                      handleAddStockToList(item);
                      setOpenForex(false);
                    }}
                    className="childIsh"
                  >
                    <td>
                      <div className="dash-row dash-row-centralized">
                        <div>
                          <img src={item.image} alt="Asset logo" />
                        </div>
                        <div>
                          <span className="instrument">{item.sy}</span>
                        </div>
                      </div>
                    </td>
                    <td>$ {item.rate}</td>
                    <td>x{webData && webData.leverageAmount}</td>
                    <td>
                      <div className="dash-row dash-row-centralized space-around">
                        <div>
                          <span>-4.18%</span>
                        </div>
                        <div>
                          <i className="jam jam-star-f" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              {selectedStock === 5 &&
                etf.length > 0 &&
                etf.map((item, index) => (
                  <tr
                    key={index}
                    onMouseMove={() => handleCurrentItem(item)}
                    onMouseLeave={() => setShowIbox(false)}
                    onClick={() => {
                      setCurrentAsset(item.id);
                      handleAddStockToList(item);
                      setOpenForex(false);
                    }}
                    className="childIsh"
                  >
                    <td>
                      <div className="dash-row dash-row-centralized">
                        <div>
                          <img src={item.image} alt="Asset logo" />
                        </div>
                        <div>
                          <span className="instrument">{item.sy}</span>
                        </div>
                      </div>
                    </td>
                    <td>$ {item.rate}</td>
                    <td>x{webData && webData.leverageAmount}</td>
                    <td>
                      <div className="dash-row dash-row-centralized space-around">
                        <div>
                          <span>-4.18%</span>
                        </div>
                        <div>
                          <i className="jam jam-star-f" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              {selectedStock === 0 &&
                allStockAssets.length > 0 &&
                allStockAssets
                  // eslint-disable-next-line
                  .filter((stock) => {
                    if (!filterText) {
                      return stock;
                    } else if (
                      stock.sy.toLowerCase().includes(filterText.toLowerCase())
                    ) {
                      return stock;
                    }
                  })
                  .map((item, index) => (
                    <tr
                      key={index}
                      onMouseMove={() => handleCurrentItem(item)}
                      onMouseLeave={() => setShowIbox(false)}
                      onClick={() => {
                        setCurrentAsset(item.id);
                        handleAddStockToList(item);
                        setOpenForex(false);
                      }}
                      className="childIsh"
                    >
                      <td>
                        <div className="dash-row dash-row-centralized">
                          <div>
                            <img src={item.image} alt="Asset logo" />
                          </div>
                          <div>
                            <span className="instrument">{item.sy}</span>
                          </div>
                        </div>
                      </td>
                      <td>$ {item.rate}</td>
                      <td>x{webData && webData.leverageAmount}</td>
                      <td>
                        <div className="dash-row dash-row-centralized space-around">
                          <div>
                            <span>-4.18%</span>
                          </div>
                          <div>
                            <i className="jam jam-star-f" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

ForexBoxContents.propTypes = {
  selectedStock: PropTypes.number.isRequired,
  setSelectedStock: PropTypes.func.isRequired,
  setOpenForex: PropTypes.func.isRequired,
};

export default ForexBoxContents;
