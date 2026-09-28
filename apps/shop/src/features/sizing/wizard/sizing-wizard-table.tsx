import { ChartsPanel } from '../../../components/charts/panel/charts-panel';
import type { SizingWizardItem } from './sizing-wizard.model';
import { SIZING_WIZARD_FEATURE } from './sizing-wizard.routes';
import {
  formatSizingWizardAmount,
  sizingWizardStatusTone,
} from './sizing-wizard.utils';

export interface SizingWizardTableProps {
  items: ReadonlyArray<SizingWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SizingWizardTable({
  items,
  selectedId,
  onSelect,
}: SizingWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SIZING_WIZARD_FEATURE.testId}-empty`}
      >
        No sizing wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SIZING_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${SIZING_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSizingWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsPanel
                label={item.status}
                tone={sizingWizardStatusTone(item.status)}
                size="sm"
                testId={`${SIZING_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
