import { storageText } from '../../../utils/storage/storage-text';
import { CoreTile } from '../../core/tile/core-tile';
import type { ChartsToolbarProps } from './charts-toolbar.types';
import { resolveChartsToolbarStyle } from './charts-toolbar-variants';

export function ChartsToolbar({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-charts-toolbar',
  onSelect,
  children,
}: ChartsToolbarProps) {
  const formatted = value === undefined ? '' : storageText(value);
  const style = resolveChartsToolbarStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-charts-toolbar ui-element"
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

export default ChartsToolbar;
