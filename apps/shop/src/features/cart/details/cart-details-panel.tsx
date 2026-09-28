import { FeedbackToolbarGroup } from '../../../components/feedback/toolbar/feedback-toolbar-group';
import { MediaStat } from '../../../components/media/stat/media-stat';
import { OverlayChip } from '../../../components/overlay/chip/overlay-chip';
import type { CartDetailsItem } from './cart-details.model';
import { CART_DETAILS_FEATURE } from './cart-details.routes';
import { describeCartDetailsItem } from './cart-details.utils';

export interface CartDetailsPanelProps {
  selected: CartDetailsItem | null;
  onClear: () => void;
}

export function CartDetailsPanel({ selected, onClear }: CartDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CART_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${CART_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CART_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCartDetailsItem(selected)}
      </p>
      <FeedbackToolbarGroup
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
        <MediaStat
          label="Media Stat"
          value={selected.product.rating}
          size="sm"
        />
        <OverlayChip
          label="Overlay Chip"
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
        data-testid={`${CART_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
