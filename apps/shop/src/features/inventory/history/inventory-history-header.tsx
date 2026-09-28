import { NavigationStat } from '../../../components/navigation/stat/navigation-stat';
import { INVENTORY_HISTORY_FEATURE } from './inventory-history.routes';

export interface InventoryHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function InventoryHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: InventoryHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${INVENTORY_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{INVENTORY_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {INVENTORY_HISTORY_FEATURE.domain} · {INVENTORY_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationStat label="Items" value={count} tone="info" />
        <NavigationStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${INVENTORY_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
