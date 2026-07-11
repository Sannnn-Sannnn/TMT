import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Timer from "@/components/dashboard/Timer.tsx";

export default function TimerCard() {
    const [intervalLength, setIntervalLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [totalIntervals, setTotalIntervals] = useState(3);

    const [currentInterval, setCurrentInterval] = useState(1);
    const [currentStatus, setCurrentStatus] = useState<"Interval" | "Break">("Interval");
    const [isRunning, setIsRunning] = useState(false);

    // Bumped on every reset. Passed to Timer as `key` so React remounts it
    // from scratch instead of relying on its internal effect dependencies
    // to notice "nothing changed, but the clock should still go back to zero".
    const [sessionId, setSessionId] = useState(0);

    const [autoStart, setAutoStart] = useState(false);

    // true once the user has pressed Start at least once in this session;
    // resets on Reset. Used only to pick the button label.
    const [hasStarted, setHasStarted] = useState(false);

    // TimerCard owns the session state machine: what happens when the
    // countdown hits zero. Timer itself only knows how to count down.
    function handleComplete() {
        const alarm = new Audio("/alarm.mp3");
        alarm.play().catch(() => {
            // playback can be blocked until the user interacts with the page;
            // fail silently rather than throwing
        });

        if (currentStatus === "Interval") {
            if (currentInterval >= totalIntervals) {
                // whole session is done — stop regardless of autoStart
                setIsRunning(false);
                return;
            }
            setCurrentStatus("Break");
        } else {
            setCurrentInterval((i) => i + 1);
            setCurrentStatus("Interval");
        }

        // mid-session: only keep going on our own if autoStart is on,
        // otherwise wait for the user to press Continue
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
            <div className="flex flex-col gap-y-7 p-6">

                <div className={"flex flex-col gap-y-3"}>
                    <div className="w-3/5 bg-primary text-primary-foreground p-1 pl-2 ">
                        <div className={"text-2xl font-heading font-medium"}>Interval Duration (min):</div>
                    </div>

                    <Input
                        type={"number"}
                        value={intervalLength}
                        disabled={isRunning}
                        onChange={(e) => setIntervalLength(Number(e.target.value))}
                    />
                </div>

                <div className={"flex flex-col gap-y-3"}>
                    <div className="w-3/5 bg-secondary text-secondary-foreground p-1 pl-2">
                        <div className={"text-2xl font-heading font-medium"}>Break Duration (min):</div>
                    </div>
                    <Input
                        type={"number"}
                        value={breakLength}
                        disabled={isRunning}
                        onChange={(e) => setBreakLength(Number(e.target.value))}
                    />
                </div>

                <div className={"flex flex-col gap-y-3"}>
                    <div className="w-3/5 bg-muted text-accent-foreground p-1 pl-2">
                        <div className={"text-2xl font-heading font-medium"}>Intervals:</div>
                    </div>
                    <Input
                        type={"number"}
                        value={totalIntervals}
                        disabled={isRunning}
                        onChange={(e) => setTotalIntervals(Number(e.target.value))}
                    />
                </div>

                <div className={"text-xl"}>
                    { autoStart ? (
                        <div className={"flex items-center gap-x-3"}>
                            <div className="aspect-square h-6 bg-primary" onClick={() => setAutoStart(false)} />
                            Disable auto-start
                        </div>
                    ) : (
                        <div className={"flex items-center gap-x-3"}>
                            <div className="aspect-square h-6 border-3 border-border" onClick={() => setAutoStart(true)} />
                            Enable auto-start
                        </div>
                    )}
                </div>
            </div>

            { /* Info */}
            <div className="flex flex-col px-6">
                <div className={"flex flex-row justify-between bg-muted p-3 font-body text-xl"}>
                    <p>Total time:</p>
                    {(intervalLength + breakLength) * totalIntervals} mins
                </div>
            </div>

            <div className={"flex flex-1 items-end w-full px-6 gap-x-3"}>
                <Button
                    className={"flex flex-1 h-1/2 p-5 text-2xl font-medium font-heading"}
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