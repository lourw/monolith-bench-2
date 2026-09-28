import { i18nName } from '../../../utils/i18n/i18n-name';
import { validateSlug } from '../../../utils/validate/validate-slug';
import { storageCurrency } from '../../../utils/storage/storage-currency';
import { CoreBanner } from '../../core/banner/core-banner';
import type { OverlayBannerProps } from './overlay-banner.types';
import { resolveOverlayBannerStyle } from './overlay-banner-variants';

export function OverlayBanner({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-overlay-banner',
  onSelect,
  children,
}: OverlayBannerProps) {
  const formatted = value === undefined ? '' : i18nName(value);
  const style = resolveOverlayBannerStyle(tone, size);
  const ariaLabel = storageCurrency(validateSlug(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-overlay-banner ui-element"
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
      <CoreBanner label="Core Banner" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default OverlayBanner;
