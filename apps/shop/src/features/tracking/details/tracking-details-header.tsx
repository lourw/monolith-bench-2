import { CommerceStat } from '../../../components/commerce/stat/commerce-stat';
import { TRACKING_DETAILS_FEATURE } from './tracking-details.routes';

export interface TrackingDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function TrackingDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: TrackingDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${TRACKING_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{TRACKING_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {TRACKING_DETAILS_FEATURE.domain} · {TRACKING_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceStat label="Items" value={count} tone="info" />
        <CommerceStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${TRACKING_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
