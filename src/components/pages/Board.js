import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import SubSidebar from "../layouts/SubSidebar";
import Orders from "../utils/Orders";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import BuyStockModal from "../utils/modals/trading/BuyStock";
import { useActions } from "../hooks/useActions";
import SellStockModal from "../utils/modals/trading/SellStock";
// import { getPandL } from "../../helpers/getProfitOrLoss";
import { getAssetRate, getAssetInfo } from "../../helpers/getAssetDetails";

const Board = (props) => {
  const [sellStock, setSellStock] = useState(false);
  const [disableTakeProfit, setDisableTakeProfit] = useState(true);
  const [disableStopLoss, setDisableStopLoss] = useState(true);
  const [profitAmount, setProfitAmount] = useState(0);
  const [stopLossAmount, setStopLossAmount] = useState(0);
  const [buyStock, setBuyStock] = useState(false);

  const { setLevIsh, levIsh, buysell, setBuysell, data } = props;

  const { user, loading } = useSelector((state) => state.auth);
  const { userMargin } = useSelector((state) => state.profile);
  const { currentSelectedStock, defaultStockAsset, stocksSelected } =
    useSelector((state) => state.stock);

  // Action creators
  const { setUserMargin } = useActions();

  // const profitOrLoss = getPandL(
  //   openTrades,
  //   allStockAssets,
  //   data?.leverageAmount
  // );

  const handleOpenBuyStock = () => {
    setBuyStock(true);
    setSellStock(false);
  };

  // const handleOpenSellStock = () => {
  //   if (user && user.autoTrade) {
  //     message.warning(
  //       `AutoCopy Trader is Active, Turn off AutoCopy Trader to trade manually`
  //     );
  //   } else if (user && (user.wallet <= 0 || userMargin > user.wallet)) {
  //     message.warning(`You need to make a deposit to buy the stock`);
  //   } else if (user && !user.liveTrade) {
  //     message.warning("Live Trade is turned off. Contact Admin");
  //   } else {
  //     setSellStock(true);
  //     setBuyStock(false);
  //   }
  // };

  const handleOpenSellStock = () => {
    setSellStock(true);
    setBuyStock(false);
  };

  // A custom hook for rerendering the dashboard component after 10 secondays
  // To keep track of asset changes

  return (
    !loading && (
      <Fragment>
        <div className="details">
          <SubSidebar />
        </div>
        <div className="market">
          <div className="trade">
            <div className="dash-row">
              <div className="chart">
                {/* <div className="chartPandL">
                  <h2>
                    <span style={{ color: "#aaa", fontWeight: 300 }}>
                      P/L ={" "}
                    </span>
                    <span
                      style={{
                        color:
                          parseFloat(profitOrLoss) >= 0 ? "#54ac40" : "red",
                      }}
                    >
                      {new Intl.NumberFormat("en-US")
                        .format(parseFloat(profitOrLoss))
                        .slice(0, 9)}
                    </span>
                  </h2>
                </div> */}
                {/* TradingView Widget BEGIN */}
                <div className="tradingview-widget-container">
                  <div id="tradingview_65e38" />
                  <div
                    className="tradingview-widget-copyright"
                    style={{ height: "73vh" }}
                  >
                    <a
                      style={{ display: "none" }}
                      href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="blue-text">
                        {!loading &&
                          getAssetInfo(
                            stocksSelected,
                            currentSelectedStock,
                            defaultStockAsset
                          ).sy}
                        Chart
                      </span>
                    </a>{" "}
                    <TradingViewWidget
                      symbol={
                        !loading && Object.keys(currentSelectedStock).length > 0
                          ? currentSelectedStock.sy
                          : "BTCUSD"
                      }
                      theme={Themes.DARK}
                      autosize
                      locale="en"
                      toolbar_bg="#f1f3f6"
                      // eslint-disable-next-line
                      style="3"
                      // range="1d"
                      enable_publishing={false}
                      hide_side_toolbar={false}
                      allow_symbol_change={true}
                    />
                    <span style={{ display: "none" }}>by TradingView</span>
                  </div>
                </div>
                {/* TradingView Widget END */}
              </div>
              <div className="trade-action">
                <div className="trade-amount">
                  <div className="trade-amount-input">
                    <span className="dash-alt-text text">Amount</span>
                    <span className="amount">
                      {user && user.currency.sign}
                      <input
                        className="input"
                        type="number"
                        name="amount"
                        defaultValue={userMargin}
                        value={userMargin}
                        min={1}
                        max={50000}
                        onChange={(e) => setUserMargin(e.target.value)}
                      />
                    </span>
                  </div>
                  <div className="dash-row">
                    <div
                      className="trade-amount-minus"
                      style={{
                        pointerEvents: userMargin === 1 ? "none" : "auto",
                      }}
                      onClick={() => setUserMargin(userMargin - 1)}
                    >
                      <span>-</span>
                    </div>
                    <div
                      className="trade-amount-add"
                      onClick={() => setUserMargin(userMargin + 1)}
                    >
                      <span>+</span>
                    </div>
                  </div>
                </div>
                <div
                  className="trade-amount levIsh"
                  onClick={() => setLevIsh((prev) => !prev)}
                >
                  <div
                    className="trade-amount-input"
                    onClick={() => setLevIsh((prev) => !prev)}
                  >
                    <div onClick={() => setLevIsh((prev) => !prev)}>
                      <span className="dash-alt-text text">Leverage</span>
                      <span className="amount">
                        X{data && data.leverageAmount}
                      </span>
                    </div>
                  </div>
                </div>

                {levIsh && (
                  <div className="levC">
                    <div className="levHeader">
                      x{data && data.leverageAmount}
                    </div>
                    x{data && data.leverageAmount} Leverage means that if the
                    asset price changes by 1% your position performance will
                    increase by {data && data.leverageAmount}%
                  </div>
                )}

                <div className="cad">
                  <span className="text">
                    {!loading &&
                    stocksSelected.length > 0 &&
                    Object.keys(currentSelectedStock).length > 0
                      ? currentSelectedStock.sy
                      : defaultStockAsset.sy}{" "}
                    quantity
                  </span>
                  <span className="amount">
                    {!loading &&
                      getAssetRate(
                        stocksSelected,
                        defaultStockAsset,
                        currentSelectedStock,
                        userMargin,
                        data && data.leverageAmount
                      )
                        .toString()
                        .slice(0, 8)}
                  </span>
                </div>
                {user &&
                user.wallet > 0 &&
                !user.isTrading &&
                user.liveTrade ? (
                  <div className="actions">
                    <div
                      className={
                        user &&
                        (!user.liveTrade || user.autoTrade || user.wallet < 0)
                          ? "buy credit turnG"
                          : "buy credit"
                      }
                      onClick={handleOpenBuyStock}
                    >
                      <div className="dtl">
                        {/* onClick={closeSetlevIsh} */}
                        <svg
                          id="Capa_1"
                          enableBackground="new 0 0 512 512"
                          height="25"
                          viewBox="0 0 512 512"
                          width="25"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path d="m512 482h-30v-302h-91v302h-30v-182h-90v182h-30v-242h-90v242h-30v-152h-91v152h-30v30h512z" />
                            <path d="m512 120v-120h-121v30h69.789l-144.789 143.789-120-120-191.605 190.606 21.21 21.21 170.395-169.394 120 120 166-165v68.789z" />
                          </g>
                        </svg>

                        <span className="text">BUY</span>
                      </div>
                    </div>
                    <div
                      // className="sell"
                      className={
                        user &&
                        (!user.liveTrade || user.autoTrade || user.wallet < 0)
                          ? "sell turnR"
                          : "sell"
                      }
                      onClick={handleOpenSellStock}
                    >
                      <div className="dtl">
                        {/* onClick={closeSetlevIsh} */}
                        <svg
                          id="Capa_1"
                          enableBackground="new 0 0 512 512"
                          height="25"
                          viewBox="0 0 512 512"
                          width="25"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path d="m482 330h-91v152h-30v-242h-90v242h-30v-182h-90v182h-30v-302h-91v302h-30v30h511l1-30h-30z" />
                            <path d="m482 218.789-166-165-120 120-174.789-173.789-21.211 21.211 196 195 120-120 144.789 143.789h-69.789v30h121v-120h-30z" />
                          </g>
                        </svg>

                        <span className="text">SELL</span>
                      </div>
                    </div>
                    <div>
                      <h5
                        style={{
                          color: "white",
                          whiteSpace: "nowrap",
                          marginTop: "2%",
                          marginBottom: "1px",
                        }}
                      >
                        AutoCopy <br />
                        Trader
                      </h5>
                      <div className="switish1">
                        <label className="switch">
                          <input
                            type="checkbox"
                            defaultChecked={user && user.autoTrade}
                            // onChange={handleTrading}
                            disabled={true}
                          />
                          <span className="slider round" />
                        </label>
                      </div>
                    </div>
                    {/* <div>
                        <svg
                          width="76px"
                          height="94px"
                          viewBox="0 0 76 94"
                          id={user && user.autoTrade ? "bulb" : "bulbOff"}
                          className={
                            user && user.autoTrade ? "bulb" : "bulbOff"
                          }
                          onclick="void(0);"
                        >
                          <path d="M76,37.037 C76,59.939 55.6428571,75.427 55.6428571,93.5 L20.3571429,93.5 C20.3571429,75.427 0,59.9335 0,37.037 C0,13.1505 18.9891429,0 37.9782857,0 C56.9891429,0 76,13.167 76,37.037 L76,37.037 Z" />
                        </svg>
                        <div id={user && user.autoTrade ? "glow" : "glowOff"} />
                        <svg
                          width="32px"
                          height="33px"
                          viewBox="0 0 32 33"
                          id="base"
                        >
                          <path d="M29.3333333,0 L2.66666667,0 C1.19466667,0 0,1.232 0,2.75 C0,4.268 1.19466667,5.5 2.66666667,5.5 L29.3333333,5.5 C30.8053333,5.5 32,4.268 32,2.75 C32,1.232 30.8053333,0 29.3333333,0 L29.3333333,0 Z M29.3333333,11 L2.66666667,11 C1.19466667,11 0,12.232 0,13.75 C0,15.268 1.19466667,16.5 2.66666667,16.5 L29.3333333,16.5 C30.8053333,16.5 32,15.268 32,13.75 C32,12.232 30.8053333,11 29.3333333,11 L29.3333333,11 Z M30.6666667,22 L1.33333333,22 L9.072,31.1245 C10.0853333,32.3125 11.552,33 13.088,33 L18.9173333,33 C20.4533333,33 21.9146667,32.3125 22.928,31.1245 L30.6666667,22 L30.6666667,22 Z" />
                        </svg>
                      </div> */}
                  </div>
                ) : (
                  <div className="actions1 credit">
                    {/* onClick={closeSetlevIsh} */}
                    <div
                      className={
                        user && user.isTrading
                          ? "buy credit turnG"
                          : "buy credit"
                      }
                      onClick={handleOpenBuyStock}
                    >
                      <div className="dtl">
                        <svg
                          id="Capa_1"
                          enableBackground="new 0 0 512 512"
                          height="25"
                          viewBox="0 0 512 512"
                          width="25"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path d="m512 482h-30v-302h-91v302h-30v-182h-90v182h-30v-242h-90v242h-30v-152h-91v152h-30v30h512z" />
                            <path d="m512 120v-120h-121v30h69.789l-144.789 143.789-120-120-191.605 190.606 21.21 21.21 170.395-169.394 120 120 166-165v68.789z" />
                          </g>
                        </svg>

                        <span className="text">BUY</span>
                      </div>
                    </div>
                    <div
                      className={user && user.isTrading ? "sell turnR" : "sell"}
                      onClick={handleOpenSellStock}
                    >
                      <div className="dtl">
                        <svg
                          id="Capa_1"
                          enableBackground="new 0 0 512 512"
                          height="25"
                          viewBox="0 0 512 512"
                          width="25"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path d="m482 330h-91v152h-30v-242h-90v242h-30v-182h-90v182h-30v-302h-91v302h-30v30h511l1-30h-30z" />
                            <path d="m482 218.789-166-165-120 120-174.789-173.789-21.211 21.211 196 195 120-120 144.789 143.789h-69.789v30h121v-120h-30z" />
                          </g>
                        </svg>

                        <span className="text">SELL</span>
                      </div>
                    </div>

                    {/* {user ? (
                      <>
                        <div>
                          <svg
                            width="76px"
                            height="94px"
                            viewBox="0 0 76 94"
                            id={user.autoTrade ? "bulb" : "bulbOff"}
                            className={user.autoTrade ? "bulb" : "bulbOff"}
                            onclick="void(0);"
                          >
                            <path d="M76,37.037 C76,59.939 55.6428571,75.427 55.6428571,93.5 L20.3571429,93.5 C20.3571429,75.427 0,59.9335 0,37.037 C0,13.1505 18.9891429,0 37.9782857,0 C56.9891429,0 76,13.167 76,37.037 L76,37.037 Z" />
                          </svg>
                          <div id={user.autoTrade ? "glow" : "glowOff"} />
                          <svg
                            width="32px"
                            height="33px"
                            viewBox="0 0 32 33"
                            id="base"
                          >
                            <path d="M29.3333333,0 L2.66666667,0 C1.19466667,0 0,1.232 0,2.75 C0,4.268 1.19466667,5.5 2.66666667,5.5 L29.3333333,5.5 C30.8053333,5.5 32,4.268 32,2.75 C32,1.232 30.8053333,0 29.3333333,0 L29.3333333,0 Z M29.3333333,11 L2.66666667,11 C1.19466667,11 0,12.232 0,13.75 C0,15.268 1.19466667,16.5 2.66666667,16.5 L29.3333333,16.5 C30.8053333,16.5 32,15.268 32,13.75 C32,12.232 30.8053333,11 29.3333333,11 L29.3333333,11 Z M30.6666667,22 L1.33333333,22 L9.072,31.1245 C10.0853333,32.3125 11.552,33 13.088,33 L18.9173333,33 C20.4533333,33 21.9146667,32.3125 22.928,31.1245 L30.6666667,22 L30.6666667,22 Z" />
                          </svg>
                        </div>
                      </>
                    ) : null} */}
                  </div>
                )}
              </div>
              <div></div>
            </div>
          </div>
          <Orders buysell={buysell} setBuysell={setBuysell} />
        </div>
        {buyStock && (
          <section className="buy-option" style={{ display: "block" }}>
            <BuyStockModal
              disableStopLoss={disableStopLoss}
              disableTakeProfit={disableTakeProfit}
              setDisableStopLoss={setDisableStopLoss}
              setDisableTakeProfit={setDisableTakeProfit}
              setStopLossAmount={setStopLossAmount}
              profitAmount={profitAmount}
              setBuyStock={setBuyStock}
              setProfitAmount={setProfitAmount}
              stopLossAmount={stopLossAmount}
              setBuysell={setBuysell}
            />
          </section>
        )}

        {sellStock && (
          <section className="sell-option" style={{ display: "block" }}>
            <SellStockModal
              disableStopLoss={disableStopLoss}
              disableTakeProfit={disableTakeProfit}
              setDisableStopLoss={setDisableStopLoss}
              setDisableTakeProfit={setDisableTakeProfit}
              setStopLossAmount={setStopLossAmount}
              profitAmount={profitAmount}
              setSellStock={setSellStock}
              setProfitAmount={setProfitAmount}
              stopLossAmount={stopLossAmount}
              setBuysell={setBuysell}
            />
          </section>
        )}
      </Fragment>
    )
  );
};

export default Board;

Board.propTypes = {
  buysell: PropTypes.bool.isRequired,
  setBuysell: PropTypes.func.isRequired,
  levIsh: PropTypes.bool.isRequired,
  setLevIsh: PropTypes.func.isRequired,
  data: PropTypes.object,
};
