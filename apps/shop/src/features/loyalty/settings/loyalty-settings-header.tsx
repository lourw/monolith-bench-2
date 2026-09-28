import { TypographyTile } from '../../../components/typography/tile/typography-tile';
import { LOYALTY_SETTINGS_FEATURE } from './loyalty-settings.routes';

export interface LoyaltySettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function LoyaltySettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: LoyaltySettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${LOYALTY_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{LOYALTY_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {LOYALTY_SETTINGS_FEATURE.domain} · {LOYALTY_SETTINGS_FEATURE.kind}
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
          data-testid={`${LOYALTY_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
