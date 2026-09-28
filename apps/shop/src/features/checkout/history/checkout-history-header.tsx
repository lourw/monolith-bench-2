import { MediaBadge } from '../../../components/media/badge/media-badge';
import { CHECKOUT_HISTORY_FEATURE } from './checkout-history.routes';

export interface CheckoutHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CheckoutHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: CheckoutHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CHECKOUT_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CHECKOUT_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CHECKOUT_HISTORY_FEATURE.domain} · {CHECKOUT_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaBadge label="Items" value={count} tone="info" />
        <MediaBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CHECKOUT_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
