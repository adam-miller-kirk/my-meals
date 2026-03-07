export enum CalendarMode {
    DAY = "day",
    WEEK = "week",
    MONTH = "month",
}

export type CalendarProps = {
    mode?: CalendarMode;
    controls?: boolean;
    renderDay?: (date: Date) => React.ReactNode;
    onRangeChange?: (dates: Date[]) => void;
};
