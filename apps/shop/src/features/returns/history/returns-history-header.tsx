import { FeedbackStat } from '../../../components/feedback/stat/feedback-stat';
import { RETURNS_HISTORY_FEATURE } from './returns-history.routes';

export interface ReturnsHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReturnsHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReturnsHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RETURNS_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{RETURNS_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {RETURNS_HISTORY_FEATURE.domain} · {RETURNS_HISTORY_FEATURE.kind}
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
          data-testid={`${RETURNS_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
