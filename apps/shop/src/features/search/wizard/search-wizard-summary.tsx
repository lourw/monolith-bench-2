import { ChartsToolbarGroup } from '../../../components/charts/toolbar/charts-toolbar-group';
import { buildSearchWizardItems } from './search-wizard.model';
import { SEARCH_WIZARD_FEATURE } from './search-wizard.routes';
import {
  pickSearchWizardHighlights,
  totalSearchWizard,
} from './search-wizard.utils';

export interface SearchWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SearchWizardSummary({
  compact = false,
  limit = 3,
}: SearchWizardSummaryProps) {
  const items = buildSearchWizardItems();
  const totals = totalSearchWizard(items);
  const highlights = pickSearchWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SEARCH_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SEARCH_WIZARD_FEATURE.title}</h3>
      <ChartsToolbarGroup
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
