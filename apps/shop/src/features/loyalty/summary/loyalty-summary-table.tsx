import { OverlayStat } from '../../../components/overlay/stat/overlay-stat';
import type { LoyaltySummaryItem } from './loyalty-summary.model';
import { LOYALTY_SUMMARY_FEATURE } from './loyalty-summary.routes';
import {
  formatLoyaltySummaryAmount,
  loyaltySummaryStatusTone,
} from './loyalty-summary.utils';

export interface LoyaltySummaryTableProps {
  items: ReadonlyArray<LoyaltySummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LoyaltySummaryTable({
  items,
  selectedId,
  onSelect,
}: LoyaltySummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${LOYALTY_SUMMARY_FEATURE.testId}-empty`}
      >
        No loyalty summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${LOYALTY_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${LOYALTY_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatLoyaltySummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayStat
                label={item.status}
                tone={loyaltySummaryStatusTone(item.status)}
                size="sm"
                testId={`${LOYALTY_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
