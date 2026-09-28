import { MediaList } from '../../../components/media/list/media-list';
import { ORDERS_HISTORY_FEATURE } from './orders-history.routes';

export interface OrdersHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function OrdersHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: OrdersHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ORDERS_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ORDERS_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ORDERS_HISTORY_FEATURE.domain} · {ORDERS_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaList label="Items" value={count} tone="info" />
        <MediaList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ORDERS_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
