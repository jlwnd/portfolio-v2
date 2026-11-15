import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  technologies?: string[];
  icon?: ReactNode;
}

type Chunk = { kind: "p"; text: string } | { kind: "ul"; items: string[] };

// Splits plain text into paragraphs and bullet lists (lines starting with "- ").
const parseDescription = (description: string): Chunk[] => {
  const chunks: Chunk[] = [];
  for (const raw of description.trim().split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const last = chunks[chunks.length - 1];
    if (line.startsWith("- ")) {
      const item = line.slice(2).trim();
      if (last?.kind === "ul") last.items.push(item);
      else chunks.push({ kind: "ul", items: [item] });
    } else {
      chunks.push({ kind: "p", text: line });
    }
  }
  return chunks;
};

export const TimelineItem = ({
  date,
  title,
  description,
  technologies,
  icon,
}: TimelineItemProps) => {
  return (
    <div className="mb-10 relative">
      <div className="absolute -left-11 mt-1.5 h-8 w-8 rounded-full border-2 border-primary bg-background shadow-sm shadow-primary/20 flex items-center justify-center">
        {icon}
      </div>
      <time className="mb-1 text-sm font-normal leading-none text-primary/80">
        {date}
      </time>
      <h3 className="text-lg font-semibold text-foreground mt-2">{title}</h3>
      <div className="mb-4 space-y-2 text-base font-normal text-muted-foreground">
        {parseDescription(description).map((chunk, i) =>
          chunk.kind === "p" ? (
            <p key={i}>{chunk.text}</p>
          ) : (
            <ul key={i} className="list-disc pl-5 space-y-1.5">
              {chunk.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          ),
        )}
      </div>
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 -mt-1 mb-4">
          {technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-primary/20 bg-primary/5 text-primary"
            >
              {tech}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
