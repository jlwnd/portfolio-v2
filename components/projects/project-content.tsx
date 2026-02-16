import { Project } from "@/types";
import { PortableText } from "@portabletext/react";
import { useTranslations } from "next-intl";

export const ProjectContent = ({ project }: { project: Project }) => {
  const t = useTranslations("projectDetail");

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {project.content && project.content.length > 0 ? (
        <PortableText value={project.content} />
      ) : (
        <>
          <h2>{t("overview")}</h2>
          <p>{project.description}</p>

          {project.features && (
            <>
              <h2>{t("features")}</h2>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </>
          )}

          {project.technicalDetails && (
            <>
              <h2>{t("technicalDetails")}</h2>
              <p>{project.technicalDetails}</p>
            </>
          )}

          {project.challenges && (
            <>
              <h2>{t("challenges")}</h2>
              <p>{project.challenges}</p>
            </>
          )}

          {project.outcome && (
            <>
              <h2>{t("outcome")}</h2>
              <p>{project.outcome}</p>
            </>
          )}
        </>
      )}
    </div>
  );
};
