interface LikeData {
  id: number;
  created_at: string;
  liker_id: string;
  likedby_id: string;
}

interface ApplicationData {
  id: number;
  status: string;
  created_at: string;
  jobpost_id: number;
  candidate_id: string;
}

interface WeeklyData {
  name: string;
  likes: number;
  applications: number;
  shortlists: number;
}

export default function processWeeklyData(
  likes: LikeData[],
  applications: ApplicationData[]
): WeeklyData[] {
  const weekData: Record<
    string,
    { likes: number; applications: number; shortlists: number }
  > = {};

  likes.forEach((item) => {
    const date = new Date(item.created_at);
    const week = getYearWeek(date);

    if (!weekData[week]) {
      weekData[week] = { likes: 0, applications: 0, shortlists: 0 };
    }
    weekData[week].likes++;
  });

  applications?.forEach((item) => {
    const date = new Date(item.created_at);
    const week = getYearWeek(date);

    if (!weekData[week]) {
      weekData[week] = { likes: 0, applications: 0, shortlists: 0 };
    }
    if (item.status === "Shortlisted") {
      weekData[week].shortlists++;
      weekData[week].applications++;
    } else {
      weekData[week].applications++;
    }
  });

  const result: WeeklyData[] = Object.keys(weekData).map((week, index) => ({
    name: `Week ${index + 1}`,
    likes: weekData[week].likes,
    applications: weekData[week].applications,
    shortlists: weekData[week].shortlists,
  }));

  return result;
}

function getYearWeek(date: Date): string {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor(
    (date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000)
  );
  const weekNumber = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
  return `${date.getFullYear()}-W${weekNumber}`;
}
