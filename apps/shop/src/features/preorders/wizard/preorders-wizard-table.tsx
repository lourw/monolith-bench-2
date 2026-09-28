import { NavigationHeader } from '../../../components/navigation/header/navigation-header';
import type { PreordersWizardItem } from './preorders-wizard.model';
import { PREORDERS_WIZARD_FEATURE } from './preorders-wizard.routes';
import {
  formatPreordersWizardAmount,
  preordersWizardStatusTone,
} from './preorders-wizard.utils';

export interface PreordersWizardTableProps {
  items: ReadonlyArray<PreordersWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PreordersWizardTable({
  items,
  selectedId,
  onSelect,
}: PreordersWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PREORDERS_WIZARD_FEATURE.testId}-empty`}
      >
        No preorders wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PREORDERS_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${PREORDERS_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPreordersWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationHeader
                label={item.status}
                tone={preordersWizardStatusTone(item.status)}
                size="sm"
                testId={`${PREORDERS_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
