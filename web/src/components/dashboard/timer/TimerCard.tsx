import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Timer from "@/components/dashboard/Timer.tsx";
import TimerInputField from "@/components/dashboard/TimerInputField.tsx";

export default function TimerCard() {
    const [intervalLength, setIntervalLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [totalIntervals, setTotalIntervals] = useState(3);

    const [currentInterval, setCurrentInterval] = useState(1);
    const [currentStatus, setCurrentStatus] = useState<"Interval" | "Break">("Interval");
    const [isRunning, setIsRunning] = useState(false);

    const [sessionId, setSessionId] = useState(0);
    const [autoStart, setAutoStart] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);

    function handleComplete() {
        const alarm = new Audio("/alarm.mp3");
        alarm.play().catch(() => {
            // playback can be blocked until the user interacts with the page;
            // fail silently rather than throwing
        });

        if (currentStatus === "Interval") {
            if (currentInterval >= totalIntervals) {
                setIsRunning(false);
                return;
            }
            setCurrentStatus("Break");
        } else {
            setCurrentInterval((i) => i + 1);
            setCurrentStatus("Interval");
        }

        if (!autoStart) {
            setIsRunning(false);
        }
    }

    function handleStartStop() {
        setIsRunning((r) => !r);
        setHasStarted(true);
    }

    function handleReset() {
        setIsRunning(false);
        setCurrentInterval(1);
        setCurrentStatus("Interval");
        setSessionId((id) => id + 1);
        setHasStarted(false);
    }

    if (false) {
        return (
            <Card className={"flex flex-col w-1/4 p-5 border"}>

            </Card>
        )
    }

    return (
        <Card className={"flex flex-col w-1/4 p-5 border"}>

            { /* Timer */}
            <div className={"flex items-center justify-center"}>
                <Timer
                    key={sessionId}
                    intervalLength={intervalLength}
                    breakLength={breakLength}
                    totalIntervals={totalIntervals}
                    currentInterval={currentInterval}
                    currentStatus={currentStatus}
                    isRunning={isRunning}
                    onComplete={handleComplete}
                />
            </div>

            { /* Configuration */}
            <div className="flex flex-col gap-y-3 px-6 text-lg">
                <TimerInputField
                    label={"Interval duration (min):"}
                    value={intervalLength}
                    isRunning={isRunning}
                    onChange={setIntervalLength}
                />

                <TimerInputField
                    label={"Break Duration (min):"}
                    value={breakLength}
                    isRunning={isRunning}
                    onChange={setBreakLength}
                />

                <TimerInputField
                    label={"Intervals:"}
                    value={totalIntervals}
                    isRunning={isRunning}
                    onChange={setTotalIntervals}
                />

                <div className={"flex items-center gap-x-2"}>
                    {autoStart ? (
                        <div className="flex items-center justify-center aspect-square h-6 border-3 border-primary"
                             onClick={() => setAutoStart(false)}>
                            <div className="flex flex-1 aspect-square bg-primary border-3 border-card"/>
                        </div>
                    ) : (
                        <div className="aspect-square h-6 border-3 border-border" onClick={() => setAutoStart(true)}/>
                    )}
                    Auto-Start {autoStart ? "ON" : "OFF"}
                </div>
            </div>

            { /* Info */}
            <div className="flex flex-col px-6">
                <div className={"flex justify-between bg-muted p-2 font-body text-xl"}>
                    <p>Total time:</p>
                    {intervalLength * totalIntervals + breakLength * (totalIntervals - 1)} min
                </div>
            </div>

            <div className={"flex items-end w-full h-full px-6 gap-x-3"}>
                <Button
                    className={"flex flex-1 h-1/2 p-4 text-2xl font-medium font-heading"}
                    onClick={handleStartStop}
                >
                    {isRunning ? "Pause" : hasStarted ? "Continue" : "Start"}
                </Button>
                <Button
                    className={"h-1/2 p-5 text-2xl font-medium font-heading bg-secondary text-secondary-foreground"}
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>
        </Card>
    );
}