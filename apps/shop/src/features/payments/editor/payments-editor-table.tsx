import { FormsCard } from '../../../components/forms/card/forms-card';
import type { PaymentsEditorItem } from './payments-editor.model';
import { PAYMENTS_EDITOR_FEATURE } from './payments-editor.routes';
import {
  formatPaymentsEditorAmount,
  paymentsEditorStatusTone,
} from './payments-editor.utils';

export interface PaymentsEditorTableProps {
  items: ReadonlyArray<PaymentsEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PaymentsEditorTable({
  items,
  selectedId,
  onSelect,
}: PaymentsEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PAYMENTS_EDITOR_FEATURE.testId}-empty`}
      >
        No payments editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PAYMENTS_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${PAYMENTS_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPaymentsEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsCard
                label={item.status}
                tone={paymentsEditorStatusTone(item.status)}
                size="sm"
                testId={`${PAYMENTS_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
