import { FeedbackChip } from '../../../components/feedback/chip/feedback-chip';
import type { AddressesInsightsItem } from './addresses-insights.model';
import { ADDRESSES_INSIGHTS_FEATURE } from './addresses-insights.routes';
import {
  formatAddressesInsightsAmount,
  addressesInsightsStatusTone,
} from './addresses-insights.utils';

export interface AddressesInsightsTableProps {
  items: ReadonlyArray<AddressesInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AddressesInsightsTable({
  items,
  selectedId,
  onSelect,
}: AddressesInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ADDRESSES_INSIGHTS_FEATURE.testId}-empty`}
      >
        No addresses insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ADDRESSES_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${ADDRESSES_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAddressesInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackChip
                label={item.status}
                tone={addressesInsightsStatusTone(item.status)}
                size="sm"
                testId={`${ADDRESSES_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
