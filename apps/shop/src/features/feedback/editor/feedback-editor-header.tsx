import { CoreToolbar } from '../../../components/core/toolbar/core-toolbar';
import { FEEDBACK_EDITOR_FEATURE } from './feedback-editor.routes';

export interface FeedbackEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function FeedbackEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: FeedbackEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${FEEDBACK_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{FEEDBACK_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {FEEDBACK_EDITOR_FEATURE.domain} · {FEEDBACK_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreToolbar label="Items" value={count} tone="info" />
        <CoreToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${FEEDBACK_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
