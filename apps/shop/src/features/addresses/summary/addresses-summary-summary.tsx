import { MediaListGroup } from '../../../components/media/list/media-list-group';
import { buildAddressesSummaryItems } from './addresses-summary.model';
import { ADDRESSES_SUMMARY_FEATURE } from './addresses-summary.routes';
import {
  pickAddressesSummaryHighlights,
  totalAddressesSummary,
} from './addresses-summary.utils';

export interface AddressesSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AddressesSummarySummary({
  compact = false,
  limit = 3,
}: AddressesSummarySummaryProps) {
  const items = buildAddressesSummaryItems();
  const totals = totalAddressesSummary(items);
  const highlights = pickAddressesSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ADDRESSES_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ADDRESSES_SUMMARY_FEATURE.title}
      </h3>
      <MediaListGroup
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
