import { TypographyPanel } from '../../../components/typography/panel/typography-panel';
import type { InventorySummaryItem } from './inventory-summary.model';
import { INVENTORY_SUMMARY_FEATURE } from './inventory-summary.routes';
import {
  formatInventorySummaryAmount,
  inventorySummaryStatusTone,
} from './inventory-summary.utils';

export interface InventorySummaryTableProps {
  items: ReadonlyArray<InventorySummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InventorySummaryTable({
  items,
  selectedId,
  onSelect,
}: InventorySummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${INVENTORY_SUMMARY_FEATURE.testId}-empty`}
      >
        No inventory summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${INVENTORY_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${INVENTORY_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatInventorySummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyPanel
                label={item.status}
                tone={inventorySummaryStatusTone(item.status)}
                size="sm"
                testId={`${INVENTORY_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
