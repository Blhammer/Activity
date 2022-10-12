import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.css";
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
