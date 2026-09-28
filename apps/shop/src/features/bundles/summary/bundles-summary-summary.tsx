import { LayoutListGroup } from '../../../components/layout/list/layout-list-group';
import { buildBundlesSummaryItems } from './bundles-summary.model';
import { BUNDLES_SUMMARY_FEATURE } from './bundles-summary.routes';
import {
  pickBundlesSummaryHighlights,
  totalBundlesSummary,
} from './bundles-summary.utils';

export interface BundlesSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function BundlesSummarySummary({
  compact = false,
  limit = 3,
}: BundlesSummarySummaryProps) {
  const items = buildBundlesSummaryItems();
  const totals = totalBundlesSummary(items);
  const highlights = pickBundlesSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${BUNDLES_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{BUNDLES_SUMMARY_FEATURE.title}</h3>
      <LayoutListGroup
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
