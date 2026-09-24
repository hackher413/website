/**
 * FAQ content, grouped by category. Answers are plain strings; the accordion
 * renders them as paragraphs. Keep answers warm, concrete, and short.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  name: string;
  items: FaqItem[];
};

export const faqIntro = {
  eyebrow: "FAQ",
  title: "Questions? We've got answers.",
  lead: "Practical details before you apply or show up. Still stuck? Email us - we're happy to help.",
};

export const faq: FaqCategory[] = [
  {
    name: "The basics",
    items: [
      {
        question: "What is a hackathon?",
        answer:
          "A hackathon is an invention marathon. Students come together to build cool software and hardware creations over 24 hours - with mentors, workshops, food, and prizes along the way.",
      },
      {
        question: "Do I need to be a student to attend?",
        answer:
          "Yes. Hack(H)er413 is open to students currently enrolled in a college or university, as well as those who graduated within the last 12 months.",
      },
      {
        question:
          "I don't identify as a woman or non-binary student. Can I still participate?",
        answer:
          "Absolutely. While our mission centers women and non-binary students, everyone is encouraged to apply - allies are always welcome.",
      },
      {
        question: "Do I need experience to attend?",
        answer:
          "Not at all. A huge share of our hackers are first-timers - 88 attendees came to their very first hackathon last year. Beginner-friendly workshops and mentors are here to help you learn as you go.",
      },
    ],
  },
  {
    name: "Logistics",
    items: [
      {
        question: "Do I have to pay to attend?",
        answer:
          "Nope. Attending Hack(H)er413 is completely free, including meals and swag, thanks to our sponsors.",
      },
      {
        question: "Are travel reimbursements offered?",
        answer:
          "There are no travel reimbursements offered this year.",
      },
      {
        question: "What should I bring?",
        answer:
          "Your laptop and charger, a student ID, and any toiletries or comfort items if you plan to stay overnight. We'll provide food, wifi, and plenty of caffeine.",
      },
    ],
  },
  {
    name: "During the event",
    items: [
      {
        question: "What can I build?",
        answer:
          "Anything you can dream up - web apps, mobile apps, hardware, games, AI projects, and more. Your project just needs to be built primarily during the event.",
      },
      {
        question: "Are there prizes?",
        answer:
          "Yes. We award prizes across several categories - including Best Software, Hardware, AI, DEI, and Beginner hacks - plus sponsor challenges. But the biggest win is what you learn and the people you meet.",
      },
      {
        question: "Is there a code of conduct?",
        answer:
          "Yes. Everyone agrees to the MLH Code of Conduct, which we strictly enforce to keep the event safe, inclusive, and welcoming for all.",
      },
    ],
  },
];
