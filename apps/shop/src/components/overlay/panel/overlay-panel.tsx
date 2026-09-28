import { formatPercent } from '../../../utils/format/format-percent';
import { collectionNumber } from '../../../utils/collection/collection-number';
import { CoreBanner } from '../../core/banner/core-banner';
import type { OverlayPanelProps } from './overlay-panel.types';
import { resolveOverlayPanelStyle } from './overlay-panel-variants';

export function OverlayPanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-overlay-panel',
  onSelect,
  children,
}: OverlayPanelProps) {
  const formatted = value === undefined ? '' : formatPercent(value);
  const style = resolveOverlayPanelStyle(tone, size);
  const ariaLabel = collectionNumber(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-overlay-panel ui-element"
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
      <CoreBanner label="Core Banner" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default OverlayPanel;
