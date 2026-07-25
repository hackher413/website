/**
 * Schedule content. Grouped by day; each day holds an ordered list of events.
 * `kind` drives the accent color of the timeline marker. Times are plain
 * strings (display-only) to keep the model simple and CMS-friendly.
 */

export type EventKind = "ceremony" | "workshop" | "meal" | "activity" | "milestone";

export type ScheduleEvent = {
  time: string;
  title: string;
  description?: string;
  location?: string;
  kind: EventKind;
};

export type ScheduleDay = {
  label: string;
  date: string;
  events: ScheduleEvent[];
};

export const scheduleNote =
  "Schedule is tentative and subject to change. Times are shown in Eastern Time.";

export const schedule: ScheduleDay[] = [
  {
    label: "Day 1",
    date: "Saturday",
    events: [
      {
        time: "9:00 AM",
        title: "Check-in & breakfast",
        description: "Grab your badge, swag, and a bite. Find a comfy spot.",
        location: "Main Hall",
        kind: "meal",
      },
      {
        time: "10:30 AM",
        title: "Opening ceremony",
        description: "Welcome, mission, sponsors, and how the weekend works.",
        location: "Auditorium",
        kind: "ceremony",
      },
      {
        time: "11:30 AM",
        title: "Team formation & hacking begins",
        description: "Meet teammates, pick an idea, and start building.",
        kind: "milestone",
      },
      {
        time: "1:00 PM",
        title: "Lunch",
        location: "Main Hall",
        kind: "meal",
      },
      {
        time: "2:30 PM",
        title: "Intro to web development",
        description: "A beginner-friendly workshop to ship your first page.",
        location: "Workshop Room A",
        kind: "workshop",
      },
      {
        time: "4:00 PM",
        title: "Building with AI APIs",
        description: "Add intelligence to your project in an afternoon.",
        location: "Workshop Room B",
        kind: "workshop",
      },
      {
        time: "7:00 PM",
        title: "Dinner & mentor mixer",
        location: "Main Hall",
        kind: "meal",
      },
      {
        time: "9:00 PM",
        title: "Late-night game break",
        description: "Step away from the keyboard and recharge.",
        kind: "activity",
      },
    ],
  },
  {
    label: "Day 2",
    date: "Sunday",
    events: [
      {
        time: "8:00 AM",
        title: "Breakfast",
        location: "Main Hall",
        kind: "meal",
      },
      {
        time: "11:00 AM",
        title: "Submissions due",
        description: "Push your code and submit your project on Devpost.",
        kind: "milestone",
      },
      {
        time: "12:00 PM",
        title: "Project expo & judging",
        description: "Demo your build to judges and fellow hackers.",
        location: "Main Hall",
        kind: "activity",
      },
      {
        time: "2:00 PM",
        title: "Closing ceremony & awards",
        description: "Celebrate the weekend and crown the winners.",
        location: "Auditorium",
        kind: "ceremony",
      },
    ],
  },
];
