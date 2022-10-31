import React, { Fragment, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/store";

// Import custom components

import HomePage from "../../features/home/HomePage";
import Navbar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import TestErrors from "../../features/errors/TestError";
import ServerError from "../../features/errors/ServerError";
import NotFound from "../../features/errors/NotFound";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";
import PrivateRoute from "./PrivateRoute";

function App() {
    const location = useLocation();
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            userStore
                .getFacebookLoginStatus()
                .then(() => commonStore.setAppLoaded());
        }
    }, [commonStore, userStore]);

    if (!commonStore.appLoaded)
        return <LoadingComponent content="Loading app..." />;

    return (
        <Fragment>
            <ToastContainer position="bottom-right" hideProgressBar />
            <ModalContainer />
            <Route exact path="/" component={HomePage} />
            <Route
                path={"/(.+)"}
                render={() => (
                    <Fragment>
                        <Navbar />
                        <Container style={{ marginTop: "7em" }}>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path="/activities"
                                    component={ActivityDashboard}
                                />
                                <PrivateRoute
                                    path="/activities/:id"
                                    component={ActivityDetails}
                                />
                                <PrivateRoute
                                    key={location.key}
                                    path={["/createActivity", "/manage/:id"]}
                                    component={ActivityForm}
                                />
                                <PrivateRoute
                                    path="/profiles/:username"
                                    component={ProfilePage}
                                />
                                <PrivateRoute
                                    path="/errors"
                                    component={TestErrors}
                                />
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
