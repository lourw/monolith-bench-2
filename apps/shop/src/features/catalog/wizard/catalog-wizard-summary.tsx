import { NavigationPanelGroup } from '../../../components/navigation/panel/navigation-panel-group';
import { buildCatalogWizardItems } from './catalog-wizard.model';
import { CATALOG_WIZARD_FEATURE } from './catalog-wizard.routes';
import {
  pickCatalogWizardHighlights,
  totalCatalogWizard,
} from './catalog-wizard.utils';

export interface CatalogWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CatalogWizardSummary({
  compact = false,
  limit = 3,
}: CatalogWizardSummaryProps) {
  const items = buildCatalogWizardItems();
  const totals = totalCatalogWizard(items);
  const highlights = pickCatalogWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CATALOG_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CATALOG_WIZARD_FEATURE.title}</h3>
      <NavigationPanelGroup
        size="sm"
        items={[
          { id: 'items', label: 'Items', value: items.length },
          { id: 'amount', label: 'Amount', value: totals.amount },
          { id: 'active', label: 'Active', value: totals.active },
          { id: 'pending', label: 'Pending', value: totals.pending },
        ]}
      />
      {!compact ? (
        <ol className="feature-summary-highlights">
          {highlights.map((item) => (
            <li key={item.id}>
              {item.name} — {item.amount}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
