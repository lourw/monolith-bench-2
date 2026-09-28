import { OverlayStat } from '../../../components/overlay/stat/overlay-stat';
import { REVIEWS_EDITOR_FEATURE } from './reviews-editor.routes';

export interface ReviewsEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReviewsEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReviewsEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${REVIEWS_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{REVIEWS_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {REVIEWS_EDITOR_FEATURE.domain} · {REVIEWS_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <OverlayStat label="Items" value={count} tone="info" />
        <OverlayStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${REVIEWS_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
