import { CommerceCardGroup } from '../../../components/commerce/card/commerce-card-group';
import { OverlayHeader } from '../../../components/overlay/header/overlay-header';
import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import type { NotificationsOverviewItem } from './notifications-overview.model';
import { NOTIFICATIONS_OVERVIEW_FEATURE } from './notifications-overview.routes';
import { describeNotificationsOverviewItem } from './notifications-overview.utils';

export interface NotificationsOverviewPanelProps {
  selected: NotificationsOverviewItem | null;
  onClear: () => void;
}

export function NotificationsOverviewPanel({
  selected,
  onClear,
}: NotificationsOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-panel`}
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
      data-testid={`${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeNotificationsOverviewItem(selected)}
      </p>
      <CommerceCardGroup
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
        <OverlayHeader
          label="Overlay Header"
          value={selected.product.rating}
          size="sm"
        />
        <FormsBadge
          label="Forms Badge"
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
        data-testid={`${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
