export const dayKey = (date: Date) => {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    return day.toISOString().slice(0, 10);
};

export const startOfDay = (date: Date) => {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    return day;
};

export const endOfDay = (date: Date) => {
    const day = new Date(date);
    day.setHours(23, 59, 59, 999);
    return day;
};

export const startOfWeek = (date: Date) => {
    const day = new Date(date);
    const currentDay = day.getDay(); // 0 = Sunday
    const diff = (currentDay === 0 ? -6 : 1) - currentDay; // Monday start
    day.setDate(day.getDate() + diff);
    day.setHours(0, 0, 0, 0);
    return day;
};