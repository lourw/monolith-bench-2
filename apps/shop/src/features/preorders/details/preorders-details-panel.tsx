import { OverlayPanelGroup } from '../../../components/overlay/panel/overlay-panel-group';
import { NavigationHeader } from '../../../components/navigation/header/navigation-header';
import { TypographyStat } from '../../../components/typography/stat/typography-stat';
import type { PreordersDetailsItem } from './preorders-details.model';
import { PREORDERS_DETAILS_FEATURE } from './preorders-details.routes';
import { describePreordersDetailsItem } from './preorders-details.utils';

export interface PreordersDetailsPanelProps {
  selected: PreordersDetailsItem | null;
  onClear: () => void;
}

export function PreordersDetailsPanel({
  selected,
  onClear,
}: PreordersDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PREORDERS_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${PREORDERS_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PREORDERS_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describePreordersDetailsItem(selected)}
      </p>
      <OverlayPanelGroup
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
        <NavigationHeader
          label="Navigation Header"
          value={selected.product.rating}
          size="sm"
        />
        <TypographyStat
          label="Typography Stat"
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
        data-testid={`${PREORDERS_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
