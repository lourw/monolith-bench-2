import { InputsBadge } from '../../../components/inputs/badge/inputs-badge';
import type { ReturnsWizardItem } from './returns-wizard.model';
import { RETURNS_WIZARD_FEATURE } from './returns-wizard.routes';
import {
  formatReturnsWizardAmount,
  returnsWizardStatusTone,
} from './returns-wizard.utils';

export interface ReturnsWizardTableProps {
  items: ReadonlyArray<ReturnsWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReturnsWizardTable({
  items,
  selectedId,
  onSelect,
}: ReturnsWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RETURNS_WIZARD_FEATURE.testId}-empty`}
      >
        No returns wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RETURNS_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${RETURNS_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReturnsWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsBadge
                label={item.status}
                tone={returnsWizardStatusTone(item.status)}
                size="sm"
                testId={`${RETURNS_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
