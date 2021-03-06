import UpdateOrderComponent from "./util/UpdateOrderComponent";

import { format } from "date-fns";
export const allTradesHeader = [
  {
    Header: "Ref",
    accessor: "_id",
    // eslint-disable-next-line
    accessor: ({ _id }) => <p>{_id.slice(3, 8)}</p>,
  },
  {
    Header: "Active",
    accessor: "isOpen",
    // eslint-disable-next-line
    accessor: ({ isOpen }) => (
      <p
        className={
          isOpen === true
            ? " text-center bg-success text-light"
            : " text-center bg-danger text-light"
        }
      >
        {isOpen === true ? "true" : "false"}
      </p>
    ),
  },

  {
    Header: "type",
    accessor: "tag",
    // eslint-disable-next-line
    accessor: ({ tag }) => (
      <p
        className={
          tag === "buy"
            ? " text-center bg-success text-light"
            : " text-center bg-danger text-light"
        }
      >
        {tag}
      </p>
    ),
  },
  {
    Header: "Margin",
    accessor: "margin",
  },
  {
    Header: "Profit",
    accessor: "profit",
    // eslint-disable-next-line
    accessor: ({ profit }) => (
      <p className={" text-center bg-success text-light"}>{profit}</p>
    ),
  },
  {
    Header: "Loss",
    accessor: "loss",
    // eslint-disable-next-line
    accessor: ({ loss }) => (
      <p className={" text-center bg-danger text-light"}>{loss}</p>
    ),
  },
  {
    Header: "Take Profit",
    accessor: "takeProfit",
  },
  {
    Header: "Stop Loss",
    accessor: "takeLoss",
  },
  {
    Header: "Name Of Assest",
    accessor: "nameOfAsset",
  },
  {
    Header: "Type Of Assest",
    accessor: "typeOfAsset",
  },
  {
    Header: "Open Rate",
    accessor: "openRateOfAsset",
  },
  {
    Header: "Close Rate",
    accessor: "closeRateOfAsset",
  },

  {
    Header: "Time",
    accessor: "time",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Action",
    accessor: "icon",
    // eslint-disable-next-line
    accessor: ({
      _id,
      tag,
      nameOfAsset,
      typeOfAsset,
      openRateOfAsset,
      closeRateOfAsset,
      margin,
      takeProfit,
      takeLoss,
      stockAmount,
    }) => {
      let trade = {
        _id,
        tag,
        nameOfAsset,
        typeOfAsset,
        openRateOfAsset,
        closeRateOfAsset,
        margin,
        takeProfit,
        takeLoss,
        stockAmount,
      };
      return <UpdateOrderComponent props={trade} />;
    },
  },
];
