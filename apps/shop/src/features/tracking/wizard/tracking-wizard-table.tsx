import { CoreList } from '../../../components/core/list/core-list';
import type { TrackingWizardItem } from './tracking-wizard.model';
import { TRACKING_WIZARD_FEATURE } from './tracking-wizard.routes';
import {
  formatTrackingWizardAmount,
  trackingWizardStatusTone,
} from './tracking-wizard.utils';

export interface TrackingWizardTableProps {
  items: ReadonlyArray<TrackingWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TrackingWizardTable({
  items,
  selectedId,
  onSelect,
}: TrackingWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${TRACKING_WIZARD_FEATURE.testId}-empty`}
      >
        No tracking wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${TRACKING_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${TRACKING_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatTrackingWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreList
                label={item.status}
                tone={trackingWizardStatusTone(item.status)}
                size="sm"
                testId={`${TRACKING_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
