import { NavigationTile } from '../../../components/navigation/tile/navigation-tile';
import { LOYALTY_EDITOR_FEATURE } from './loyalty-editor.routes';

export interface LoyaltyEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function LoyaltyEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: LoyaltyEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${LOYALTY_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{LOYALTY_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {LOYALTY_EDITOR_FEATURE.domain} · {LOYALTY_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationTile label="Items" value={count} tone="info" />
        <NavigationTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${LOYALTY_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
