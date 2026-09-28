import { ChartsToolbarGroup } from '../../../components/charts/toolbar/charts-toolbar-group';
import { buildAccountHistoryItems } from './account-history.model';
import { ACCOUNT_HISTORY_FEATURE } from './account-history.routes';
import {
  pickAccountHistoryHighlights,
  totalAccountHistory,
} from './account-history.utils';

export interface AccountHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AccountHistorySummary({
  compact = false,
  limit = 3,
}: AccountHistorySummaryProps) {
  const items = buildAccountHistoryItems();
  const totals = totalAccountHistory(items);
  const highlights = pickAccountHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ACCOUNT_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ACCOUNT_HISTORY_FEATURE.title}</h3>
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
