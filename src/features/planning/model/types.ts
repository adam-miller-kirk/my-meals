import { CalendarProps } from "@/components/Calendar/types";
import { PlannerDay, PlannerYear, Recipe } from "@/generated/prisma";

export type PlannerDayWithRelations = PlannerDay & {
    recipe: Recipe | null;
    plannerWeek: { plannerYear: PlannerYear; id: string; startDate: Date; yearId: string };
};

export type PlanEntryProps = {
    day?: PlannerDayWithRelations;
    date: Date;
    loading: boolean;
    onCreate?: (date: Date) => void;
};

export type PlannerProps = Pick<CalendarProps, "mode" | "controls">;
