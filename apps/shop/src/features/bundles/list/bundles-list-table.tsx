import { FormsStat } from '../../../components/forms/stat/forms-stat';
import type { BundlesListItem } from './bundles-list.model';
import { BUNDLES_LIST_FEATURE } from './bundles-list.routes';
import {
  formatBundlesListAmount,
  bundlesListStatusTone,
} from './bundles-list.utils';

export interface BundlesListTableProps {
  items: ReadonlyArray<BundlesListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BundlesListTable({
  items,
  selectedId,
  onSelect,
}: BundlesListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${BUNDLES_LIST_FEATURE.testId}-empty`}
      >
        No bundles list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${BUNDLES_LIST_FEATURE.testId}-table`}
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
            data-testid={`${BUNDLES_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatBundlesListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsStat
                label={item.status}
                tone={bundlesListStatusTone(item.status)}
                size="sm"
                testId={`${BUNDLES_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
