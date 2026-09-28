import { collectionCurrency } from '../../../utils/collection/collection-currency';
import { collectionText } from '../../../utils/collection/collection-text';
import { i18nCode } from '../../../utils/i18n/i18n-code';
import type { OverlayTileProps } from './overlay-tile.types';
import { resolveOverlayTileStyle } from './overlay-tile-variants';

export function OverlayTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-overlay-tile',
  onSelect,
  children,
}: OverlayTileProps) {
  const formatted = value === undefined ? '' : collectionCurrency(value);
  const style = resolveOverlayTileStyle(tone, size);
  const ariaLabel = i18nCode(collectionText(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-overlay-tile ui-element"
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

export default OverlayTile;
