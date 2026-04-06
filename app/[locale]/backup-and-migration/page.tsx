import { backupCategoryIds, migrationRecipeIds } from "@/content/product-details";
import { createPageMetadata } from "@/lib/metadata";
import { getNamespace, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "backup-and-migration");
  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/backup-and-migration",
    locale: locale as Locale,
  });
}

export default async function BackupAndMigrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "backup-and-migration");

  return (
    <div className="space-y-10 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">{t.hero.title}</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          {t.hero.description}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">{t.categoriesTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {backupCategoryIds.map((categoryId) => {
            const category = t.categories.find((item) => item.id === categoryId);
            if (!category) return null;

            return (
              <article key={category.name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="font-semibold text-slate-900">{category.name}</p>
                <p className="mt-1 text-sm text-slate-600">{category.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">{t.recipesTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {migrationRecipeIds.map((recipeId) => {
            const recipe = t.recipes.find((item) => item.id === recipeId);
            if (!recipe) return null;

            return (
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
            );
          })}
        </div>
      </section>
    </div>
  );
}
