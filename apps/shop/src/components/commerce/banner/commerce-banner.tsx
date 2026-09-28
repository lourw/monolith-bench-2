import { formatDate } from '../../../utils/format/format-date';
import { formatCode } from '../../../utils/format/format-code';
import type { CommerceBannerProps } from './commerce-banner.types';
import { resolveCommerceBannerStyle } from './commerce-banner-variants';

export function CommerceBanner({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-commerce-banner',
  onSelect,
  children,
}: CommerceBannerProps) {
  const formatted = value === undefined ? '' : formatDate(value);
  const style = resolveCommerceBannerStyle(tone, size);
  const ariaLabel = formatCode(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-commerce-banner ui-element"
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

export default CommerceBanner;
