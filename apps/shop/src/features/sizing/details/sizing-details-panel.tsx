import { FeedbackBannerGroup } from '../../../components/feedback/banner/feedback-banner-group';
import type { SizingDetailsItem } from './sizing-details.model';
import { SIZING_DETAILS_FEATURE } from './sizing-details.routes';
import { describeSizingDetailsItem } from './sizing-details.utils';

export interface SizingDetailsPanelProps {
  selected: SizingDetailsItem | null;
  onClear: () => void;
}

export function SizingDetailsPanel({
  selected,
  onClear,
}: SizingDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${SIZING_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${SIZING_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${SIZING_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeSizingDetailsItem(selected)}
      </p>
      <FeedbackBannerGroup
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
        data-testid={`${SIZING_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
