import { useEffect, useRef, useState } from "react";

interface TimerProps {
    intervalLength: number;
    breakLength: number;
    totalIntervals: number;
    currentInterval: number;
    currentStatus: "Interval" | "Break";
    isRunning: boolean;
    onComplete: () => void;
}

const RADIUS = 90;
const STROKE_WIDTH = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function Timer({
                                  intervalLength,
                                  breakLength,
                                  totalIntervals,
                                  currentInterval,
                                  currentStatus,
                                  isRunning,
                                  onComplete,
                              }: TimerProps) {
    const duration = (currentStatus === "Interval" ? intervalLength : breakLength) * 60;
    const [secondsLeft, setSecondsLeft] = useState(duration);

    // keep the latest onComplete without re-subscribing the interval every render
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    // reset the local countdown whenever the phase/interval/duration changes
    useEffect(() => {
        setSecondsLeft(duration);
    }, [duration, currentStatus, currentInterval]);

    // the actual ticking, isolated here so only this component re-renders each second
    useEffect(() => {
        if (!isRunning) return;

        const id = setInterval(() => {
            setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
        }, 1000);

        return () => clearInterval(id);
    }, [isRunning]);

    useEffect(() => {
        if (isRunning && secondsLeft === 0) {
            onCompleteRef.current()
        }
    }, [secondsLeft, isRunning])

    const filled = duration > 0 ? secondsLeft / duration : 0;
    const dashOffset = CIRCUMFERENCE * filled;

    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="relative flex items-center justify-center aspect-square w-2/3">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                    <circle
                        cx="100"
                        cy="100"
                        r={RADIUS}
                        strokeWidth={STROKE_WIDTH}
                        className="fill-none stroke-primary"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r={RADIUS}
                        strokeWidth={STROKE_WIDTH}
                        strokeLinecap="butt"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={dashOffset}
                        className={`fill-none stroke-accent transition-[stroke-dashoffset] duration-1000 ease-linear`}
                    />
                </svg>

                <div className="absolute flex items-center justify-center aspect-square w-7/8 rounded-full bg-card">
                    <p className="text-4xl font-heading font-medium tabular-nums">
                        {formatTime(secondsLeft)}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <p className={"text-xl font-heading font-medium"}>
                    {currentInterval} / {totalIntervals}
                </p>
                <p className={"text-xl"}>
                    {currentStatus}
                </p>
            </div>
        </div>
    );
}