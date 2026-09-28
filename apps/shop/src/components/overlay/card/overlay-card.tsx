import { storagePercent } from '../../../utils/storage/storage-percent';
import { formatCode } from '../../../utils/format/format-code';
import { CoreTile } from '../../core/tile/core-tile';
import type { OverlayCardProps } from './overlay-card.types';
import { resolveOverlayCardStyle } from './overlay-card-variants';

export function OverlayCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-overlay-card',
  onSelect,
  children,
}: OverlayCardProps) {
  const formatted = value === undefined ? '' : storagePercent(value);
  const style = resolveOverlayCardStyle(tone, size);
  const ariaLabel = formatCode(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-overlay-card ui-element"
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

export default OverlayCard;
