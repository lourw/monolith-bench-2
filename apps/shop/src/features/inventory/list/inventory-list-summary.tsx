import { MarketingPanelGroup } from '../../../components/marketing/panel/marketing-panel-group';
import { buildInventoryListItems } from './inventory-list.model';
import { INVENTORY_LIST_FEATURE } from './inventory-list.routes';
import {
  pickInventoryListHighlights,
  totalInventoryList,
} from './inventory-list.utils';

export interface InventoryListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function InventoryListSummary({
  compact = false,
  limit = 3,
}: InventoryListSummaryProps) {
  const items = buildInventoryListItems();
  const totals = totalInventoryList(items);
  const highlights = pickInventoryListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${INVENTORY_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{INVENTORY_LIST_FEATURE.title}</h3>
      <MarketingPanelGroup
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
