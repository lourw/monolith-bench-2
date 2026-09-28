import { MarketingHeaderGroup } from '../../../components/marketing/header/marketing-header-group';
import type { ReviewsDetailsItem } from './reviews-details.model';
import { REVIEWS_DETAILS_FEATURE } from './reviews-details.routes';
import { describeReviewsDetailsItem } from './reviews-details.utils';

export interface ReviewsDetailsPanelProps {
  selected: ReviewsDetailsItem | null;
  onClear: () => void;
}

export function ReviewsDetailsPanel({
  selected,
  onClear,
}: ReviewsDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${REVIEWS_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${REVIEWS_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${REVIEWS_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeReviewsDetailsItem(selected)}
      </p>
      <MarketingHeaderGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra"></div>
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
        data-testid={`${REVIEWS_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
