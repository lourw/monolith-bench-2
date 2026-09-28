import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import type { ChartsTileProps } from './charts-tile.types';
import { resolveChartsTileStyle } from './charts-tile-variants';

export function ChartsTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-charts-tile',
  onSelect,
  children,
}: ChartsTileProps) {
  const formatted = value === undefined ? '' : i18nSlug(value);
  const style = resolveChartsTileStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-charts-tile ui-element"
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

export default ChartsTile;
