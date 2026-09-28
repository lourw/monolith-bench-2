import { asyncNumber } from '../../../utils/async/async-number';
import type { TypographyStatProps } from './typography-stat.types';
import { resolveTypographyStatStyle } from './typography-stat-variants';

export function TypographyStat({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-typography-stat',
  onSelect,
  children,
}: TypographyStatProps) {
  const formatted = value === undefined ? '' : asyncNumber(value);
  const style = resolveTypographyStatStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-typography-stat ui-element"
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

export default TypographyStat;
