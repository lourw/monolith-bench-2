import { CommerceToolbar } from '../../../components/commerce/toolbar/commerce-toolbar';
import type { SizingSummaryItem } from './sizing-summary.model';
import { SIZING_SUMMARY_FEATURE } from './sizing-summary.routes';
import {
  formatSizingSummaryAmount,
  sizingSummaryStatusTone,
} from './sizing-summary.utils';

export interface SizingSummaryTableProps {
  items: ReadonlyArray<SizingSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SizingSummaryTable({
  items,
  selectedId,
  onSelect,
}: SizingSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SIZING_SUMMARY_FEATURE.testId}-empty`}
      >
        No sizing summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SIZING_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${SIZING_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSizingSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceToolbar
                label={item.status}
                tone={sizingSummaryStatusTone(item.status)}
                size="sm"
                testId={`${SIZING_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
