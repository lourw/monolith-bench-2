import { formatNumber } from '../../../utils/format/format-number';
import type { MediaBannerProps } from './media-banner.types';
import { resolveMediaBannerStyle } from './media-banner-variants';

export function MediaBanner({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-media-banner',
  onSelect,
  children,
}: MediaBannerProps) {
  const formatted = value === undefined ? '' : formatNumber(value);
  const style = resolveMediaBannerStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-media-banner ui-element"
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

export default MediaBanner;
