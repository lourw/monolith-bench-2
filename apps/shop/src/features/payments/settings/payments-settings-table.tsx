import { MediaChip } from '../../../components/media/chip/media-chip';
import type { PaymentsSettingsItem } from './payments-settings.model';
import { PAYMENTS_SETTINGS_FEATURE } from './payments-settings.routes';
import {
  formatPaymentsSettingsAmount,
  paymentsSettingsStatusTone,
} from './payments-settings.utils';

export interface PaymentsSettingsTableProps {
  items: ReadonlyArray<PaymentsSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PaymentsSettingsTable({
  items,
  selectedId,
  onSelect,
}: PaymentsSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PAYMENTS_SETTINGS_FEATURE.testId}-empty`}
      >
        No payments settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PAYMENTS_SETTINGS_FEATURE.testId}-table`}
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
            data-testid={`${PAYMENTS_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPaymentsSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaChip
                label={item.status}
                tone={paymentsSettingsStatusTone(item.status)}
                size="sm"
                testId={`${PAYMENTS_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
