import { DataCardGroup } from '../../../components/data/card/data-card-group';
import { buildSupportSummaryItems } from './support-summary.model';
import { SUPPORT_SUMMARY_FEATURE } from './support-summary.routes';
import {
  pickSupportSummaryHighlights,
  totalSupportSummary,
} from './support-summary.utils';

export interface SupportSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SupportSummarySummary({
  compact = false,
  limit = 3,
}: SupportSummarySummaryProps) {
  const items = buildSupportSummaryItems();
  const totals = totalSupportSummary(items);
  const highlights = pickSupportSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUPPORT_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SUPPORT_SUMMARY_FEATURE.title}</h3>
      <DataCardGroup
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
