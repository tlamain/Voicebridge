import { backupCategories, migrationRecipes } from "@/content/product-details";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Backup and Migration",
  description: "Understand VoiceBridge AAC backup categories, restore controls, and migration playbooks.",
  path: "/backup-and-migration",
});

export default function BackupAndMigrationPage() {
  return (
    <div className="space-y-10 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">Backup and Migration</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          VoiceBridge backup workflows are selective and user initiated so teams can move data with control.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">Backup Categories</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {backupCategories.map((category) => (
            <article key={category.name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="font-semibold text-slate-900">{category.name}</p>
              <p className="mt-1 text-sm text-slate-600">{category.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">Migration Recipes</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {migrationRecipes.map((recipe) => (
            <article key={recipe.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{recipe.title}</p>
              <ol className="mt-2 space-y-1 text-sm text-slate-700">
                {recipe.steps.map((step, index) => (
                  <li key={step}>
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
