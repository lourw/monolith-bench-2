import { FormsBannerGroup } from '../../../components/forms/banner/forms-banner-group';
import { buildSizingHistoryItems } from './sizing-history.model';
import { SIZING_HISTORY_FEATURE } from './sizing-history.routes';
import {
  pickSizingHistoryHighlights,
  totalSizingHistory,
} from './sizing-history.utils';

export interface SizingHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SizingHistorySummary({
  compact = false,
  limit = 3,
}: SizingHistorySummaryProps) {
  const items = buildSizingHistoryItems();
  const totals = totalSizingHistory(items);
  const highlights = pickSizingHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SIZING_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SIZING_HISTORY_FEATURE.title}</h3>
      <FormsBannerGroup
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
