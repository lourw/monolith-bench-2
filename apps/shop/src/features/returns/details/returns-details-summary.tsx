import { CoreBannerGroup } from '../../../components/core/banner/core-banner-group';
import { buildReturnsDetailsItems } from './returns-details.model';
import { RETURNS_DETAILS_FEATURE } from './returns-details.routes';
import {
  pickReturnsDetailsHighlights,
  totalReturnsDetails,
} from './returns-details.utils';

export interface ReturnsDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReturnsDetailsSummary({
  compact = false,
  limit = 3,
}: ReturnsDetailsSummaryProps) {
  const items = buildReturnsDetailsItems();
  const totals = totalReturnsDetails(items);
  const highlights = pickReturnsDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RETURNS_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{RETURNS_DETAILS_FEATURE.title}</h3>
      <CoreBannerGroup
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
