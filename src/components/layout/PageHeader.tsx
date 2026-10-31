type PageHeaderProps = {
  title: string;
  intro?: string;
  /** The page's one primary action, shown under the intro */
  action?: React.ReactNode;
};

export function PageHeader({ title, intro, action }: PageHeaderProps) {
  return (
    <header data-reveal-group className="px-4 pb-16 pt-36 md:px-8 md:pb-24 md:pt-52">
      <h1 data-reveal className="display text-head text-ivory">
        {title}
      </h1>
      {intro && (
        <p data-reveal className="mt-8 max-w-[44ch] text-lead text-ivory">
          {intro}
        </p>
      )}
      {action && (
        <div data-reveal className="mt-10">
          {action}
        </div>
      )}
    </header>
  );
}
