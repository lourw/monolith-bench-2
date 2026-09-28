import { CommerceToolbarGroup } from '../../../components/commerce/toolbar/commerce-toolbar-group';
import { CoreChip } from '../../../components/core/chip/core-chip';
import { FeedbackBadge } from '../../../components/feedback/badge/feedback-badge';
import type { AuthDetailsItem } from './auth-details.model';
import { AUTH_DETAILS_FEATURE } from './auth-details.routes';
import { describeAuthDetailsItem } from './auth-details.utils';

export interface AuthDetailsPanelProps {
  selected: AuthDetailsItem | null;
  onClear: () => void;
}

export function AuthDetailsPanel({ selected, onClear }: AuthDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${AUTH_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${AUTH_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${AUTH_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAuthDetailsItem(selected)}
      </p>
      <CommerceToolbarGroup
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
        <CoreChip label="Core Chip" value={selected.product.rating} size="sm" />
        <FeedbackBadge
          label="Feedback Badge"
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
        data-testid={`${AUTH_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
