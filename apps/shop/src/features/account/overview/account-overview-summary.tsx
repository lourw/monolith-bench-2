import { DataStatGroup } from '../../../components/data/stat/data-stat-group';
import { buildAccountOverviewItems } from './account-overview.model';
import { ACCOUNT_OVERVIEW_FEATURE } from './account-overview.routes';
import {
  pickAccountOverviewHighlights,
  totalAccountOverview,
} from './account-overview.utils';

export interface AccountOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AccountOverviewSummary({
  compact = false,
  limit = 3,
}: AccountOverviewSummaryProps) {
  const items = buildAccountOverviewItems();
  const totals = totalAccountOverview(items);
  const highlights = pickAccountOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ACCOUNT_OVERVIEW_FEATURE.title}
      </h3>
      <DataStatGroup
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
