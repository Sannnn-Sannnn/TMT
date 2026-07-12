import {Input} from "@/components/ui/input.tsx";

interface TimerInputFieldProps {
    label: string;
    value: number;
    isRunning: boolean;
    onChange: (value: number) => void;
}

export default function TimerInputField({label, value, isRunning, onChange}: TimerInputFieldProps) {
    return (
        <div className={"flex flex-col"}>
            {label}
            <Input
                type={"number"}
                value={value}
                disabled={isRunning}
                onChange={(e) => onChange(Number(e.target.value))}
                min={1}
            />
        </div>
    )
}