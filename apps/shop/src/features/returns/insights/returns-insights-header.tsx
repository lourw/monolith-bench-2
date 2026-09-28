import { TypographyCard } from '../../../components/typography/card/typography-card';
import { RETURNS_INSIGHTS_FEATURE } from './returns-insights.routes';

export interface ReturnsInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReturnsInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReturnsInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RETURNS_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{RETURNS_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {RETURNS_INSIGHTS_FEATURE.domain} · {RETURNS_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyCard label="Items" value={count} tone="info" />
        <TypographyCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RETURNS_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
