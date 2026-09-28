import { InputsStatGroup } from '../../../components/inputs/stat/inputs-stat-group';
import { buildSupportHistoryItems } from './support-history.model';
import { SUPPORT_HISTORY_FEATURE } from './support-history.routes';
import {
  pickSupportHistoryHighlights,
  totalSupportHistory,
} from './support-history.utils';

export interface SupportHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SupportHistorySummary({
  compact = false,
  limit = 3,
}: SupportHistorySummaryProps) {
  const items = buildSupportHistoryItems();
  const totals = totalSupportHistory(items);
  const highlights = pickSupportHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUPPORT_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SUPPORT_HISTORY_FEATURE.title}</h3>
      <InputsStatGroup
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
