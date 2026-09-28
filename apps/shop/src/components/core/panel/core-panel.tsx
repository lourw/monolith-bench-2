import { asyncNumber } from '../../../utils/async/async-number';
import { mathSlug } from '../../../utils/math/math-slug';
import { validateAddress } from '../../../utils/validate/validate-address';
import type { CorePanelProps } from './core-panel.types';
import { resolveCorePanelStyle } from './core-panel-variants';

export function CorePanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-core-panel',
  onSelect,
  children,
}: CorePanelProps) {
  const formatted = value === undefined ? '' : asyncNumber(value);
  const style = resolveCorePanelStyle(tone, size);
  const ariaLabel = validateAddress(mathSlug(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-core-panel ui-element"
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

export default CorePanel;
