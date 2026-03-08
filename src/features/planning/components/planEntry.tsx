"use client";

import Button from "@/components/Button";
import { PlanEntryProps } from "../model/types";

export default function PlanEntry({ day, date, loading, onCreate }: PlanEntryProps) {
    if (loading) return <p>Loading…</p>;

    return (
        <div>
            {!day ? (
                <Button onClick={() => onCreate?.(date)}>Create Plan</Button>
            ) : (
                <>
                    <p>{day.recipe?.name || day.type}</p>
                    <p>{day.notes}</p>
                </>
            )}
        </div>
    );
}
