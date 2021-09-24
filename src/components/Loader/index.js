import React, { useContext } from "react";
import Loading from "react-loader-spinner";
import "./styles.css";
import AuthContext from "../../context/authContext";

const Loader = () => {
  const { isLoading } = useContext(AuthContext);
  return (
    <>
      {isLoading ? (
        <div class="loader-div-main">
          <Loading type="ThreeDots" color="#00BFFF" height={100} width={100} />
        </div>
      ) : null}
    </>
  );
};

export default Loader;
