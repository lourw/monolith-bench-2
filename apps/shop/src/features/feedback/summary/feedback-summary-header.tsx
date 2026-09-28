import { CoreTile } from '../../../components/core/tile/core-tile';
import { FEEDBACK_SUMMARY_FEATURE } from './feedback-summary.routes';

export interface FeedbackSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function FeedbackSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: FeedbackSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${FEEDBACK_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{FEEDBACK_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {FEEDBACK_SUMMARY_FEATURE.domain} · {FEEDBACK_SUMMARY_FEATURE.kind}
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
          data-testid={`${FEEDBACK_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
