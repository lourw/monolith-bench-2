import { DataCard } from '../../../components/data/card/data-card';
import { TRACKING_SUMMARY_FEATURE } from './tracking-summary.routes';

export interface TrackingSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function TrackingSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: TrackingSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${TRACKING_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{TRACKING_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {TRACKING_SUMMARY_FEATURE.domain} · {TRACKING_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataCard label="Items" value={count} tone="info" />
        <DataCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${TRACKING_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
