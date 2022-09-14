import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import Navbar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<
        Activity | undefined
    >(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        agent.Activities.list().then((response) => {
            let activities: Activity[] = [];

            response.forEach((activity) => {
                activity.date = activity.date.split("T")[0];
                activities.push(activity);
            });

            setActivities(activities);
            setLoading(false);
        });
    }, []);

    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find((x) => x.id === id));
    }

    function handleCancelSelectedActivity() {
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?: string) {
        id ? handleSelectActivity(id) : handleCancelSelectedActivity();
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: Activity) {
        setSubmit(true);

        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([
                    ...activities.filter((x) => x.id !== activity.id),
                    activity,
                ]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmit(false);
            });
        } else {
            activity.id = uuid();

            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmit(false);
            });
        }
    }

    function handleDeleteActivity(id: string) {
        setSubmit(true);

        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter((x) => x.id !== id)]);
            setSubmit(false);
        });
    }

    if (loading) return <LoadingComponent content="Loading app" />;
    return (
        <Fragment>
            <Navbar openForm={handleFormOpen} />
            <Container style={{ marginTop: "7em" }}>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectedActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submit={submit}
                />
            </Container>
        </Fragment>
    );
}

export default App;
