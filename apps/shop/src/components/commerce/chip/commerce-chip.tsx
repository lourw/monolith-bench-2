import { storageDate } from '../../../utils/storage/storage-date';
import { FormsHeader } from '../../forms/header/forms-header';
import type { CommerceChipProps } from './commerce-chip.types';
import { resolveCommerceChipStyle } from './commerce-chip-variants';

export function CommerceChip({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-commerce-chip',
  onSelect,
  children,
}: CommerceChipProps) {
  const formatted = value === undefined ? '' : storageDate(value);
  const style = resolveCommerceChipStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-commerce-chip ui-element"
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
      <FormsHeader label="Forms Header" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default CommerceChip;
