import dayjs from "dayjs";

export const unixToTime = (unix: number, timezone: number) => {
  return dayjs
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const unixToday = (unix: number, timezone: number) => {
  return dayjs
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("ddd");
};

export const formatPopulationNumber = (num: number) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  } else {
    return num;
  }
};

export const airQualityIndexArray = [
  {
    rating: 10,
    description: "excellent",
  },
  {
    rating: 20,
    description: "good",
  },
  {
    rating: 30,
    description: "satisfactory",
  },
  {
    rating: 40,
    description: "fair",
  },
  {
    rating: 50,
    description: "moderate",
  },
  {
    rating: 60,
    description: "moderate",
  },
  {
    rating: 70,
    description: "poor",
  },
  {
    rating: 80,
    description: "poor",
  },
  {
    rating: 90,
    description: "very poor",
  },
  {
    rating: 100,
    description: "very poor",
  },
];