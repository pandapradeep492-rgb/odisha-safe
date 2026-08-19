/**
 * Consistent page header with an eyebrow label, title, description and
 * optional right-aligned actions.
 */
export default function PageHeader({ eyebrow, title, description, icon: Icon, actions }) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="container-page py-8 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            {eyebrow && (
              <span className="eyebrow mb-2">
                {Icon && <Icon size={14} />}
                {eyebrow}
              </span>
            )}
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
            {description && (
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>
            )}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  );
}
