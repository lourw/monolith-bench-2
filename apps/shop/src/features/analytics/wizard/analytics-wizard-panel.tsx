import { LayoutCardGroup } from '../../../components/layout/card/layout-card-group';
import { TypographyStat } from '../../../components/typography/stat/typography-stat';
import { MediaBanner } from '../../../components/media/banner/media-banner';
import type { AnalyticsWizardItem } from './analytics-wizard.model';
import { ANALYTICS_WIZARD_FEATURE } from './analytics-wizard.routes';
import { describeAnalyticsWizardItem } from './analytics-wizard.utils';

export interface AnalyticsWizardPanelProps {
  selected: AnalyticsWizardItem | null;
  onClear: () => void;
}

export function AnalyticsWizardPanel({
  selected,
  onClear,
}: AnalyticsWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ANALYTICS_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${ANALYTICS_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ANALYTICS_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAnalyticsWizardItem(selected)}
      </p>
      <LayoutCardGroup
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
        <TypographyStat
          label="Typography Stat"
          value={selected.product.rating}
          size="sm"
        />
        <MediaBanner
          label="Media Banner"
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
        data-testid={`${ANALYTICS_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
