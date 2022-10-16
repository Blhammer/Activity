import { Fragment } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";

// Import custom components

import HomePage from "../../features/home/HomePage";
import Navbar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import TestErrors from "../../features/errors/TestError";
import ServerError from "../../features/errors/ServerError";
import NotFound from "../../features/errors/NotFound";

function App() {
    const location = useLocation();

    return (
        <Fragment>
            <ToastContainer position="bottom-right" hideProgressBar />
            <Route exact path="/" component={HomePage} />
            <Route
                path={"/(.+)"}
                render={() => (
                    <Fragment>
                        <Navbar />
                        <Container style={{ marginTop: "7em" }}>
                            <Switch>
                                <Route
                                    exact
                                    path="/activities"
                                    component={ActivityDashboard}
                                />
                                <Route
                                    path="/activities/:id"
                                    component={ActivityDetails}
                                />
                                <Route
                                    key={location.key}
                                    path={["/createActivity", "/manage/:id"]}
                                    component={ActivityForm}
                                />
                                <Route path="/errors" component={TestErrors} />
                                <Route
                                    path="/server-error"
                                    component={ServerError}
                                />
                                <Route component={NotFound} />
                            </Switch>
                        </Container>
                    </Fragment>
                )}
            />
        </Fragment>
    );
}

export default observer(App);
