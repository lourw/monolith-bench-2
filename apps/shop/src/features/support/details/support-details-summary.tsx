import { MediaListGroup } from '../../../components/media/list/media-list-group';
import { buildSupportDetailsItems } from './support-details.model';
import { SUPPORT_DETAILS_FEATURE } from './support-details.routes';
import {
  pickSupportDetailsHighlights,
  totalSupportDetails,
} from './support-details.utils';

export interface SupportDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SupportDetailsSummary({
  compact = false,
  limit = 3,
}: SupportDetailsSummaryProps) {
  const items = buildSupportDetailsItems();
  const totals = totalSupportDetails(items);
  const highlights = pickSupportDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUPPORT_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SUPPORT_DETAILS_FEATURE.title}</h3>
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
