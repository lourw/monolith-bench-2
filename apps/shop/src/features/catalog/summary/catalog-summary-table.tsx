import { MediaBanner } from '../../../components/media/banner/media-banner';
import type { CatalogSummaryItem } from './catalog-summary.model';
import { CATALOG_SUMMARY_FEATURE } from './catalog-summary.routes';
import {
  formatCatalogSummaryAmount,
  catalogSummaryStatusTone,
} from './catalog-summary.utils';

export interface CatalogSummaryTableProps {
  items: ReadonlyArray<CatalogSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CatalogSummaryTable({
  items,
  selectedId,
  onSelect,
}: CatalogSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CATALOG_SUMMARY_FEATURE.testId}-empty`}
      >
        No catalog summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CATALOG_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${CATALOG_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCatalogSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaBanner
                label={item.status}
                tone={catalogSummaryStatusTone(item.status)}
                size="sm"
                testId={`${CATALOG_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
