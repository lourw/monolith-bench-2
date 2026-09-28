import { CoreCard } from '../../../components/core/card/core-card';
import { RETURNS_OVERVIEW_FEATURE } from './returns-overview.routes';

export interface ReturnsOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReturnsOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReturnsOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RETURNS_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{RETURNS_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {RETURNS_OVERVIEW_FEATURE.domain} · {RETURNS_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreCard label="Items" value={count} tone="info" />
        <CoreCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RETURNS_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
