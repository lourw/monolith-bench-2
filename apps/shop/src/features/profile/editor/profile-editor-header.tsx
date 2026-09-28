import { MediaBadge } from '../../../components/media/badge/media-badge';
import { PROFILE_EDITOR_FEATURE } from './profile-editor.routes';

export interface ProfileEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ProfileEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: ProfileEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROFILE_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROFILE_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROFILE_EDITOR_FEATURE.domain} · {PROFILE_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaBadge label="Items" value={count} tone="info" />
        <MediaBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROFILE_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
