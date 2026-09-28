import { MediaToolbar } from '../../../components/media/toolbar/media-toolbar';
import { ACCOUNT_EDITOR_FEATURE } from './account-editor.routes';

export interface AccountEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AccountEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: AccountEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ACCOUNT_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ACCOUNT_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ACCOUNT_EDITOR_FEATURE.domain} · {ACCOUNT_EDITOR_FEATURE.kind}
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
          data-testid={`${ACCOUNT_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
