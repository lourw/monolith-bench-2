import { mathName } from '../../../utils/math/math-name';
import { mathNumber } from '../../../utils/math/math-number';
import { MediaStat } from '../../media/stat/media-stat';
import type { TypographyChipProps } from './typography-chip.types';
import { resolveTypographyChipStyle } from './typography-chip-variants';

export function TypographyChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-typography-chip',
  onSelect,
  children,
}: TypographyChipProps) {
  const formatted = value === undefined ? '' : mathName(value);
  const style = resolveTypographyChipStyle(tone, size);
  const ariaLabel = mathNumber(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-typography-chip ui-element"
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
      <MediaStat label="Media Stat" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default TypographyChip;
