import { mathSlug } from '../../../utils/math/math-slug';
import { mathText } from '../../../utils/math/math-text';
import { FormsChip } from '../../forms/chip/forms-chip';
import type { MediaHeaderProps } from './media-header.types';
import { resolveMediaHeaderStyle } from './media-header-variants';

export function MediaHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-media-header',
  onSelect,
  children,
}: MediaHeaderProps) {
  const formatted = value === undefined ? '' : mathSlug(value);
  const style = resolveMediaHeaderStyle(tone, size);
  const ariaLabel = mathText(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-media-header ui-element"
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
      <FormsChip label="Forms Chip" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default MediaHeader;
