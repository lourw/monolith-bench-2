import { TypographyToolbar } from '../../../components/typography/toolbar/typography-toolbar';
import { SEARCH_SETTINGS_FEATURE } from './search-settings.routes';

export interface SearchSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SearchSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: SearchSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SEARCH_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SEARCH_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SEARCH_SETTINGS_FEATURE.domain} · {SEARCH_SETTINGS_FEATURE.kind}
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
          data-testid={`${SEARCH_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
