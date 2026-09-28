import { MediaToolbar } from '../../../components/media/toolbar/media-toolbar';
import { FEEDBACK_HISTORY_FEATURE } from './feedback-history.routes';

export interface FeedbackHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function FeedbackHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: FeedbackHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${FEEDBACK_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{FEEDBACK_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {FEEDBACK_HISTORY_FEATURE.domain} · {FEEDBACK_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaToolbar label="Items" value={count} tone="info" />
        <MediaToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${FEEDBACK_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
