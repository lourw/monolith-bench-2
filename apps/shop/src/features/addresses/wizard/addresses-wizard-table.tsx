import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import type { AddressesWizardItem } from './addresses-wizard.model';
import { ADDRESSES_WIZARD_FEATURE } from './addresses-wizard.routes';
import {
  formatAddressesWizardAmount,
  addressesWizardStatusTone,
} from './addresses-wizard.utils';

export interface AddressesWizardTableProps {
  items: ReadonlyArray<AddressesWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AddressesWizardTable({
  items,
  selectedId,
  onSelect,
}: AddressesWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ADDRESSES_WIZARD_FEATURE.testId}-empty`}
      >
        No addresses wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ADDRESSES_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${ADDRESSES_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAddressesWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackTile
                label={item.status}
                tone={addressesWizardStatusTone(item.status)}
                size="sm"
                testId={`${ADDRESSES_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
