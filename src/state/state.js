import { createContext } from "react";
import { Machine, assign } from "xstate";

export const MachineContext = createContext();

const doLogin = async (context, event) => {
    const { username, password } = event;
    if (username !== "hello" && password !== "123") {
        throw new Error("Wrong username or password!");
    }
    return { username, password };
};

const storiesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";
const getStoryDataUrl = (id) =>
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const fetchStories = async () => {
    const storyIds = await fetch(storiesUrl).then((r) => r.json());
    const topTenStories = await Promise.all(
        storyIds
            .slice(0, 10)
            .map((id) => getStoryDataUrl(id))
            .map((url) => fetch(url).then((r) => r.json()))
    );
    return topTenStories;
};

export const appMachine = Machine({
    id: "app",
    initial: "init",
    // context - holds data of the state
    context: {
        user: undefined,
        error: undefined,
        stories: [],
    },
    states: {
        init: {},

        auth: {
            states: {
                started: {
                    invoke: {
                        id: "doLogin",
                        src: doLogin,
                        onDone: {
                            target: "success",
                            actions: assign({
                                user: (context, event) => event.data,
                            }),
                        },
                        onError: {
                            target: "failed",
                            actions: assign({
                                error: (context, event) => event.data,
                            }),
                        },
                    },
                },
                success: {},
                failed: {},
            },
        },

        list: {
            initial: "loading",
            states: {
                loading: {
                    invoke: {
                        id: "fetchStories",
                        src: fetchStories,
                        onDone: {
                            target: "success",
                            actions: assign({
                                stories: (context, event) => event.data,
                            }),
                        },
                        onError: {
                            target: "failed",
                            actions: assign({
                                error: (context, event) => event.data,
                            }),
                        },
                    },
                },
                success: {},
                fail: {},
            },
        },
    },
    on: {
        LOGIN: {
            target: "auth.started",
        },
    },
});
