
export type ChartPoint = {
  date: string;
  spend: number;
};

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function fillMissingDays(
  data: ChartPoint[],
  start: Date,
  end: Date
): ChartPoint[] {
  const map = new Map<string, number>();

  // Put existing data in a map
  for (const d of data) {
    map.set(d.date, d.spend);
  }

  const result: ChartPoint[] = [];
  const current = new Date(start);

  while (current <= end) {
    const key = formatDate(current);

    result.push({
      date: key,
      spend: map.get(key) ?? 0,
    });

    current.setDate(current.getDate() + 1);
  }

  return result;
}

