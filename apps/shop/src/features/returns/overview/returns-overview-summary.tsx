import { CoreCardGroup } from '../../../components/core/card/core-card-group';
import { buildReturnsOverviewItems } from './returns-overview.model';
import { RETURNS_OVERVIEW_FEATURE } from './returns-overview.routes';
import {
  pickReturnsOverviewHighlights,
  totalReturnsOverview,
} from './returns-overview.utils';

export interface ReturnsOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReturnsOverviewSummary({
  compact = false,
  limit = 3,
}: ReturnsOverviewSummaryProps) {
  const items = buildReturnsOverviewItems();
  const totals = totalReturnsOverview(items);
  const highlights = pickReturnsOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RETURNS_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RETURNS_OVERVIEW_FEATURE.title}
      </h3>
      <CoreCardGroup
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
