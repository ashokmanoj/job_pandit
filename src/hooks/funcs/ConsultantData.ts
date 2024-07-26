interface JobData {
    id: number;
    name: string;
    created_at: string;
    user_id: string;
    company_id: number;
  }
  
  interface ApplicationData {
    id: number;
    status: string;
    created_at: string;
    candidate_id: string;
    jobpost_id: number;
  }
  
  interface WeeklyData {
    name: string;
    postedJobs: number;
    applications: number;
  }
  
  export default function processWeeklyData(
    postedJobs: JobData[],
    applications: ApplicationData[]
  ): WeeklyData[] {
    const weekData: Record<string, { postedJobs: number; applications: number }> = {};
  
    postedJobs.forEach((item) => {
      const date = new Date(item.created_at);
      const week = getYearWeek(date);
  
      if (!weekData[week]) {
        weekData[week] = { postedJobs: 0, applications: 0 };
      }
      weekData[week].postedJobs++;
    });
  
    applications.forEach((item) => {
      const date = new Date(item.created_at);
      const week = getYearWeek(date);
  
      if (!weekData[week]) {
        weekData[week] = { postedJobs: 0, applications: 0 };
      }
      weekData[week].applications++;
    });
  
    const result: WeeklyData[] = Object.keys(weekData).map((week, index) => ({
      name: `Week ${index + 1}`,
      postedJobs: weekData[week].postedJobs,
      applications: weekData[week].applications,
    }));
  
    return result;
  }
  
  function getYearWeek(date: Date): string {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
    return `${date.getFullYear()}-W${weekNumber}`;
  }
  