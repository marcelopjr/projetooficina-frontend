import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";
import { AuthProvider } from "./context/authContext";
import Loader from "./components/Loader";

import "./App.css";

import Cookie from "js-cookie";
import Swal from "sweetalert2";
import { Redirect } from "react-router";
import { useHistory, useLocation } from "react-router-dom";

const App = () => {
  const history = useHistory();
  // var automaticLogout;
  // function secondsToExpire() {
  //   var milisseconds = Math.abs(
  //     new Date(JSON.parse(Cookie.get("@token")).expire) - new Date().getTime()
  //   );
  //   var seconds = Math.round(milisseconds / 1000);

  //   console.log(seconds);

  //   if (seconds === 2) {
  //     clearInterval(automaticLogout);
  //     Swal.fire({
  //       title: "Sessão expirada",
  //       text: "Faça login novamente para continuar!",
  //       icon: "error",
  //       showCancelButton: false,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Ok!",
  //       allowOutsideClick: false,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         <a href="/login"></a>;
  //       }
  //     });
  //   }
  // }

  // if (Cookie.get("@token")) {
  //   automaticLogout = setInterval(secondsToExpire, 1000);
  // }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Loader />
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
