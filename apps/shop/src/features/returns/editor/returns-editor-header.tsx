import { OverlayList } from '../../../components/overlay/list/overlay-list';
import { RETURNS_EDITOR_FEATURE } from './returns-editor.routes';

export interface ReturnsEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReturnsEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReturnsEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RETURNS_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{RETURNS_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {RETURNS_EDITOR_FEATURE.domain} · {RETURNS_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <OverlayList label="Items" value={count} tone="info" />
        <OverlayList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RETURNS_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
