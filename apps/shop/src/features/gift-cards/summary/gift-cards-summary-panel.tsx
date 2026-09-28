import { ChartsBadgeGroup } from '../../../components/charts/badge/charts-badge-group';
import { DataTile } from '../../../components/data/tile/data-tile';
import { TypographyBadge } from '../../../components/typography/badge/typography-badge';
import type { GiftCardsSummaryItem } from './gift-cards-summary.model';
import { GIFT_CARDS_SUMMARY_FEATURE } from './gift-cards-summary.routes';
import { describeGiftCardsSummaryItem } from './gift-cards-summary.utils';

export interface GiftCardsSummaryPanelProps {
  selected: GiftCardsSummaryItem | null;
  onClear: () => void;
}

export function GiftCardsSummaryPanel({
  selected,
  onClear,
}: GiftCardsSummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-panel`}
      >
        <p className="feature-panel-hint">
          Select an entry to see its details.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="feature-panel"
      data-testid={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeGiftCardsSummaryItem(selected)}
      </p>
      <ChartsBadgeGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra">
        <DataTile label="Data Tile" value={selected.product.rating} size="sm" />
        <TypographyBadge
          label="Typography Badge"
          value={selected.product.rating}
          size="sm"
        />
      </div>
      <ul className="feature-tags">
        {selected.tags.map((tag) => (
          <li key={tag} className="feature-tag">
            {tag}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="feature-button secondary"
        onClick={onClear}
        data-testid={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
