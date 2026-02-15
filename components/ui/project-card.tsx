import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export const ProjectCard = ({ project }: { project: Project }) => {
  const t = useTranslations("projects");
  return (
    <Card className="overflow-hidden group border-primary/10 transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 flex flex-col h-full">
      <div className="aspect-video relative overflow-hidden bg-secondary">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent relative">
          {project.images && project.images.length > 0 ? (
            <Image
              src={project.images[0]}
              alt={project.name}
              className="aspect-video relative overflow-hidden bg-secondary object-cover"
              fill
            />
          ) : (
            <div className="text-muted-foreground">{t("noImage")}</div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <p className="text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech: string) => (
            <Badge
              key={tech}
              variant="outline"
              className="capitalize border-primary/20 bg-primary/5 text-primary"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 text-primary-foreground"
            >
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 mt-auto">
        <Link href={`/projects/${project.slug}`} className="w-full">
          <div className="flex items-center justify-center w-full py-2 text-sm font-medium transition-colors rounded-md bg-secondary hover:bg-secondary/80 group-hover:bg-primary group-hover:text-primary-foreground">
            {t("viewDetails")}
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};
