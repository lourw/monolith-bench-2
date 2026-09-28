import { i18nCurrency } from '../../../utils/i18n/i18n-currency';
import type { DataStatProps } from './data-stat.types';
import { resolveDataStatStyle } from './data-stat-variants';

export function DataStat({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-data-stat',
  onSelect,
  children,
}: DataStatProps) {
  const formatted = value === undefined ? '' : i18nCurrency(value);
  const style = resolveDataStatStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-data-stat ui-element"
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

export default DataStat;
