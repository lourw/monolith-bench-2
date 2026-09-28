import { FeedbackStat } from '../../../components/feedback/stat/feedback-stat';
import { PREORDERS_SUMMARY_FEATURE } from './preorders-summary.routes';

export interface PreordersSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PreordersSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: PreordersSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PREORDERS_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PREORDERS_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PREORDERS_SUMMARY_FEATURE.domain} · {PREORDERS_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackStat label="Items" value={count} tone="info" />
        <FeedbackStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PREORDERS_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
