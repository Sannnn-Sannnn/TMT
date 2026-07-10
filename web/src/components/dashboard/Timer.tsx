import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Timer () {
    //const [sessionNumber, setSessionNumber] = useState(0);
    const [sessionLength, setSessionLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [totalSessions, setTotalSessions] = useState(3);

    return (
        <Card className={"flex flex-col w-1/4 p-5 gap-y-15 border"}>

            { /* Timer */}
            <div className={"flex items-center justify-center"}>
                <div className={"flex items-center justify-center aspect-square w-2/3 rounded-full bg-primary"}>
                    <div className={"aspect-square w-2/3 rounded-full bg-accent"}>
                    </div>
                </div>
            </div>

            { /* Configuration */}
            <div className={"flex flex-col gap-y-10 text-2xl"}>

                <div>
                    Session Duration
                    <Input
                        type={"number"}
                        value={sessionLength}
                        onChange={(e) => setSessionLength(Number(e.target.value))}
                        className={"text-2xl"}
                    />
                </div>

                <div>
                    Break Duration
                    <Input
                        type={"number"}
                        value={breakLength}
                        onChange={(e) => setBreakLength(Number(e.target.value))}
                    />
                </div>

                <div>
                    Sessions
                    <Input
                        type={"number"}
                        value={totalSessions}
                        onChange={(e) => setTotalSessions(Number(e.target.value))}
                    />
                </div>
            </div>

            <Button className={"p-6 text-3xl font-medium font-heading"}>
                Start!
            </Button>
        </Card>
    )
}