import { MarketingBanner } from '../../../components/marketing/banner/marketing-banner';
import { AUTH_EDITOR_FEATURE } from './auth-editor.routes';

export interface AuthEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AuthEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: AuthEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${AUTH_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{AUTH_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {AUTH_EDITOR_FEATURE.domain} · {AUTH_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingBanner label="Items" value={count} tone="info" />
        <MarketingBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${AUTH_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
