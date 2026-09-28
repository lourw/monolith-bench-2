import { formatNumber } from '../../../utils/format/format-number';
import { validateName } from '../../../utils/validate/validate-name';
import { validateNumber } from '../../../utils/validate/validate-number';
import { LayoutTile } from '../../layout/tile/layout-tile';
import type { MediaChipProps } from './media-chip.types';
import { resolveMediaChipStyle } from './media-chip-variants';

export function MediaChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-media-chip',
  onSelect,
  children,
}: MediaChipProps) {
  const formatted = value === undefined ? '' : formatNumber(value);
  const style = resolveMediaChipStyle(tone, size);
  const ariaLabel = validateNumber(validateName(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-media-chip ui-element"
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
      <LayoutTile label="Layout Tile" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default MediaChip;
