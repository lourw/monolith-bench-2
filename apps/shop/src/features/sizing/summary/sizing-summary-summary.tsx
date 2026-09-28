import { LayoutHeaderGroup } from '../../../components/layout/header/layout-header-group';
import { buildSizingSummaryItems } from './sizing-summary.model';
import { SIZING_SUMMARY_FEATURE } from './sizing-summary.routes';
import {
  pickSizingSummaryHighlights,
  totalSizingSummary,
} from './sizing-summary.utils';

export interface SizingSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SizingSummarySummary({
  compact = false,
  limit = 3,
}: SizingSummarySummaryProps) {
  const items = buildSizingSummaryItems();
  const totals = totalSizingSummary(items);
  const highlights = pickSizingSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SIZING_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SIZING_SUMMARY_FEATURE.title}</h3>
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
