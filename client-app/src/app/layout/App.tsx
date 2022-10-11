import { Fragment } from "react";
import { Route, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import Navbar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "../../features/home/HomePage";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
    const location = useLocation();

    return (
        <Fragment>
            <Route exact path="/" component={HomePage} />
            <Route
                path={"/(.+)"}
                render={() => (
                    <Fragment>
                        <Navbar />
                        <Container style={{ marginTop: "7em" }}>
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
                        </Container>
                    </Fragment>
                )}
            />
        </Fragment>
    );
}

export default observer(App);
