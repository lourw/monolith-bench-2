import { LayoutCard } from '../../../components/layout/card/layout-card';
import type { BundlesDetailsItem } from './bundles-details.model';
import { BUNDLES_DETAILS_FEATURE } from './bundles-details.routes';
import {
  formatBundlesDetailsAmount,
  bundlesDetailsStatusTone,
} from './bundles-details.utils';

export interface BundlesDetailsTableProps {
  items: ReadonlyArray<BundlesDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BundlesDetailsTable({
  items,
  selectedId,
  onSelect,
}: BundlesDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${BUNDLES_DETAILS_FEATURE.testId}-empty`}
      >
        No bundles details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${BUNDLES_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${BUNDLES_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatBundlesDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutCard
                label={item.status}
                tone={bundlesDetailsStatusTone(item.status)}
                size="sm"
                testId={`${BUNDLES_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
