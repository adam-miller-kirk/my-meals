import { CalendarMode } from "@/components/Calendar/types";
import Planner from "@/features/planning/components/planner";

export default function PlanningPage() {
    return (
        <>
            <h1 className="text-xl font-bold">Week Planner</h1>
            <Planner mode={CalendarMode.WEEK} />
        </>
    );
}
