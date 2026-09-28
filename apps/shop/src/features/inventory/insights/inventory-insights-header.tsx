import { TypographyHeader } from '../../../components/typography/header/typography-header';
import { INVENTORY_INSIGHTS_FEATURE } from './inventory-insights.routes';

export interface InventoryInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function InventoryInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: InventoryInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${INVENTORY_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{INVENTORY_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {INVENTORY_INSIGHTS_FEATURE.domain} ·{' '}
          {INVENTORY_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyHeader label="Items" value={count} tone="info" />
        <TypographyHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${INVENTORY_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
