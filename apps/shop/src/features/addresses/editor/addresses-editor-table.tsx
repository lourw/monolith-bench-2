import { MarketingBanner } from '../../../components/marketing/banner/marketing-banner';
import type { AddressesEditorItem } from './addresses-editor.model';
import { ADDRESSES_EDITOR_FEATURE } from './addresses-editor.routes';
import {
  formatAddressesEditorAmount,
  addressesEditorStatusTone,
} from './addresses-editor.utils';

export interface AddressesEditorTableProps {
  items: ReadonlyArray<AddressesEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AddressesEditorTable({
  items,
  selectedId,
  onSelect,
}: AddressesEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ADDRESSES_EDITOR_FEATURE.testId}-empty`}
      >
        No addresses editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ADDRESSES_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${ADDRESSES_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAddressesEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingBanner
                label={item.status}
                tone={addressesEditorStatusTone(item.status)}
                size="sm"
                testId={`${ADDRESSES_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
