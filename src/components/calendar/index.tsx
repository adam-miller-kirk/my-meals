"use client";

import { useState } from "react";
import { startOfWeek, addDays, format } from "date-fns";

export default function Calendar() {
    const [currentWeek, setCurrentWeek] = useState<Date>(new Date());

    const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const week = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

    const goToPreviousWeek = () => {
        setCurrentWeek((prev: Date) => addDays(prev, -7));
    };

    const goToNextWeek = () => {
        setCurrentWeek((prev: Date) => addDays(prev, 7));
    };

    return (
        <>
            <h1 className="text-right">{format(week[0], "yyyy")}</h1>
            <br />
            <div className="flex justify-between">
                <button
                    className="bg-blue-200 p-2 rounded cursor-pointer"
                    onClick={goToPreviousWeek}
                >
                    {"<"}
                </button>
                <p>{format(week[0], "MMM")}</p>
                <button className="bg-blue-200 p-2 rounded cursor-pointer" onClick={goToNextWeek}>
                    {">"}
                </button>
            </div>
            <br />
            <div className="flex">
                {week.map((date) => (
                    <div key={date.toISOString()} className="w-[10rem]">
                        <h3 className=" border text-center">{`${format(
                            date,
                            "EEEE",
                        )} ${format(date, "dd")}`}</h3>
                        <p className="px-2 border h-[30rem]">Content</p>
                    </div>
                ))}
            </div>
        </>
    );
}
