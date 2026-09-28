import { MarketingChipGroup } from '../../../components/marketing/chip/marketing-chip-group';
import { buildCompareDashboardItems } from './compare-dashboard.model';
import { COMPARE_DASHBOARD_FEATURE } from './compare-dashboard.routes';
import {
  pickCompareDashboardHighlights,
  totalCompareDashboard,
} from './compare-dashboard.utils';

export interface CompareDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CompareDashboardSummary({
  compact = false,
  limit = 3,
}: CompareDashboardSummaryProps) {
  const items = buildCompareDashboardItems();
  const totals = totalCompareDashboard(items);
  const highlights = pickCompareDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${COMPARE_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {COMPARE_DASHBOARD_FEATURE.title}
      </h3>
      <MarketingChipGroup
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
