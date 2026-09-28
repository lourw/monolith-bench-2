import { FormsList } from '../../../components/forms/list/forms-list';
import type { StoreLocatorWizardItem } from './store-locator-wizard.model';
import { STORE_LOCATOR_WIZARD_FEATURE } from './store-locator-wizard.routes';
import {
  formatStoreLocatorWizardAmount,
  storeLocatorWizardStatusTone,
} from './store-locator-wizard.utils';

export interface StoreLocatorWizardTableProps {
  items: ReadonlyArray<StoreLocatorWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function StoreLocatorWizardTable({
  items,
  selectedId,
  onSelect,
}: StoreLocatorWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${STORE_LOCATOR_WIZARD_FEATURE.testId}-empty`}
      >
        No store locator wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${STORE_LOCATOR_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${STORE_LOCATOR_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatStoreLocatorWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsList
                label={item.status}
                tone={storeLocatorWizardStatusTone(item.status)}
                size="sm"
                testId={`${STORE_LOCATOR_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
