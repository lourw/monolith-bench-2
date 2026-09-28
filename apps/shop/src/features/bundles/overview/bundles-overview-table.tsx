import { CommerceToolbar } from '../../../components/commerce/toolbar/commerce-toolbar';
import type { BundlesOverviewItem } from './bundles-overview.model';
import { BUNDLES_OVERVIEW_FEATURE } from './bundles-overview.routes';
import {
  formatBundlesOverviewAmount,
  bundlesOverviewStatusTone,
} from './bundles-overview.utils';

export interface BundlesOverviewTableProps {
  items: ReadonlyArray<BundlesOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BundlesOverviewTable({
  items,
  selectedId,
  onSelect,
}: BundlesOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${BUNDLES_OVERVIEW_FEATURE.testId}-empty`}
      >
        No bundles overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${BUNDLES_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${BUNDLES_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatBundlesOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceToolbar
                label={item.status}
                tone={bundlesOverviewStatusTone(item.status)}
                size="sm"
                testId={`${BUNDLES_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
