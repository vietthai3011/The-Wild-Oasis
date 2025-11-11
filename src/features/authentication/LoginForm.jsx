import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
import { useState } from "react";

function LoginForm() {
    const [email, setEmail] = useState("vietthai3011@gmail.");
    const [password, setPassword] = useState("30112002");

    const { login, isLoading } = useLogin();

    function reset() {
        setEmail("");
        setPassword("");
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) return;

        login(
            { email, password },
            {
                onError: reset,
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormRowVertical>

            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRowVertical>

            <FormRowVertical>
                <Button size="large" disabled={isLoading}>
                    {!isLoading ? "Log in" : <SpinnerMini />}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
