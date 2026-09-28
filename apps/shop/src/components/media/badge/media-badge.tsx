import { formatCurrency } from '../../../utils/format/format-currency';
import { validateText } from '../../../utils/validate/validate-text';
import type { MediaBadgeProps } from './media-badge.types';
import { resolveMediaBadgeStyle } from './media-badge-variants';

export function MediaBadge({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-media-badge',
  onSelect,
  children,
}: MediaBadgeProps) {
  const formatted = value === undefined ? '' : formatCurrency(value);
  const style = resolveMediaBadgeStyle(tone, size);
  const ariaLabel = validateText(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-media-badge ui-element"
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

export default MediaBadge;
