import { CoreTile } from '../../../components/core/tile/core-tile';
import { ORDERS_EDITOR_FEATURE } from './orders-editor.routes';

export interface OrdersEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function OrdersEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: OrdersEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ORDERS_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ORDERS_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ORDERS_EDITOR_FEATURE.domain} · {ORDERS_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreTile label="Items" value={count} tone="info" />
        <CoreTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ORDERS_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
