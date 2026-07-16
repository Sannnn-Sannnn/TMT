import { Card } from "@/components/ui/card.tsx";
import {useEffect, useRef, useState} from "react";
import { Button } from "@/components/ui/button.tsx";
import Timer from "@/components/dashboard/timer/Timer.tsx";
import TimerInputField from "@/components/dashboard/timer/TimerInputField.tsx";

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

    const alarmSource = "/sounds/alarm.mp3"
    const alarmRef = useRef<HTMLAudioElement | null>(null);
    if (alarmRef.current === null) {
        alarmRef.current = new Audio(alarmSource)
    }

    function stopAlarm() {
        const alarm = alarmRef.current;
        if (!alarm) return;
        alarm.pause();
        alarm.currentTime = 0;
    }

    function playAlarm() {
        const alarm = alarmRef.current;
        if (!alarm) return;
        alarm.currentTime = 0;
        alarm.play().catch(() => {
            alarm.loop = true
        });
    }

    useEffect(() => {
        return () => stopAlarm();
    }, []);


    function handleComplete() {
        playAlarm()

        if (currentStatus === "Interval") {
            if (currentInterval >= totalIntervals) {
                setCurrentInterval(1);
                setIsRunning(false);
                setCurrentStatus("Interval");
                setSessionId(id => id + 1);
                setHasStarted(false);
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
        stopAlarm();
        setIsRunning((r) => !r);
        setHasStarted(true);
    }

    function handleReset() {
        stopAlarm();
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
                        <div className="flex items-center justify-center aspect-square h-6 border-3 border-accent"
                             onClick={() => setAutoStart(false)}>
                            <div className="flex flex-1 aspect-square bg-accent border-3 border-card"/>
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
                    className={"h-15 flex flex-1 p-4 text-2xl font-medium font-heading"}
                    onClick={handleStartStop}
                >
                    {isRunning ? "Pause" : hasStarted ? "Continue" : "Start"}
                </Button>
                <Button
                    className={"h-15 p-4 text-2xl font-medium font-heading bg-accent hover:bg-accent/80 text-accent-foreground"}
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>
        </Card>
    );
}