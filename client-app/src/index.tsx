import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { store, StoreContext } from "./app/stores/store";
import { createBrowserHistory } from "history";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

export const history = createBrowserHistory();

root.render(
    <StoreContext.Provider value={store}>
        <Router history={history}>
            <App />
        </Router>
    </StoreContext.Provider>
);

reportWebVitals();
