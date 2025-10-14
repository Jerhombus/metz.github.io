import type {ReactNode} from "react";

const baseClasses =
  "rounded-lg border border-ember/40 bg-ink/70 p-4 text-sm text-mist";

type StorefrontCredentialNoticeProps = {
  message: string;
  title?: string;
  className?: string;
  actions?: ReactNode;
};

export default function StorefrontCredentialNotice({
  message,
  title = "Storefront credentials missing",
  className = "",
  actions,
}: StorefrontCredentialNoticeProps) {
  return (
    <section
      role="alert"
      aria-live="polite"
      className={`${baseClasses} ${className}`.trim()}
    >
      <h2 className="font-semibold text-ember">{title}</h2>
      <p className="mt-1 text-mist/80">{message}</p>
      {actions ? <div className="mt-3 flex flex-wrap gap-2">{actions}</div> : null}
    </section>
  );
}
