import { validateCode } from '../../../utils/validate/validate-code';
import { asyncCode } from '../../../utils/async/async-code';
import { collectionCurrency } from '../../../utils/collection/collection-currency';
import { CoreChip } from '../chip/core-chip';
import type { CoreStatProps } from './core-stat.types';
import { resolveCoreStatStyle } from './core-stat-variants';

export function CoreStat({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-core-stat',
  onSelect,
  children,
}: CoreStatProps) {
  const formatted = value === undefined ? '' : validateCode(value);
  const style = resolveCoreStatStyle(tone, size);
  const ariaLabel = collectionCurrency(asyncCode(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-core-stat ui-element"
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
      <CoreChip label="Core Chip" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default CoreStat;
