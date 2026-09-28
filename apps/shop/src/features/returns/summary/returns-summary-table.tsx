import { TypographyTile } from '../../../components/typography/tile/typography-tile';
import type { ReturnsSummaryItem } from './returns-summary.model';
import { RETURNS_SUMMARY_FEATURE } from './returns-summary.routes';
import {
  formatReturnsSummaryAmount,
  returnsSummaryStatusTone,
} from './returns-summary.utils';

export interface ReturnsSummaryTableProps {
  items: ReadonlyArray<ReturnsSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReturnsSummaryTable({
  items,
  selectedId,
  onSelect,
}: ReturnsSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RETURNS_SUMMARY_FEATURE.testId}-empty`}
      >
        No returns summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RETURNS_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${RETURNS_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReturnsSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyTile
                label={item.status}
                tone={returnsSummaryStatusTone(item.status)}
                size="sm"
                testId={`${RETURNS_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
