import { i18nText } from '../../../utils/i18n/i18n-text';
import { formatCode } from '../../../utils/format/format-code';
import { i18nName } from '../../../utils/i18n/i18n-name';
import { LayoutCard } from '../card/layout-card';
import type { LayoutTileProps } from './layout-tile.types';
import { resolveLayoutTileStyle } from './layout-tile-variants';

export function LayoutTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-layout-tile',
  onSelect,
  children,
}: LayoutTileProps) {
  const formatted = value === undefined ? '' : i18nText(value);
  const style = resolveLayoutTileStyle(tone, size);
  const ariaLabel = i18nName(formatCode(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-layout-tile ui-element"
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
      <LayoutCard label="Layout Card" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default LayoutTile;
