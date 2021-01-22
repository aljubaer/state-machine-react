import React, { useContext, useRef } from "react";
import { Redirect } from "react-router-dom";
import { MachineContext } from "../../state/state";

const Login = (props) => {
    const userRef = useRef();
    const passwordRef = useRef();
    
    const [machine, send] = useContext(MachineContext);
    const { error } = machine.context;

    const doLogin = () => {
        const username = userRef.current.value;
        const password = passwordRef.current.value;
        send("LOGIN", { username, password });
    };

    return (
        <div>
            <h1>Login works</h1>
            <div>
                <input type="text" placeholder="username" ref={userRef} />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="password"
                    ref={passwordRef}
                />
            </div>
            {machine.matches("auth.failed") && (
                <div style={{ color: "red" }}>{error.toString()}</div>
            )}
            <button onClick={doLogin}>Login</button>
            {machine.matches("auth.success") && <Redirect to="/" />}
        </div>
    );
};

export default Login;
