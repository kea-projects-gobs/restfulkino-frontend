type ScheduleType = {
  id: number;
  date: Date;
  startTime: string;
};

type CinemaType = {
  id: number;
  name: string;
  city: string;
  street: string;
  description: string;
  phone: string;
  email: string;
  imageUrl: string;
};

export type { ScheduleType, CinemaType };
