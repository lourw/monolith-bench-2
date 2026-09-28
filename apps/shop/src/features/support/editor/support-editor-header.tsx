import { ChartsCard } from '../../../components/charts/card/charts-card';
import { SUPPORT_EDITOR_FEATURE } from './support-editor.routes';

export interface SupportEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SupportEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: SupportEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUPPORT_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUPPORT_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUPPORT_EDITOR_FEATURE.domain} · {SUPPORT_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsCard label="Items" value={count} tone="info" />
        <ChartsCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUPPORT_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
