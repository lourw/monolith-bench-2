import { MarketingChip } from '../../../components/marketing/chip/marketing-chip';
import type { AddressesSummaryItem } from './addresses-summary.model';
import { ADDRESSES_SUMMARY_FEATURE } from './addresses-summary.routes';
import {
  formatAddressesSummaryAmount,
  addressesSummaryStatusTone,
} from './addresses-summary.utils';

export interface AddressesSummaryTableProps {
  items: ReadonlyArray<AddressesSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AddressesSummaryTable({
  items,
  selectedId,
  onSelect,
}: AddressesSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ADDRESSES_SUMMARY_FEATURE.testId}-empty`}
      >
        No addresses summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ADDRESSES_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${ADDRESSES_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAddressesSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingChip
                label={item.status}
                tone={addressesSummaryStatusTone(item.status)}
                size="sm"
                testId={`${ADDRESSES_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
