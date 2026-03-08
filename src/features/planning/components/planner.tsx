"use client";

import { useCallback, useState } from "react";
import Calendar from "@/components/Calendar";
import { PlannerDayWithRelations, PlannerProps } from "../model/types";
import { getPlannerDay, getPlannerWeek } from "../actions/getPlannerDay";
import { CalendarMode } from "@/components/Calendar/types";
import PlanEntry from "./planEntry";
import { dayKey } from "../model/utils";

export default function Planner({ mode, controls }: PlannerProps) {
    const [weekDates, setWeekDates] = useState<Date[]>([]);
    const [entries, setEntries] = useState<Record<string, PlannerDayWithRelations[]>>({});
    const [loading, setLoading] = useState(true);

const handleRangeChange = useCallback(
    async (dates: Date[]) => {
        console.log("Planner - date changed");

        // Prevent re-fetch if the range hasn't actually changed
        if (weekDates[0]?.getTime() === dates[0].getTime()) return;

        setWeekDates(dates);

        if (mode === CalendarMode.DAY) {
            const day = await getPlannerDay(dates[0]);
            if (day) {
                setEntries((prev) => ({
                    ...prev,
                    [dayKey(dates[0])]: [day],
                }));
            }
        }

        if (mode === CalendarMode.WEEK) {
            const week = await getPlannerWeek(dates[0]);

            if (week?.plannerDays) {
                setEntries((prev) => {
                    const newEntries = { ...prev };

                    week.plannerDays.forEach((day) => {
                        const key = dayKey(day.date);

                        newEntries[key] = [
                            {
                                ...day,
                                plannerWeek: {
                                    id: week.id,
                                    startDate: week.startDate,
                                    yearId: week.yearId,
                                    plannerYear: week.plannerYear,
                                },
                            },
                        ];
                    });

                    return newEntries;
                });
            }
        }

        setLoading(false);
    },
    // Only depend on length so the callback doesn't recreate when the date array identity changes.
    // Length is sufficient to detect initial population.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [weekDates.length],
);

    const handleCreateDay = async (date: Date) => {
        setLoading(true);
        try {
            // TODO need to add redirect to plan create form
        } finally {
            setLoading(false);
        }
    };

    return (
        <Calendar
            mode={mode}
            controls={controls}
            onRangeChange={handleRangeChange}
            renderDay={(date) => (
                <PlanEntry
                    date={date}
                    day={entries[dayKey(date)]?.[0]}
                    loading={loading}
                    onCreate={handleCreateDay}
                />
            )}
        />
    );
}
