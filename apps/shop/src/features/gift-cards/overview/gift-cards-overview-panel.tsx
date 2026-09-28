import { MediaListGroup } from '../../../components/media/list/media-list-group';
import { MarketingBadge } from '../../../components/marketing/badge/marketing-badge';
import { TypographyToolbar } from '../../../components/typography/toolbar/typography-toolbar';
import type { GiftCardsOverviewItem } from './gift-cards-overview.model';
import { GIFT_CARDS_OVERVIEW_FEATURE } from './gift-cards-overview.routes';
import { describeGiftCardsOverviewItem } from './gift-cards-overview.utils';

export interface GiftCardsOverviewPanelProps {
  selected: GiftCardsOverviewItem | null;
  onClear: () => void;
}

export function GiftCardsOverviewPanel({
  selected,
  onClear,
}: GiftCardsOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeGiftCardsOverviewItem(selected)}
      </p>
      <MediaListGroup
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
        <MarketingBadge
          label="Marketing Badge"
          value={selected.product.rating}
          size="sm"
        />
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
        data-testid={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
