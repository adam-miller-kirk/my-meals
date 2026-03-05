import Calendar from "@/components/Calendar";
import { CalendarMode } from "@/components/Calendar/types";

export default function PlanningPage() {
    return (
        <>
            <h1 className="text-xl font-bold">Week Planner</h1>
            <Calendar mode={CalendarMode.WEEK} />
        </>
    );
}
