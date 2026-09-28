import { MarketingBadgeGroup } from '../../../components/marketing/badge/marketing-badge-group';
import { buildBundlesDetailsItems } from './bundles-details.model';
import { BUNDLES_DETAILS_FEATURE } from './bundles-details.routes';
import {
  pickBundlesDetailsHighlights,
  totalBundlesDetails,
} from './bundles-details.utils';

export interface BundlesDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function BundlesDetailsSummary({
  compact = false,
  limit = 3,
}: BundlesDetailsSummaryProps) {
  const items = buildBundlesDetailsItems();
  const totals = totalBundlesDetails(items);
  const highlights = pickBundlesDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${BUNDLES_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{BUNDLES_DETAILS_FEATURE.title}</h3>
      <MarketingBadgeGroup
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
