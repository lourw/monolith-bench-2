import { mathCurrency } from '../../../utils/math/math-currency';
import { storageAddress } from '../../../utils/storage/storage-address';
import { asyncPhone } from '../../../utils/async/async-phone';
import { LayoutBadge } from '../../layout/badge/layout-badge';
import type { DataTileProps } from './data-tile.types';
import { resolveDataTileStyle } from './data-tile-variants';

export function DataTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-data-tile',
  onSelect,
  children,
}: DataTileProps) {
  const formatted = value === undefined ? '' : mathCurrency(value);
  const style = resolveDataTileStyle(tone, size);
  const ariaLabel = asyncPhone(storageAddress(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-data-tile ui-element"
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
      <LayoutBadge label="Layout Badge" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default DataTile;
