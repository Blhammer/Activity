import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

const ActivityForm = () => {
    const history = useHistory();

    const { activityStore } = useStore();
    const {
        createActivity,
        updateActivity,
        loadActivity,
        loading,
        loadingInitial,
    } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState({
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
    });

    useEffect(() => {
        if (id) loadActivity(id).then((activity) => setActivity(activity!));
    }, [id, loadActivity]);

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid(),
            };
            createActivity(newActivity).then(() =>
                history.push(`/activities/${newActivity.id}`)
            );
        } else {
            updateActivity(activity).then(() =>
                history.push(`/activities/${activity.id}`)
            );
        }
    }

    function handleInputChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        setActivity({ ...activity, [name]: value });
    }

    if (loadingInitial) {
        return <LoadingComponent content="Loading activity..." />;
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input
                    placeholder="Title"
                    onChange={handleInputChange}
                    value={activity.title}
                    name="title"
                />
                <Form.TextArea
                    placeholder="Description"
                    onChange={handleInputChange}
                    value={activity.description}
                    name="description"
                />
                <Form.Input
                    placeholder="Category"
                    onChange={handleInputChange}
                    value={activity.category}
                    name="category"
                />
                <Form.Input
                    placeholder="Date"
                    onChange={handleInputChange}
                    value={activity.date}
                    type="date"
                    name="date"
                />
                <Form.Input
                    placeholder="City"
                    onChange={handleInputChange}
                    value={activity.city}
                    name="city"
                />
                <Form.Input
                    placeholder="Venue"
                    onChange={handleInputChange}
                    value={activity.venue}
                    name="venue"
                />
                <Button
                    loading={loading}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                />
                <Button
                    as={Link}
                    to="/activities"
                    floated="right"
                    type="button"
                    content="Cancel"
                />
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);
