import { NavigationTile } from '../../../components/navigation/tile/navigation-tile';
import type { SearchWizardItem } from './search-wizard.model';
import { SEARCH_WIZARD_FEATURE } from './search-wizard.routes';
import {
  formatSearchWizardAmount,
  searchWizardStatusTone,
} from './search-wizard.utils';

export interface SearchWizardTableProps {
  items: ReadonlyArray<SearchWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SearchWizardTable({
  items,
  selectedId,
  onSelect,
}: SearchWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SEARCH_WIZARD_FEATURE.testId}-empty`}
      >
        No search wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SEARCH_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${SEARCH_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSearchWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationTile
                label={item.status}
                tone={searchWizardStatusTone(item.status)}
                size="sm"
                testId={`${SEARCH_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
