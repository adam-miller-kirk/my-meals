"use client";

import { useState } from "react";
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
    onDayClick,
}: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    let days: Date[];
    let textTitle: string = "";
    let cellWidth: string = "w-full";

    switch (mode) {
        case CalendarMode.DAY:
            days = [currentDate];
            textTitle = `${format(days[0], "MMM")} - ${format(days[0], "yyyy")}`;
            break;

        case CalendarMode.MONTH:
            const start = startOfMonth(currentDate);
            const totalDays = getDaysInMonth(currentDate);
            days = Array.from({ length: totalDays }).map((_, i) => addDays(start, i));
            textTitle = `${format(days[0], "MMM")} - ${format(days[0], "yyyy")}`;
            cellWidth = "w-1/7";
            console.log(start, totalDays);
            break;

        default:
            const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
            days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
            textTitle = `${format(days[0], "MMM")} - ${format(days[0], "yyyy")}`;
            break;
    }

    const changeDate = (amount: number) => {
        setCurrentDate((prev) => {
            let changedBy: number = 7;

            if (mode === CalendarMode.DAY) {
                changedBy = 1;
            }
            if (mode === CalendarMode.MONTH) {
                changedBy = getDaysInMonth(currentDate);
            }

            return addDays(prev, amount * changedBy);
        });
    };

    return (
        <>
            {/* Calendar Controls */}
            {controls && (
                <div className="flex justify-between">
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
