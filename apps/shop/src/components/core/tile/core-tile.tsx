import { collectionText } from '../../../utils/collection/collection-text';
import { storageName } from '../../../utils/storage/storage-name';
import { CorePanel } from '../panel/core-panel';
import type { CoreTileProps } from './core-tile.types';
import { resolveCoreTileStyle } from './core-tile-variants';

export function CoreTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-core-tile',
  onSelect,
  children,
}: CoreTileProps) {
  const formatted = value === undefined ? '' : collectionText(value);
  const style = resolveCoreTileStyle(tone, size);
  const ariaLabel = storageName(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-core-tile ui-element"
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
      <CorePanel label="Core Panel" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default CoreTile;
