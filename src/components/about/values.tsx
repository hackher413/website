import { aboutValues } from "@/content/about";

/**
 * Values as a simple editorial grid - no icon cards.
 */
export function Values() {
  return (
    <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
      {aboutValues.map((value) => {
        const Icon = value.icon;
        return (
          <li key={value.title} className="flex flex-col gap-3">
            <Icon
              className="size-5 text-honey-foreground"
              aria-hidden="true"
              strokeWidth={1.5}
            />
            <h3 className="font-heading text-xl font-semibold">{value.title}</h3>
            <p className="text-muted-foreground text-pretty">
              {value.description}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
