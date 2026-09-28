import { MediaBannerGroup } from '../../../components/media/banner/media-banner-group';
import { buildAddressesOverviewItems } from './addresses-overview.model';
import { ADDRESSES_OVERVIEW_FEATURE } from './addresses-overview.routes';
import {
  pickAddressesOverviewHighlights,
  totalAddressesOverview,
} from './addresses-overview.utils';

export interface AddressesOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AddressesOverviewSummary({
  compact = false,
  limit = 3,
}: AddressesOverviewSummaryProps) {
  const items = buildAddressesOverviewItems();
  const totals = totalAddressesOverview(items);
  const highlights = pickAddressesOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ADDRESSES_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ADDRESSES_OVERVIEW_FEATURE.title}
      </h3>
      <MediaBannerGroup
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
