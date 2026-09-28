import { NavigationBadge } from '../../../components/navigation/badge/navigation-badge';
import type { PromotionsWizardItem } from './promotions-wizard.model';
import { PROMOTIONS_WIZARD_FEATURE } from './promotions-wizard.routes';
import {
  formatPromotionsWizardAmount,
  promotionsWizardStatusTone,
} from './promotions-wizard.utils';

export interface PromotionsWizardTableProps {
  items: ReadonlyArray<PromotionsWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PromotionsWizardTable({
  items,
  selectedId,
  onSelect,
}: PromotionsWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROMOTIONS_WIZARD_FEATURE.testId}-empty`}
      >
        No promotions wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROMOTIONS_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${PROMOTIONS_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPromotionsWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationBadge
                label={item.status}
                tone={promotionsWizardStatusTone(item.status)}
                size="sm"
                testId={`${PROMOTIONS_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
