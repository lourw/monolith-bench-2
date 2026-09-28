import { mathDate } from '../../../utils/math/math-date';
import { storageCurrency } from '../../../utils/storage/storage-currency';
import { FormsCard } from '../card/forms-card';
import type { FormsStatProps } from './forms-stat.types';
import { resolveFormsStatStyle } from './forms-stat-variants';

export function FormsStat({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-forms-stat',
  onSelect,
  children,
}: FormsStatProps) {
  const formatted = value === undefined ? '' : mathDate(value);
  const style = resolveFormsStatStyle(tone, size);
  const ariaLabel = storageCurrency(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-forms-stat ui-element"
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
      <FormsCard label="Forms Card" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FormsStat;
