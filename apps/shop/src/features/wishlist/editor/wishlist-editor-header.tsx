import { CorePanel } from '../../../components/core/panel/core-panel';
import { WISHLIST_EDITOR_FEATURE } from './wishlist-editor.routes';

export interface WishlistEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function WishlistEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: WishlistEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${WISHLIST_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{WISHLIST_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {WISHLIST_EDITOR_FEATURE.domain} · {WISHLIST_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CorePanel label="Items" value={count} tone="info" />
        <CorePanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${WISHLIST_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
