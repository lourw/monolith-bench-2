import { FormsTileGroup } from '../../../components/forms/tile/forms-tile-group';
import { buildInventoryDetailsItems } from './inventory-details.model';
import { INVENTORY_DETAILS_FEATURE } from './inventory-details.routes';
import {
  pickInventoryDetailsHighlights,
  totalInventoryDetails,
} from './inventory-details.utils';

export interface InventoryDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function InventoryDetailsSummary({
  compact = false,
  limit = 3,
}: InventoryDetailsSummaryProps) {
  const items = buildInventoryDetailsItems();
  const totals = totalInventoryDetails(items);
  const highlights = pickInventoryDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${INVENTORY_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {INVENTORY_DETAILS_FEATURE.title}
      </h3>
      <FormsTileGroup
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
