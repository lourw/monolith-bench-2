import { formatDate } from '../../../utils/format/format-date';
import { collectionAddress } from '../../../utils/collection/collection-address';
import { formatText } from '../../../utils/format/format-text';
import type { LayoutBannerProps } from './layout-banner.types';
import { resolveLayoutBannerStyle } from './layout-banner-variants';

export function LayoutBanner({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-layout-banner',
  onSelect,
  children,
}: LayoutBannerProps) {
  const formatted = value === undefined ? '' : formatDate(value);
  const style = resolveLayoutBannerStyle(tone, size);
  const ariaLabel = formatText(collectionAddress(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-layout-banner ui-element"
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

export default LayoutBanner;
