import { CommerceBadge } from '../../../components/commerce/badge/commerce-badge';
import { TRACKING_HISTORY_FEATURE } from './tracking-history.routes';

export interface TrackingHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function TrackingHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: TrackingHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${TRACKING_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{TRACKING_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {TRACKING_HISTORY_FEATURE.domain} · {TRACKING_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceBadge label="Items" value={count} tone="info" />
        <CommerceBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${TRACKING_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
