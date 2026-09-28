import { LayoutCardGroup } from '../../../components/layout/card/layout-card-group';
import { buildLoyaltyOverviewItems } from './loyalty-overview.model';
import { LOYALTY_OVERVIEW_FEATURE } from './loyalty-overview.routes';
import {
  pickLoyaltyOverviewHighlights,
  totalLoyaltyOverview,
} from './loyalty-overview.utils';

export interface LoyaltyOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function LoyaltyOverviewSummary({
  compact = false,
  limit = 3,
}: LoyaltyOverviewSummaryProps) {
  const items = buildLoyaltyOverviewItems();
  const totals = totalLoyaltyOverview(items);
  const highlights = pickLoyaltyOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${LOYALTY_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {LOYALTY_OVERVIEW_FEATURE.title}
      </h3>
      <LayoutCardGroup
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
