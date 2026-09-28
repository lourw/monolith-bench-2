import { CommerceBadge } from '../../../components/commerce/badge/commerce-badge';
import type { AnalyticsWizardItem } from './analytics-wizard.model';
import { ANALYTICS_WIZARD_FEATURE } from './analytics-wizard.routes';
import {
  formatAnalyticsWizardAmount,
  analyticsWizardStatusTone,
} from './analytics-wizard.utils';

export interface AnalyticsWizardTableProps {
  items: ReadonlyArray<AnalyticsWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AnalyticsWizardTable({
  items,
  selectedId,
  onSelect,
}: AnalyticsWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ANALYTICS_WIZARD_FEATURE.testId}-empty`}
      >
        No analytics wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ANALYTICS_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${ANALYTICS_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAnalyticsWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceBadge
                label={item.status}
                tone={analyticsWizardStatusTone(item.status)}
                size="sm"
                testId={`${ANALYTICS_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
