import { useContext, useEffect } from "react";
import { MachineContext } from "../../state/state";
import Stories from "../stories/Stories";

const Home = (props) => {
    const [machine, send] = useContext(MachineContext);

    useEffect(() => {
        send("LOAD_STORIES");
    }, [send]);

    const { stories, error } = machine.context;

    return (
        <div className="">
            <h1>Home</h1>

            {machine.matches("list.loading") && <h2>Loading...</h2>}
            {machine.matches("list.failed") && (
                <div style={{ color: "red" }}>
                    Error loading stories: {error.toString()}
                </div>
            )}
            <div style={{ display: "flex" }}>
                <div style={{ display: "flex", maxWidth: 300 }}>
                    {stories && stories.length > 0 && (
                        <Stories
                            stories={stories}
                            sendToMachine={send}
                        />
                    )}
                </div>
                {/* <div style={{ display: "flex" }}>
                    <Switch>
                        <Route path="/story/:id">
                            <Story selectedStory={selectedStory} />
                        </Route>
                    </Switch>
                </div> */}
            </div>
        </div>
    );
};

export default Home;
