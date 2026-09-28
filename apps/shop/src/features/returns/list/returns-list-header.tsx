import { MarketingToolbar } from '../../../components/marketing/toolbar/marketing-toolbar';
import { RETURNS_LIST_FEATURE } from './returns-list.routes';

export interface ReturnsListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReturnsListHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReturnsListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RETURNS_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{RETURNS_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {RETURNS_LIST_FEATURE.domain} · {RETURNS_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingToolbar label="Items" value={count} tone="info" />
        <MarketingToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RETURNS_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
