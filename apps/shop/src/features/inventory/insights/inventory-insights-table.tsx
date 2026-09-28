import { NavigationStat } from '../../../components/navigation/stat/navigation-stat';
import type { InventoryInsightsItem } from './inventory-insights.model';
import { INVENTORY_INSIGHTS_FEATURE } from './inventory-insights.routes';
import {
  formatInventoryInsightsAmount,
  inventoryInsightsStatusTone,
} from './inventory-insights.utils';

export interface InventoryInsightsTableProps {
  items: ReadonlyArray<InventoryInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InventoryInsightsTable({
  items,
  selectedId,
  onSelect,
}: InventoryInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${INVENTORY_INSIGHTS_FEATURE.testId}-empty`}
      >
        No inventory insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${INVENTORY_INSIGHTS_FEATURE.testId}-table`}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Qty</th>
          <th>Status</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className={
              item.id === selectedId ? 'feature-row selected' : 'feature-row'
            }
            data-testid={`${INVENTORY_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatInventoryInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationStat
                label={item.status}
                tone={inventoryInsightsStatusTone(item.status)}
                size="sm"
                testId={`${INVENTORY_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
