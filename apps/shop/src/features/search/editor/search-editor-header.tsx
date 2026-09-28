import { FormsCard } from '../../../components/forms/card/forms-card';
import { SEARCH_EDITOR_FEATURE } from './search-editor.routes';

export interface SearchEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SearchEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: SearchEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SEARCH_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SEARCH_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SEARCH_EDITOR_FEATURE.domain} · {SEARCH_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsCard label="Items" value={count} tone="info" />
        <FormsCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SEARCH_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
