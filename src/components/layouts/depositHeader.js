import { format } from "date-fns";
import ApproveDeposit from "./ApproveDeposit";
import PaymentModal from "./PaymentModal";
export const depositHeader = [
  {
    id: "Ref",
    Header: "Ref",
    accessor: ({ Ref }) => <strong> {Ref}</strong>,
  },
  {
    id: "name",
    Header: "Name",
    accessor: "name",
  },

  {
    id: "time",
    Header: "Created date",
    accessor: "time",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },

  {
    Header: "Amount Paid",
    accessor: ({ amount }) => <strong>{amount}</strong>,
  },
  {
    id: "Fee",
    Header: "Fee",
    accessor: "fee",
  },

  {
    id: "Wallet Received",
    Header: "Wallet Received",
    accessor: "__v",
  },

  {
    Header: "Amount Received",
    accessor: "amount",
    // eslint-disable-next-line
    accessor: ({ amount }) => amount,
  },
  {
    id: "method",
    Header: "Payment Gateway",
    accessor: "method",
  },
  {
    Header: "Payment Details",
    accessor: "method",
    // eslint-disable-next-line
    accessor: (method) => <PaymentModal method={method} />,
  },
  {
    Header: "Status",
    accessor: "status",
    // eslint-disable-next-line
    accessor: ({ status }) => (
      <p
        className={
          status === "Pending" || status === "Declined"
            ? "bg-danger text-light   text-center"
            : "bg-success text-light   text-center "
        }
      >
        {status}
      </p>
    ),
  },
  {
    Header: "Action",
    accessor: "status",
    // eslint-disable-next-line
    accessor: (status) => <ApproveDeposit status={status} />,
  },
];
