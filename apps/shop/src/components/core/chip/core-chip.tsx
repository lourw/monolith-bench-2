import { asyncPhone } from '../../../utils/async/async-phone';
import { formatCurrency } from '../../../utils/format/format-currency';
import { CorePanel } from '../panel/core-panel';
import type { CoreChipProps } from './core-chip.types';
import { resolveCoreChipStyle } from './core-chip-variants';

export function CoreChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-core-chip',
  onSelect,
  children,
}: CoreChipProps) {
  const formatted = value === undefined ? '' : asyncPhone(value);
  const style = resolveCoreChipStyle(tone, size);
  const ariaLabel = formatCurrency(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-core-chip ui-element"
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

export default CoreChip;
