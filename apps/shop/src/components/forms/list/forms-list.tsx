import { storageCurrency } from '../../../utils/storage/storage-currency';
import { collectionPercent } from '../../../utils/collection/collection-percent';
import type { FormsListProps } from './forms-list.types';
import { resolveFormsListStyle } from './forms-list-variants';

export function FormsList({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-forms-list',
  onSelect,
  children,
}: FormsListProps) {
  const formatted = value === undefined ? '' : storageCurrency(value);
  const style = resolveFormsListStyle(tone, size);
  const ariaLabel = collectionPercent(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-forms-list ui-element"
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

export default FormsList;
