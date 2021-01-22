import "./App.css";

import { useMachine } from "@xstate/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { appMachine, MachineContext } from "./state/state";

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import PrivateRoute from "./components/privateroute/PrivateRoute";

function App() {
    const [currentMachine, send] = useMachine(appMachine);

    return (
        <MachineContext.Provider value={[currentMachine, send]}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <PrivateRoute machine={currentMachine} path="/">
                            <Home />
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        </MachineContext.Provider>
    );
}

export default App;
