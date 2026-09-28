import { TypographyTile } from '../../../components/typography/tile/typography-tile';
import { SUBSCRIPTIONS_SETTINGS_FEATURE } from './subscriptions-settings.routes';

export interface SubscriptionsSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SubscriptionsSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: SubscriptionsSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUBSCRIPTIONS_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {SUBSCRIPTIONS_SETTINGS_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {SUBSCRIPTIONS_SETTINGS_FEATURE.domain} ·{' '}
          {SUBSCRIPTIONS_SETTINGS_FEATURE.kind}
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
          data-testid={`${SUBSCRIPTIONS_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
