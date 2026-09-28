import { MarketingTile } from '../../../components/marketing/tile/marketing-tile';
import { RECOMMENDATIONS_EDITOR_FEATURE } from './recommendations-editor.routes';

export interface RecommendationsEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function RecommendationsEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: RecommendationsEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {RECOMMENDATIONS_EDITOR_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {RECOMMENDATIONS_EDITOR_FEATURE.domain} ·{' '}
          {RECOMMENDATIONS_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingTile label="Items" value={count} tone="info" />
        <MarketingTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
