import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routes from "./components/routes/Routes";
import setAuthToken from "./store/utils/setAuthToken";
import { LOGOUT } from "./store/action-types";
import { useActions } from "./components/hooks/useActions";
import { useSelector } from "react-redux";
import { store } from "./store";
import ScrollToView from "./components/utils/ScrollToView";

function App() {
  const { webData } = useSelector((state) => state.web);

  const { loadUser, getWebData } = useActions();

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      loadUser();
    }

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getWebData();

    let fav = document.querySelector("#favicon");
    let title = document.getElementById("title");
    if (fav) {
      fav.href = webData && webData.siteFav;
    }
    title.innerHTML = webData && webData.siteTitle;

    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <ScrollToView>
        <div className="App">
          <Routes />
        </div>
      </ScrollToView>
    </Router>
  );
}

export default App;
