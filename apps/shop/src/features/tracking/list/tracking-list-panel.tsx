import { DataBannerGroup } from '../../../components/data/banner/data-banner-group';
import type { TrackingListItem } from './tracking-list.model';
import { TRACKING_LIST_FEATURE } from './tracking-list.routes';
import { describeTrackingListItem } from './tracking-list.utils';

export interface TrackingListPanelProps {
  selected: TrackingListItem | null;
  onClear: () => void;
}

export function TrackingListPanel({
  selected,
  onClear,
}: TrackingListPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${TRACKING_LIST_FEATURE.testId}-panel`}
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
      data-testid={`${TRACKING_LIST_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${TRACKING_LIST_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeTrackingListItem(selected)}
      </p>
      <DataBannerGroup
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
        data-testid={`${TRACKING_LIST_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
