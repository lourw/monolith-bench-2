import { DataList } from '../../../components/data/list/data-list';
import { TRACKING_LIST_FEATURE } from './tracking-list.routes';

export interface TrackingListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function TrackingListHeader({
  count,
  total,
  loading,
  onRefresh,
}: TrackingListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${TRACKING_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{TRACKING_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {TRACKING_LIST_FEATURE.domain} · {TRACKING_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataList label="Items" value={count} tone="info" />
        <DataList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${TRACKING_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
