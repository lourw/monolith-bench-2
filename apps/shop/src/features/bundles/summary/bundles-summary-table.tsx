import { OverlayBanner } from '../../../components/overlay/banner/overlay-banner';
import type { BundlesSummaryItem } from './bundles-summary.model';
import { BUNDLES_SUMMARY_FEATURE } from './bundles-summary.routes';
import {
  formatBundlesSummaryAmount,
  bundlesSummaryStatusTone,
} from './bundles-summary.utils';

export interface BundlesSummaryTableProps {
  items: ReadonlyArray<BundlesSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BundlesSummaryTable({
  items,
  selectedId,
  onSelect,
}: BundlesSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${BUNDLES_SUMMARY_FEATURE.testId}-empty`}
      >
        No bundles summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${BUNDLES_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${BUNDLES_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatBundlesSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayBanner
                label={item.status}
                tone={bundlesSummaryStatusTone(item.status)}
                size="sm"
                testId={`${BUNDLES_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
