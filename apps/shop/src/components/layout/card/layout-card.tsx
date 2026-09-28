import { formatName } from '../../../utils/format/format-name';
import { validateSlug } from '../../../utils/validate/validate-slug';
import { CoreCard } from '../../core/card/core-card';
import type { LayoutCardProps } from './layout-card.types';
import { resolveLayoutCardStyle } from './layout-card-variants';

export function LayoutCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-layout-card',
  onSelect,
  children,
}: LayoutCardProps) {
  const formatted = value === undefined ? '' : formatName(value);
  const style = resolveLayoutCardStyle(tone, size);
  const ariaLabel = validateSlug(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-layout-card ui-element"
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
      <CoreCard label="Core Card" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default LayoutCard;
