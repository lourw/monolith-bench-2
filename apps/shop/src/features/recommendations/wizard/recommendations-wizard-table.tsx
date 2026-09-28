import { DataBanner } from '../../../components/data/banner/data-banner';
import type { RecommendationsWizardItem } from './recommendations-wizard.model';
import { RECOMMENDATIONS_WIZARD_FEATURE } from './recommendations-wizard.routes';
import {
  formatRecommendationsWizardAmount,
  recommendationsWizardStatusTone,
} from './recommendations-wizard.utils';

export interface RecommendationsWizardTableProps {
  items: ReadonlyArray<RecommendationsWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RecommendationsWizardTable({
  items,
  selectedId,
  onSelect,
}: RecommendationsWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-empty`}
      >
        No recommendations wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatRecommendationsWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataBanner
                label={item.status}
                tone={recommendationsWizardStatusTone(item.status)}
                size="sm"
                testId={`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
