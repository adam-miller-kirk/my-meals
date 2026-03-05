import Calendar from "@/components/Calendar";
import { CalendarMode } from "@/components/Calendar/types";

export default function HomePage() {
    return (
        <>
            <Calendar mode={CalendarMode.DAY} controls={false} />
        </>
    );
}
