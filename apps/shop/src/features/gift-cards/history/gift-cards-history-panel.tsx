import { TypographyBannerGroup } from '../../../components/typography/banner/typography-banner-group';
import { TypographyToolbar } from '../../../components/typography/toolbar/typography-toolbar';
import type { GiftCardsHistoryItem } from './gift-cards-history.model';
import { GIFT_CARDS_HISTORY_FEATURE } from './gift-cards-history.routes';
import { describeGiftCardsHistoryItem } from './gift-cards-history.utils';

export interface GiftCardsHistoryPanelProps {
  selected: GiftCardsHistoryItem | null;
  onClear: () => void;
}

export function GiftCardsHistoryPanel({
  selected,
  onClear,
}: GiftCardsHistoryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${GIFT_CARDS_HISTORY_FEATURE.testId}-panel`}
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
      data-testid={`${GIFT_CARDS_HISTORY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${GIFT_CARDS_HISTORY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeGiftCardsHistoryItem(selected)}
      </p>
      <TypographyBannerGroup
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
        <TypographyToolbar
          label="Typography Toolbar"
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
        data-testid={`${GIFT_CARDS_HISTORY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
