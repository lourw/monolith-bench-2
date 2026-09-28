import { formatNumber } from '../../../utils/format/format-number';
import type { OverlayStatProps } from './overlay-stat.types';
import { resolveOverlayStatStyle } from './overlay-stat-variants';

export function OverlayStat({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-overlay-stat',
  onSelect,
  children,
}: OverlayStatProps) {
  const formatted = value === undefined ? '' : formatNumber(value);
  const style = resolveOverlayStatStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-overlay-stat ui-element"
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

export default OverlayStat;
