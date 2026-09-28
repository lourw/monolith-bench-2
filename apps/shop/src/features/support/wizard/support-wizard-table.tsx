import { MediaBanner } from '../../../components/media/banner/media-banner';
import type { SupportWizardItem } from './support-wizard.model';
import { SUPPORT_WIZARD_FEATURE } from './support-wizard.routes';
import {
  formatSupportWizardAmount,
  supportWizardStatusTone,
} from './support-wizard.utils';

export interface SupportWizardTableProps {
  items: ReadonlyArray<SupportWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SupportWizardTable({
  items,
  selectedId,
  onSelect,
}: SupportWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUPPORT_WIZARD_FEATURE.testId}-empty`}
      >
        No support wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUPPORT_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${SUPPORT_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSupportWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaBanner
                label={item.status}
                tone={supportWizardStatusTone(item.status)}
                size="sm"
                testId={`${SUPPORT_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
