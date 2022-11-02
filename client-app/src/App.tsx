import React, { Fragment, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { useStore } from "./app/stores/store";

// Import custom components

import LoadingComponent from "./app/components/Loading/Loading";
import ModalContainer from "./app/components/ModalContainer/ModalContainer";
import HomePage from "./app/components/HomePage/HomePage";
import Navbar from "./app/components/Navbar/NavBar";
import PrivateRoute from "./app/layout/PrivateRoute";
import ActivityDashboard from "./app/components/ActivitiesDashboard/ActivityDashboard";
import ActivityDetails from "./app/components/ActivitiesDetails/ActivityDetails";
import ActivityForm from "./app/components/ActivitiesForm/ActivityForm";
import ProfilePage from "./app/components/Profiles/ProfilePage";
import TestErrors from "./app/components/Errors/TestError";
import ServerError from "./app/components/Errors/ServerError";
import RegisterSuccess from "./app/components/Users/RegisterSuccess";
import ConfirmEmail from "./app/components/Users/ConfirmEmail";
import NotFound from "./app/components/Errors/NotFound";

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
                                <Route
                                    path="/account/registerSuccess"
                                    component={RegisterSuccess}
                                />
                                <Route
                                    path="/account/verifyEmail"
                                    component={ConfirmEmail}
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
