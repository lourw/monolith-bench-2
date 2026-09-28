import { mathPhone } from '../../../utils/math/math-phone';
import { OverlayCard } from '../../overlay/card/overlay-card';
import type { TypographyBannerProps } from './typography-banner.types';
import { resolveTypographyBannerStyle } from './typography-banner-variants';

export function TypographyBanner({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-typography-banner',
  onSelect,
  children,
}: TypographyBannerProps) {
  const formatted = value === undefined ? '' : mathPhone(value);
  const style = resolveTypographyBannerStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-typography-banner ui-element"
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
      <OverlayCard label="Overlay Card" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default TypographyBanner;
