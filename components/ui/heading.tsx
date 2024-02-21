import { useTranslations } from "next-intl";

interface HeadingProps {
  title: string;
  subtitle: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {
  const t = useTranslations();

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{t(title)}</h2>
      <p className="text-sm text-muted-foreground">{t(subtitle)}</p>
    </div>
  );
};
