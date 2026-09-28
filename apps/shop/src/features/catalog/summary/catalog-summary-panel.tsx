import { MarketingToolbarGroup } from '../../../components/marketing/toolbar/marketing-toolbar-group';
import { MarketingBanner } from '../../../components/marketing/banner/marketing-banner';
import type { CatalogSummaryItem } from './catalog-summary.model';
import { CATALOG_SUMMARY_FEATURE } from './catalog-summary.routes';
import { describeCatalogSummaryItem } from './catalog-summary.utils';

export interface CatalogSummaryPanelProps {
  selected: CatalogSummaryItem | null;
  onClear: () => void;
}

export function CatalogSummaryPanel({
  selected,
  onClear,
}: CatalogSummaryPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${CATALOG_SUMMARY_FEATURE.testId}-panel`}
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
      data-testid={`${CATALOG_SUMMARY_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${CATALOG_SUMMARY_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeCatalogSummaryItem(selected)}
      </p>
      <MarketingToolbarGroup
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
        <MarketingBanner
          label="Marketing Banner"
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
        data-testid={`${CATALOG_SUMMARY_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
