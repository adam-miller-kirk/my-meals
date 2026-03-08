import Planner from "@/features/planning/components/planner";
import { CalendarMode } from "@/components/Calendar/types";

export default function HomePage() {
    return (
        <>
            <Planner mode={CalendarMode.DAY} controls={false} />
        </>
    );
}
