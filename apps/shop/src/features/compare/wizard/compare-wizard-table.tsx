import { CommerceStat } from '../../../components/commerce/stat/commerce-stat';
import type { CompareWizardItem } from './compare-wizard.model';
import { COMPARE_WIZARD_FEATURE } from './compare-wizard.routes';
import {
  formatCompareWizardAmount,
  compareWizardStatusTone,
} from './compare-wizard.utils';

export interface CompareWizardTableProps {
  items: ReadonlyArray<CompareWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CompareWizardTable({
  items,
  selectedId,
  onSelect,
}: CompareWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${COMPARE_WIZARD_FEATURE.testId}-empty`}
      >
        No compare wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${COMPARE_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${COMPARE_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCompareWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceStat
                label={item.status}
                tone={compareWizardStatusTone(item.status)}
                size="sm"
                testId={`${COMPARE_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
