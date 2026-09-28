import { i18nNumber } from '../../../utils/i18n/i18n-number';
import { formatDate } from '../../../utils/format/format-date';
import { mathCurrency } from '../../../utils/math/math-currency';
import { FormsBadge } from '../../forms/badge/forms-badge';
import type { LayoutListProps } from './layout-list.types';
import { resolveLayoutListStyle } from './layout-list-variants';

export function LayoutList({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-layout-list',
  onSelect,
  children,
}: LayoutListProps) {
  const formatted = value === undefined ? '' : i18nNumber(value);
  const style = resolveLayoutListStyle(tone, size);
  const ariaLabel = mathCurrency(formatDate(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-layout-list ui-element"
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
      <FormsBadge label="Forms Badge" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default LayoutList;
