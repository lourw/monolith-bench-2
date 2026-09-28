import { validatePercent } from '../../../utils/validate/validate-percent';
import type { MediaTileProps } from './media-tile.types';
import { resolveMediaTileStyle } from './media-tile-variants';

export function MediaTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-media-tile',
  onSelect,
  children,
}: MediaTileProps) {
  const formatted = value === undefined ? '' : validatePercent(value);
  const style = resolveMediaTileStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-media-tile ui-element"
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

export default MediaTile;
