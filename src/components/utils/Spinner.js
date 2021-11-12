import Loader from "react-loader-spinner";

const Spinner = ({ style, type, color, height, width }) => (
  <div style={style}>
    <Loader type={type} color={color} height={height} width={width} />
  </div>
);

Spinner.defaultProps = {
  height: 25,
  width: 25,
  color: "#fff",
};

export default Spinner;
