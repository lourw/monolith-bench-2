import { MarketingTile } from '../../../components/marketing/tile/marketing-tile';
import { INVENTORY_OVERVIEW_FEATURE } from './inventory-overview.routes';

export interface InventoryOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function InventoryOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: InventoryOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${INVENTORY_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{INVENTORY_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {INVENTORY_OVERVIEW_FEATURE.domain} ·{' '}
          {INVENTORY_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingTile label="Items" value={count} tone="info" />
        <MarketingTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${INVENTORY_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
