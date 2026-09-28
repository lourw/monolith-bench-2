import { mathDate } from '../../../utils/math/math-date';
import { asyncText } from '../../../utils/async/async-text';
import { asyncSlug } from '../../../utils/async/async-slug';
import { CoreStat } from '../../core/stat/core-stat';
import type { LayoutPanelProps } from './layout-panel.types';
import { resolveLayoutPanelStyle } from './layout-panel-variants';

export function LayoutPanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-layout-panel',
  onSelect,
  children,
}: LayoutPanelProps) {
  const formatted = value === undefined ? '' : mathDate(value);
  const style = resolveLayoutPanelStyle(tone, size);
  const ariaLabel = asyncSlug(asyncText(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-layout-panel ui-element"
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
      <CoreStat label="Core Stat" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default LayoutPanel;
