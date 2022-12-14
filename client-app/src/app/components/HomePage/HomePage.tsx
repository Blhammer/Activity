import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {
    Container,
    Header,
    Segment,
    Image,
    Button,
    Divider,
} from "semantic-ui-react";
import { useStore } from "../../stores/store";
import LoginForm from "../Users/LoginForm";
import RegisterForm from "../Users/RegisterForm";

const HomePage = () => {
    const { userStore, modalStore } = useStore();

    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image
                        size="massive"
                        src="/assets/logo.png"
                        alt="logo"
                        style={{ marginBottom: 12 }}
                    />
                    Activities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header
                            as="h2"
                            inverted
                            content="Welcome to Reactivities"
                        />
                        <Button as={Link} to="/activities" size="huge" inverted>
                            Go to Activities!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            onClick={() => modalStore.openModal(<LoginForm />)}
                            size="huge"
                            inverted
                        >
                            Login!
                        </Button>
                        <Button
                            onClick={() =>
                                modalStore.openModal(<RegisterForm />)
                            }
                            size="huge"
                            inverted
                        >
                            Register!
                        </Button>

                        <Divider horizontal inverted>
                            Or
                        </Divider>

                        <Button
                            loading={userStore.fbLoading}
                            size="huge"
                            inverted
                            color="facebook"
                            content="Login with Facebook"
                            onClick={userStore.facebookLogin}
                        />
                    </>
                )}
            </Container>
        </Segment>
    );
};

export default observer(HomePage);
