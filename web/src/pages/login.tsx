import Header from "@/components/ui/Header.tsx";
import {Card} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useUser} from "../hooks/useUser";
import {useNavigate} from "react-router-dom";

export function Login() {
    const [mode, setMode] = useState<"login" | "register">("login")
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const {user, loading, error, userLogin, userRegister} = useUser();

    useEffect(() => {
        if (!loading && user) {
            navigate("/dashboard");
        }
    }, [loading, user, navigate]);


    const onContinue = () => {
        if (mode === "login") {
            userLogin(email, password).then(
                () => navigate("/dashboard")
            )
        } else {
            userRegister(email, password).then(
                () => navigate("/dashboard")
            )
        }
    }

    const showUsername = false

    if (loading) return null;

    return (
        <div className="flex flex-col h-screen w-screen">
            <Header/>
            <main className={"flex justify-center h-full w-full gap-x-5 p-5"}>
                <Card className={"flex  w-1/3 px-10 py-10 gap-y-10 border"}>
                    {mode === "login" ? (
                        <div
                            className={"flex w-1/3 font-heading text-4xl p-2 font-medium bg-primary text-primary-foreground"}>
                            Login
                        </div>
                    ) : (
                        <div
                            className={"flex w-1/3 font-heading text-4xl p-2 font-medium bg-secondary text-secondary-foreground"}>
                            Register
                        </div>
                    )}
                    <div className={"flex flex-col gap-y-10 text-lg"}>

                        {/* form */}
                        <div className={"flex flex-col gap-y-5 text-lg"}>
                            {mode === "register" && showUsername && (
                                <div>
                                    Username:
                                    <Input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            )}
                            <div>
                                Email:
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                Password:
                                <Input
                                    type={"password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={"flex justify-between"}>

                            {mode === "login" ? ("Don't have an account yet?") : ("Already registered?")}
                            <div className={"flex w-1/2 justify-center"}>
                                <Button
                                    className={`flex flex-1 py-1 px-10 text-lg ${
                                        mode === "login" ?
                                            "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                            :
                                            "bg-primary text-primary-foreground hover:bg-primary/80"
                                    }`}
                                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                                >
                                    {mode === "login" ? "Register" : "Login"}
                                </Button>
                            </div>
                        </div>

                        {error !== null && (
                            <div>
                                {error}
                            </div>
                        )}

                        <div className={"flex justify-center"}>
                            <Button
                                className={
                                    `flex py-5 text-2xl font-medium font-heading w-1/2
                                ${
                                        mode === "login" ?
                                            "bg-primary text-primary-foreground hover:bg-primary/80"
                                            :
                                            "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    }`}
                                onClick={onContinue}
                            >
                                {mode === "login" ? "Login" : "Register"}
                            </Button>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    )
}