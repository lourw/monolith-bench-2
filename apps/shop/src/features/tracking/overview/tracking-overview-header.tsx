import { FormsList } from '../../../components/forms/list/forms-list';
import { TRACKING_OVERVIEW_FEATURE } from './tracking-overview.routes';

export interface TrackingOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function TrackingOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: TrackingOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${TRACKING_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{TRACKING_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {TRACKING_OVERVIEW_FEATURE.domain} · {TRACKING_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsList label="Items" value={count} tone="info" />
        <FormsList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${TRACKING_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
