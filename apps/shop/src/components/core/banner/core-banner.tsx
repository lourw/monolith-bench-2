import { validateAddress } from '../../../utils/validate/validate-address';
import type { CoreBannerProps } from './core-banner.types';
import { resolveCoreBannerStyle } from './core-banner-variants';

export function CoreBanner({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-core-banner',
  onSelect,
  children,
}: CoreBannerProps) {
  const formatted = value === undefined ? '' : validateAddress(value);
  const style = resolveCoreBannerStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-core-banner ui-element"
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

export default CoreBanner;
