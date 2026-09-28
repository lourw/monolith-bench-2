import { i18nPhone } from '../../../utils/i18n/i18n-phone';
import { asyncDate } from '../../../utils/async/async-date';
import { i18nText } from '../../../utils/i18n/i18n-text';
import type { MarketingBannerProps } from './marketing-banner.types';
import { resolveMarketingBannerStyle } from './marketing-banner-variants';

export function MarketingBanner({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-marketing-banner',
  onSelect,
  children,
}: MarketingBannerProps) {
  const formatted = value === undefined ? '' : i18nPhone(value);
  const style = resolveMarketingBannerStyle(tone, size);
  const ariaLabel = i18nText(asyncDate(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-marketing-banner ui-element"
      data-testid={testId}
      data-tone={tone}
      data-size={size}
      style={style}
      aria-label={ariaLabel}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect ? handleClick : undefined}
    >
      <span className="ui-label">{label}</span>
      {formatted ? <span className="ui-value">{formatted}</span> : null}
      {children ? <div className="ui-content">{children}</div> : null}
    </div>
  );
}

export default MarketingBanner;
