import { MarketingChip } from '../../../components/marketing/chip/marketing-chip';
import type { BundlesHistoryItem } from './bundles-history.model';
import { BUNDLES_HISTORY_FEATURE } from './bundles-history.routes';
import {
  formatBundlesHistoryAmount,
  bundlesHistoryStatusTone,
} from './bundles-history.utils';

export interface BundlesHistoryTableProps {
  items: ReadonlyArray<BundlesHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BundlesHistoryTable({
  items,
  selectedId,
  onSelect,
}: BundlesHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${BUNDLES_HISTORY_FEATURE.testId}-empty`}
      >
        No bundles history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${BUNDLES_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${BUNDLES_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatBundlesHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingChip
                label={item.status}
                tone={bundlesHistoryStatusTone(item.status)}
                size="sm"
                testId={`${BUNDLES_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
