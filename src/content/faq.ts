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
  lead: "Everything you need to know before you apply. Still stuck? Reach out — we're happy to help.",
};

export const faq: FaqCategory[] = [
  {
    name: "The basics",
    items: [
      {
        question: "Who can participate?",
        answer:
          "Hack(H)er413 is designed for women and gender minorities, and is open to all college students who support our mission. You don't need to be a computer science major — all disciplines are welcome.",
      },
      {
        question: "Do I need experience to attend?",
        answer:
          "Not at all. A huge share of our hackers are first-timers. We run beginner tracks, starter kits, and mentor support specifically so you can learn as you go.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Nothing. Hack(H)er413 is completely free to attend, including meals and swag, thanks to our sponsors.",
      },
    ],
  },
  {
    name: "Logistics",
    items: [
      {
        question: "What should I bring?",
        answer:
          "Your laptop and charger, a student ID, and any toiletries if you plan to stay overnight. We'll provide food, wifi, and plenty of caffeine.",
      },
      {
        question: "Can I come with a team?",
        answer:
          "Yes — bring a team of up to four, or come solo and form one at the event during team formation. We'll help you find teammates.",
      },
      {
        question: "Is travel reimbursed?",
        answer:
          "We offer limited travel reimbursement for eligible attendees. Details are shared with accepted applicants closer to the event.",
      },
    ],
  },
  {
    name: "During the event",
    items: [
      {
        question: "What can I build?",
        answer:
          "Anything you can dream up — web apps, mobile apps, hardware, games, AI projects, and more. Your project just needs to be built primarily during the event.",
      },
      {
        question: "Are there prizes?",
        answer:
          "Yes. We award prizes across several categories, plus sponsor challenges. But the biggest win is what you learn and the people you meet.",
      },
      {
        question: "Is there a code of conduct?",
        answer:
          "Absolutely. Everyone agrees to our code of conduct, which we enforce to keep the event safe, inclusive, and welcoming for all.",
      },
    ],
  },
];
