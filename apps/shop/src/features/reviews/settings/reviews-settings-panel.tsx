import { LayoutStatGroup } from '../../../components/layout/stat/layout-stat-group';
import { MarketingList } from '../../../components/marketing/list/marketing-list';
import { InputsCard } from '../../../components/inputs/card/inputs-card';
import type { ReviewsSettingsItem } from './reviews-settings.model';
import { REVIEWS_SETTINGS_FEATURE } from './reviews-settings.routes';
import { describeReviewsSettingsItem } from './reviews-settings.utils';

export interface ReviewsSettingsPanelProps {
  selected: ReviewsSettingsItem | null;
  onClear: () => void;
}

export function ReviewsSettingsPanel({
  selected,
  onClear,
}: ReviewsSettingsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${REVIEWS_SETTINGS_FEATURE.testId}-panel`}
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
      data-testid={`${REVIEWS_SETTINGS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${REVIEWS_SETTINGS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeReviewsSettingsItem(selected)}
      </p>
      <LayoutStatGroup
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
        <MarketingList
          label="Marketing List"
          value={selected.product.rating}
          size="sm"
        />
        <InputsCard
          label="Inputs Card"
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
        data-testid={`${REVIEWS_SETTINGS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
