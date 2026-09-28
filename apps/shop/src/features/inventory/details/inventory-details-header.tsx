import { FormsTile } from '../../../components/forms/tile/forms-tile';
import { INVENTORY_DETAILS_FEATURE } from './inventory-details.routes';

export interface InventoryDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function InventoryDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: InventoryDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${INVENTORY_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{INVENTORY_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {INVENTORY_DETAILS_FEATURE.domain} · {INVENTORY_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsTile label="Items" value={count} tone="info" />
        <FormsTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${INVENTORY_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
