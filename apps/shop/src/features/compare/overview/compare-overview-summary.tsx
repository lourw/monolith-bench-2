import { LayoutHeaderGroup } from '../../../components/layout/header/layout-header-group';
import { buildCompareOverviewItems } from './compare-overview.model';
import { COMPARE_OVERVIEW_FEATURE } from './compare-overview.routes';
import {
  pickCompareOverviewHighlights,
  totalCompareOverview,
} from './compare-overview.utils';

export interface CompareOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CompareOverviewSummary({
  compact = false,
  limit = 3,
}: CompareOverviewSummaryProps) {
  const items = buildCompareOverviewItems();
  const totals = totalCompareOverview(items);
  const highlights = pickCompareOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${COMPARE_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {COMPARE_OVERVIEW_FEATURE.title}
      </h3>
      <LayoutHeaderGroup
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
