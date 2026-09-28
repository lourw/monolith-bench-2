import { NavigationStatGroup } from '../../../components/navigation/stat/navigation-stat-group';
import { buildInventoryHistoryItems } from './inventory-history.model';
import { INVENTORY_HISTORY_FEATURE } from './inventory-history.routes';
import {
  pickInventoryHistoryHighlights,
  totalInventoryHistory,
} from './inventory-history.utils';

export interface InventoryHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function InventoryHistorySummary({
  compact = false,
  limit = 3,
}: InventoryHistorySummaryProps) {
  const items = buildInventoryHistoryItems();
  const totals = totalInventoryHistory(items);
  const highlights = pickInventoryHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${INVENTORY_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {INVENTORY_HISTORY_FEATURE.title}
      </h3>
      <NavigationStatGroup
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
