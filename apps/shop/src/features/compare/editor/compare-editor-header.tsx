import { MediaTile } from '../../../components/media/tile/media-tile';
import { COMPARE_EDITOR_FEATURE } from './compare-editor.routes';

export interface CompareEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CompareEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: CompareEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${COMPARE_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{COMPARE_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {COMPARE_EDITOR_FEATURE.domain} · {COMPARE_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaTile label="Items" value={count} tone="info" />
        <MediaTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${COMPARE_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
