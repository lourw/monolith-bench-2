import { FeedbackBadge } from '../../../components/feedback/badge/feedback-badge';
import type { BundlesWizardItem } from './bundles-wizard.model';
import { BUNDLES_WIZARD_FEATURE } from './bundles-wizard.routes';
import {
  formatBundlesWizardAmount,
  bundlesWizardStatusTone,
} from './bundles-wizard.utils';

export interface BundlesWizardTableProps {
  items: ReadonlyArray<BundlesWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BundlesWizardTable({
  items,
  selectedId,
  onSelect,
}: BundlesWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${BUNDLES_WIZARD_FEATURE.testId}-empty`}
      >
        No bundles wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${BUNDLES_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${BUNDLES_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatBundlesWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackBadge
                label={item.status}
                tone={bundlesWizardStatusTone(item.status)}
                size="sm"
                testId={`${BUNDLES_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
