import Header from "@/components/ui/Header.tsx";
import {Card} from "@/components/ui/card.tsx";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export function Login() {
    const [login, setLogin] = useState<"login" | "register">("login")
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col h-screen w-screen">
            <Header/>
            <main className={"flex justify-center h-full w-full gap-x-5 p-5"}>
                <Card className={"flex w-1/3 px-10 py-10 gap-y-10 border"}>
                    <div
                        className={"flex w-1/3 font-heading text-4xl p-2 font-medium bg-primary text-primary-foreground"}>
                        Login
                    </div>
                    <div className={"flex flex-col gap-y-10 text-lg"}>

                        {/* form */}
                        <div className={"flex flex-col gap-y-5 text-xl"}>
                            <div className="flex flex-col gap-y-2">
                                <div className={"flex w-1/5 px-2 bg-today text-today-foreground"}>
                                    Username:
                                </div>
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <div className={"flex w-1/5 px-2 bg-week text-week-foreground"}>
                                    Email:
                                </div>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <div className={"flex w-1/5 px-2 bg-month text-month-foreground"}>
                                    Password:
                                </div>
                                <Input
                                    type={"password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={"flex"}>
                            Don't have an account yet?
                            <div className={"flex flex-1 justify-center"}>
                                <Button
                                    className={"flex py-1 px-10 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/80"}
                                >
                                    Register
                                </Button>
                            </div>
                        </div>

                        <div className={"flex justify-center"}>
                            <Button
                                className={"flex py-5 text-2xl font-medium font-heading w-1/2"}
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    )
}