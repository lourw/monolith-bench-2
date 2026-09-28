import { TypographyStat } from '../../../components/typography/stat/typography-stat';
import { PREORDERS_EDITOR_FEATURE } from './preorders-editor.routes';

export interface PreordersEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PreordersEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: PreordersEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PREORDERS_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PREORDERS_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PREORDERS_EDITOR_FEATURE.domain} · {PREORDERS_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyStat label="Items" value={count} tone="info" />
        <TypographyStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PREORDERS_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
