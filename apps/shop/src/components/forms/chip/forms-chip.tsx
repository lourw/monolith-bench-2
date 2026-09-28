import { collectionPercent } from '../../../utils/collection/collection-percent';
import { mathSlug } from '../../../utils/math/math-slug';
import { CoreBadge } from '../../core/badge/core-badge';
import type { FormsChipProps } from './forms-chip.types';
import { resolveFormsChipStyle } from './forms-chip-variants';

export function FormsChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-forms-chip',
  onSelect,
  children,
}: FormsChipProps) {
  const formatted = value === undefined ? '' : collectionPercent(value);
  const style = resolveFormsChipStyle(tone, size);
  const ariaLabel = mathSlug(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-forms-chip ui-element"
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
      <CoreBadge label="Core Badge" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FormsChip;
