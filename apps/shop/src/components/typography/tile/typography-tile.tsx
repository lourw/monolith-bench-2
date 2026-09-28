import { formatNumber } from '../../../utils/format/format-number';
import { mathName } from '../../../utils/math/math-name';
import { validateText } from '../../../utils/validate/validate-text';
import { CoreTile } from '../../core/tile/core-tile';
import type { TypographyTileProps } from './typography-tile.types';
import { resolveTypographyTileStyle } from './typography-tile-variants';

export function TypographyTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-typography-tile',
  onSelect,
  children,
}: TypographyTileProps) {
  const formatted = value === undefined ? '' : formatNumber(value);
  const style = resolveTypographyTileStyle(tone, size);
  const ariaLabel = validateText(mathName(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-typography-tile ui-element"
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
      <CoreTile label="Core Tile" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default TypographyTile;
