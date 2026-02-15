import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Timer,
  AlertCircle,
} from "lucide-react";
import { Project } from "@/types";
import { useTranslations } from "next-intl";

export const ProjectHeader = ({ project }: { project: Project }) => {
  const t = useTranslations("projects");

  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
        {project.name}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {t("status")}
          </span>
          <Badge
            variant={
              project.status === "COMPLETED"
                ? "default"
                : project.status === "IN_PROGRESS"
                ? "secondary"
                : "outline"
            }
            className={
              project.status === "COMPLETED"
                ? "bg-green-500/15 text-green-600 hover:bg-green-500/25 border-green-500/20 dark:text-green-400 pl-2 pr-2.5 py-0.5"
                : project.status === "IN_PROGRESS"
                ? "bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-amber-500/20 dark:text-amber-400 pl-2 pr-2.5 py-0.5"
                : "pl-2 pr-2.5 py-0.5"
            }
          >
            {project.status === "COMPLETED" ? (
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            ) : project.status === "IN_PROGRESS" ? (
              <Timer className="w-3.5 h-3.5 mr-1.5" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
            )}
            {project.status === "COMPLETED"
              ? t("completed")
              : project.status === "IN_PROGRESS"
              ? t("inProgress")
              : project.status}
          </Badge>
        </div>
      </div>

      <p className="text-lg text-muted-foreground max-w-3xl mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech: string) => (
          <Badge
            key={tech}
            variant="outline"
            className="capitalize border-primary/20 bg-primary/5 text-primary"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
};
