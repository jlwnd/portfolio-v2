import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types";
import { useTranslations } from "next-intl";

export const ProjectDetails = ({ project }: { project: Project }) => {
  const t = useTranslations("projectDetail");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("details")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            {t("projectType")}
          </h3>
          <p>{project.type}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            {t("timeline")}
          </h3>
          <p>{project.timeline}</p>
        </div>
      </CardContent>
    </Card>
  );
};
