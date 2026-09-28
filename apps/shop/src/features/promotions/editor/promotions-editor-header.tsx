import { ChartsPanel } from '../../../components/charts/panel/charts-panel';
import { PROMOTIONS_EDITOR_FEATURE } from './promotions-editor.routes';

export interface PromotionsEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PromotionsEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: PromotionsEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROMOTIONS_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROMOTIONS_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROMOTIONS_EDITOR_FEATURE.domain} · {PROMOTIONS_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsPanel label="Items" value={count} tone="info" />
        <ChartsPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROMOTIONS_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
