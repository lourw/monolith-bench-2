import { FeedbackPanel } from '../../../components/feedback/panel/feedback-panel';
import { ANALYTICS_EDITOR_FEATURE } from './analytics-editor.routes';

export interface AnalyticsEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AnalyticsEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: AnalyticsEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ANALYTICS_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ANALYTICS_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ANALYTICS_EDITOR_FEATURE.domain} · {ANALYTICS_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackPanel label="Items" value={count} tone="info" />
        <FeedbackPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ANALYTICS_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
