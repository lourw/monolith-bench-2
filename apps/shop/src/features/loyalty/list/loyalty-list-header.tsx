import { TypographyToolbar } from '../../../components/typography/toolbar/typography-toolbar';
import { LOYALTY_LIST_FEATURE } from './loyalty-list.routes';

export interface LoyaltyListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function LoyaltyListHeader({
  count,
  total,
  loading,
  onRefresh,
}: LoyaltyListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${LOYALTY_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{LOYALTY_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {LOYALTY_LIST_FEATURE.domain} · {LOYALTY_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyToolbar label="Items" value={count} tone="info" />
        <TypographyToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${LOYALTY_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
