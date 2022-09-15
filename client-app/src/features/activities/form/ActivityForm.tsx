import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

const ActivityForm = () => {
    const { activityStore } = useStore();
    const {
        selectedActivity,
        closeForm,
        createActivity,
        updateActivity,
        loading,
    } = activityStore;

    const initialState = selectedActivity ?? {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
    };

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        setActivity({ ...activity, [name]: value });
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
                    onClick={closeForm}
                    floated="right"
                    type="button"
                    content="Cancel"
                />
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);
