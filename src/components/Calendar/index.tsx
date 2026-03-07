"use client";

import { useState, useEffect, useMemo } from "react";
import { getDaysInMonth, startOfMonth, startOfWeek, addDays, format } from "date-fns";
import { CalendarMode, CalendarProps } from "./types";
import Button from "../Button";

const formatCalendarCellText = (date: Date, mode: CalendarMode) => {
    let cellFormat = `${format(date, "EEEE")} ${format(date, "dd")}`;

    if (mode === CalendarMode.MONTH) cellFormat = `${format(date, "dd")}`;

    return cellFormat;
};

export default function Calendar({
    mode = CalendarMode.WEEK,
    controls = true,
    renderDay,
    onRangeChange,
}: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const days = useMemo(() => {
        switch (mode) {
            case CalendarMode.DAY:
                return [currentDate];

            case CalendarMode.MONTH: {
                const start = startOfMonth(currentDate);
                const totalDays = getDaysInMonth(currentDate);
                return Array.from({ length: totalDays }, (_, i) => addDays(start, i));
            }

            default: {
                const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
                return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
            }
        }
    }, [currentDate, mode]);

    const changeDate = (amount: number) => {
        console.log("Calendar - change date");
        setCurrentDate((prev) => {
            let changedBy: number = 7;

            if (mode === CalendarMode.DAY) {
                changedBy = 1;
            }
            if (mode === CalendarMode.MONTH) {
                changedBy = getDaysInMonth(prev);
            }

            return addDays(prev, amount * changedBy);
        });
    };

    useEffect(() => {
        onRangeChange?.(days);
        // `onRangeChange` intentionally omitted: this effect represents a range change event.
        // Re-running when the callback identity changes would cause unnecessary executions.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);
    
    const textTitle = `${format(days[0], "MMM")} - ${format(days[0], "yyyy")}`;
    const cellWidth = mode === CalendarMode.MONTH ? "w-1/7" : "w-full";

    return (
        <>
            {/* Calendar Controls */}
            {controls && (
                <div className="flex justify-between align-items">
                    <Button onClick={() => changeDate(-1)}>{"<"}</Button>
                    <p>{textTitle}</p>
                    <Button onClick={() => changeDate(1)}>{">"}</Button>
                </div>
            )}

            {/* Calendar Body */}
            <div className="flex flex-wrap gap-2 mt-4">
                {days.map((date) => (
                    <div
                        key={date.toISOString()}
                        className={`flex flex-col border p-2 items-center ${cellWidth}`}
                    >
                        <h3>{formatCalendarCellText(date, mode)}</h3>
                        {renderDay?.(date)}
                    </div>
                ))}
            </div>
        </>
    );
}
