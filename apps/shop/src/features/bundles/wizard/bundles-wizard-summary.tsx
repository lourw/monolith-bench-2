import { ChartsStatGroup } from '../../../components/charts/stat/charts-stat-group';
import { buildBundlesWizardItems } from './bundles-wizard.model';
import { BUNDLES_WIZARD_FEATURE } from './bundles-wizard.routes';
import {
  pickBundlesWizardHighlights,
  totalBundlesWizard,
} from './bundles-wizard.utils';

export interface BundlesWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function BundlesWizardSummary({
  compact = false,
  limit = 3,
}: BundlesWizardSummaryProps) {
  const items = buildBundlesWizardItems();
  const totals = totalBundlesWizard(items);
  const highlights = pickBundlesWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${BUNDLES_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{BUNDLES_WIZARD_FEATURE.title}</h3>
      <ChartsStatGroup
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
