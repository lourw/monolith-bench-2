import { OverlayToolbarGroup } from '../../../components/overlay/toolbar/overlay-toolbar-group';
import { buildAddressesDetailsItems } from './addresses-details.model';
import { ADDRESSES_DETAILS_FEATURE } from './addresses-details.routes';
import {
  pickAddressesDetailsHighlights,
  totalAddressesDetails,
} from './addresses-details.utils';

export interface AddressesDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AddressesDetailsSummary({
  compact = false,
  limit = 3,
}: AddressesDetailsSummaryProps) {
  const items = buildAddressesDetailsItems();
  const totals = totalAddressesDetails(items);
  const highlights = pickAddressesDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ADDRESSES_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ADDRESSES_DETAILS_FEATURE.title}
      </h3>
      <OverlayToolbarGroup
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
