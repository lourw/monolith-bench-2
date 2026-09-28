import { NavigationBadge } from '../../../components/navigation/badge/navigation-badge';
import type { InventoryWizardItem } from './inventory-wizard.model';
import { INVENTORY_WIZARD_FEATURE } from './inventory-wizard.routes';
import {
  formatInventoryWizardAmount,
  inventoryWizardStatusTone,
} from './inventory-wizard.utils';

export interface InventoryWizardTableProps {
  items: ReadonlyArray<InventoryWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InventoryWizardTable({
  items,
  selectedId,
  onSelect,
}: InventoryWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${INVENTORY_WIZARD_FEATURE.testId}-empty`}
      >
        No inventory wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${INVENTORY_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${INVENTORY_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatInventoryWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationBadge
                label={item.status}
                tone={inventoryWizardStatusTone(item.status)}
                size="sm"
                testId={`${INVENTORY_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
