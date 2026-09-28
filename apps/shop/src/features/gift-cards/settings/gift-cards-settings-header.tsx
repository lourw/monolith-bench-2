import { TypographyPanel } from '../../../components/typography/panel/typography-panel';
import { GIFT_CARDS_SETTINGS_FEATURE } from './gift-cards-settings.routes';

export interface GiftCardsSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function GiftCardsSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: GiftCardsSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${GIFT_CARDS_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{GIFT_CARDS_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {GIFT_CARDS_SETTINGS_FEATURE.domain} ·{' '}
          {GIFT_CARDS_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyPanel label="Items" value={count} tone="info" />
        <TypographyPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${GIFT_CARDS_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
