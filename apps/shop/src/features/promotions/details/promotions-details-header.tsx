import { TypographyHeader } from '../../../components/typography/header/typography-header';
import { PROMOTIONS_DETAILS_FEATURE } from './promotions-details.routes';

export interface PromotionsDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PromotionsDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: PromotionsDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROMOTIONS_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROMOTIONS_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROMOTIONS_DETAILS_FEATURE.domain} ·{' '}
          {PROMOTIONS_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyHeader label="Items" value={count} tone="info" />
        <TypographyHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROMOTIONS_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
