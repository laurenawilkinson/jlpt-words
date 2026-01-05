import { useEffect, useState } from 'preact/hooks';

const getDateKey = () => new Date().toISOString().slice(0, 10);

export const useDailyDateKey = (): string => {
  const [dateKey, setDateKey] = useState(getDateKey());

  useEffect(() => {
    let timeoutId: number;

    const scheduleNext = () => {
      setDateKey(getDateKey());

      const now = new Date();
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );

      const msUntilMidnight = nextMidnight.getTime() - now.getTime() + 100;

      timeoutId = setTimeout(scheduleNext, msUntilMidnight);
    };

    scheduleNext();

    return () => clearTimeout(timeoutId);
  }, []);

  return dateKey;
};
