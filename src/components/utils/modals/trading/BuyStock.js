import PropTypes from "prop-types";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
import {
  getAssetRate,
  getAssetInfo,
} from "../../../../helpers/getAssetDetails";
import { message } from "antd";
import { animateBalance } from "../../../../helpers/animateBalance";
import { getActiveTradeMargin } from "../../../../helpers/getActiveTradeMargin";
import { getUserBalance } from "./../../../../helpers/getUserBalance";

const BuyStockModal = (props) => {
  const {
    setProfitAmount,
    setDisableTakeProfit,
    disableTakeProfit,
    setDisableStopLoss,
    disableStopLoss,
    setStopLossAmount,
    setBuyStock,
    profitAmount,
    stopLossAmount,
    setBuysell,
  } = props;

  const { user } = useSelector((state) => state.auth);
  const { stocksSelected, currentSelectedStock, defaultStockAsset } =
    useSelector((state) => state.stock);
  const { error, userMargin, activeTrade } = useSelector(
    (state) => state.profile
  );
  const { webData } = useSelector((state) => state.web);

  const { purchaseStockAsset, setCurrentlyActiveTrade, setUserMargin } =
    useActions();

  // const openTradesMargin = tradesMargin(openTrades);

  const activeTradeMargin = getActiveTradeMargin(activeTrade);

  const balance = getUserBalance(user) - activeTradeMargin;

  const handleStockPurchase = (event) => {
    event.preventDefault();
    if (userMargin.toString().trim() === "" || parseFloat(userMargin) < 1) {
      message.error("Stock amount cannot be empty or zero");
    } else if (userMargin > user.wallet) {
      message.error("You do not have enough money in your wallet");
    } else if (error) {
      message.error("Error processing your stock purchase");
    } else {
      purchaseStockAsset(user._id, {
        userId: user._id,
        tag: "buy",
        margin: parseFloat(userMargin),
        stockAmount: getAssetRate(
          stocksSelected,
          defaultStockAsset,
          currentSelectedStock,
          parseFloat(userMargin),
          webData && webData.leverageAmount
        ),
        nameOfAsset: getAssetInfo(
          stocksSelected,
          defaultStockAsset,
          currentSelectedStock
        ).sy,
        typeOfAsset: getAssetInfo(
          stocksSelected,
          defaultStockAsset,
          currentSelectedStock
        ).type,
        openRateOfAsset: getAssetInfo(
          stocksSelected,
          defaultStockAsset,
          currentSelectedStock
        ).rate,
        closeRateOfAsset: 0,
        takeProfit: profitAmount && parseFloat(profitAmount),
        takeLoss: stopLossAmount && parseFloat(stopLossAmount),
        profit: 0,
        loss: 0,
      });
      message.success(
        ` ${
          getAssetInfo(stocksSelected, defaultStockAsset, currentSelectedStock)
            .sy
        } has been successfully purchased`
      );
      animateBalance("balance", balance, balance - userMargin, 3000);
      // getCurrentProfile(user && user._id)
      setCurrentlyActiveTrade(
        Object.keys(currentSelectedStock).length > 0
          ? { ...currentSelectedStock, margin: userMargin, tag: "buy" }
          : { ...defaultStockAsset, margin: userMargin, tag: "buy" }
      );
      setBuysell(true);
      setTimeout(() => setBuysell(false), 10000);
    }
    setBuyStock(false);
    setUserMargin(1);
  };

  return (
    <form onSubmit={handleStockPurchase}>
      <h6>CONFIRMATION</h6>
      <div className="dash-row dash-row-centralized">
        <div className="split">
          <span>Unit price</span>
        </div>
        <div className="split moved">
          <span>
            $
            {
              getAssetInfo(
                stocksSelected,
                defaultStockAsset,
                currentSelectedStock
              ).rate
            }{" "}
          </span>
        </div>
      </div>
      <div className="dash-row dash-row-centralized">
        <div className="split">
          <span>Investment</span>
        </div>
        <div className="split moved">
          <span>
            {getAssetRate(
              stocksSelected,
              defaultStockAsset,
              currentSelectedStock,
              parseFloat(userMargin),
              webData && webData.leverageAmount
            )}{" "}
            {getAssetInfo(stocksSelected, defaultStockAsset,
            currentSelectedStock).sy}
          </span>
        </div>
      </div>
      <div className="dash-row dash-row-centralized">
        <div className="split">
          <span>
            {
              getAssetInfo(
                stocksSelected,
                defaultStockAsset,
                currentSelectedStock
              ).sy
            }{" "}
            Quantity
          </span>
        </div>
        <div className="split moved">
          <span>{userMargin}</span>
        </div>
      </div>
      <div className="dash-row dash-row-centralized">
        <div className="split">
          <span>Leverage</span>
        </div>
        <div className="split moved">
          <span>{webData && webData.leverageAmount}</span>
        </div>
      </div>
      <div className="dash-row dash-row-centralized">
        <div className="split">
          <span>Margin Required</span>
        </div>
        <div className="split moved">
          <span>{userMargin}</span>
        </div>
      </div>
      <div
        className="dash-row dash-row-centralized"
        style={{ marginBottom: "-26px" }}
      >
        <div className="split">
          <span>Take Profit</span>
        </div>
        <div className="split moved">
          <div className="dash-row">
            <div className="switish">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!disableTakeProfit}
                  onChange={() => {
                    setDisableTakeProfit((prev) => !prev);
                    setProfitAmount("");
                  }}
                />
                <span className="slider round" />
              </label>
              <input
                type="number"
                name="profit"
                min={1}
                max={5000000000}
                placeholder="+ 100"
                disabled={disableTakeProfit}
                value={profitAmount}
                onChange={(e) => setProfitAmount(e.target.value)}
                style={{ color: !disableTakeProfit ? "#1a202d" : undefined }}
              />
            </div>
            <div>
              <span> </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="dash-row dash-row-centralized"
        style={{ marginTop: "15%" }}
      >
        <div className="split">
          <span>Stop Loss</span>
        </div>
        <div className="split moved">
          <div className="dash-row">
            <div className="switish">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!disableStopLoss}
                  onChange={() => {
                    setDisableStopLoss((prev) => !prev);
                    setStopLossAmount("");
                  }}
                />
                <span className="slider round" />
              </label>{" "}
              <input
                type="number"
                name="loss"
                max={0}
                placeholder="-100"
                disabled={disableStopLoss}
                value={stopLossAmount}
                onChange={(e) => setStopLossAmount(e.target.value)}
                style={{ color: !disableStopLoss ? "#1a202d" : undefined }}
              />
            </div>
            <div>
              <span> </span>
            </div>
          </div>
        </div>
      </div>
      <div className="dash-row dash-row-centralized">
        <div className="split">
          <span>Commission</span>
        </div>
        <div className="split moved">
          <span>
            2.00% ={" "}
            {getAssetRate(
              stocksSelected,
              defaultStockAsset,
              currentSelectedStock,
              parseFloat(userMargin),
              webData && webData.leverageAmount
            )}{" "}
            {
              getAssetInfo(
                stocksSelected,
                defaultStockAsset,
                currentSelectedStock
              ).sy
            }
          </span>
        </div>
      </div>
      <div className="dash-row dash-row-centralized highlighted">
        <div className="split">
          <span>TRADE</span>
        </div>
        <div className="split moved">
          <span>
            {user && user.currency.sign}
            {(
              getAssetRate(
                stocksSelected,
                defaultStockAsset,
                currentSelectedStock,
                parseFloat(userMargin),
                webData && webData.leverageAmount
              ) -
              getAssetRate(
                stocksSelected,
                defaultStockAsset,
                currentSelectedStock,
                parseFloat(userMargin),
                webData && webData.leverageAmount
              ) *
                0.02
            )
              .toString()
              .slice(0, 8)}
          </span>
        </div>
      </div>
      <div className="dash-row">
        <button className="close1">Confirm buying</button>
      </div>
      <span className="close" onClick={() => setBuyStock(false)}>
        <svg id="lnr-cross " viewBox="0 0 1024 1024">
          <title>close</title>
          <path
            className="path1"
            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
          />
        </svg>
      </span>
    </form>
  );
};

BuyStockModal.propTypes = {
  setProfitAmount: PropTypes.func.isRequired,
  setDisableTakeProfit: PropTypes.func.isRequired,
  disableTakeProfit: PropTypes.bool.isRequired,
  setDisableStopLoss: PropTypes.func.isRequired,
  disableStopLoss: PropTypes.bool.isRequired,
  setStopLossAmount: PropTypes.func.isRequired,
  setBuyStock: PropTypes.func.isRequired,
  profitAmount: PropTypes.string.isRequired,
  stopLossAmount: PropTypes.string.isRequired,
  setBuysell: PropTypes.func.isRequired,
};

export default BuyStockModal;
