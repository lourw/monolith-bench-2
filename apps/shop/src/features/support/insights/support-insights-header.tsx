import { TypographyTile } from '../../../components/typography/tile/typography-tile';
import { SUPPORT_INSIGHTS_FEATURE } from './support-insights.routes';

export interface SupportInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SupportInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: SupportInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUPPORT_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUPPORT_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUPPORT_INSIGHTS_FEATURE.domain} · {SUPPORT_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyTile label="Items" value={count} tone="info" />
        <TypographyTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUPPORT_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
