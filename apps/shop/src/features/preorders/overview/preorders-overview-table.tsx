import { CommerceBanner } from '../../../components/commerce/banner/commerce-banner';
import type { PreordersOverviewItem } from './preorders-overview.model';
import { PREORDERS_OVERVIEW_FEATURE } from './preorders-overview.routes';
import {
  formatPreordersOverviewAmount,
  preordersOverviewStatusTone,
} from './preorders-overview.utils';

export interface PreordersOverviewTableProps {
  items: ReadonlyArray<PreordersOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PreordersOverviewTable({
  items,
  selectedId,
  onSelect,
}: PreordersOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PREORDERS_OVERVIEW_FEATURE.testId}-empty`}
      >
        No preorders overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PREORDERS_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${PREORDERS_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPreordersOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceBanner
                label={item.status}
                tone={preordersOverviewStatusTone(item.status)}
                size="sm"
                testId={`${PREORDERS_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
