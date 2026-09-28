import { MarketingPanel } from '../../../components/marketing/panel/marketing-panel';
import { INVENTORY_LIST_FEATURE } from './inventory-list.routes';

export interface InventoryListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function InventoryListHeader({
  count,
  total,
  loading,
  onRefresh,
}: InventoryListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${INVENTORY_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{INVENTORY_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {INVENTORY_LIST_FEATURE.domain} · {INVENTORY_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingPanel label="Items" value={count} tone="info" />
        <MarketingPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${INVENTORY_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
