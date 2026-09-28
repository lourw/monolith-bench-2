import { validateDate } from '../../../utils/validate/validate-date';
import { mathText } from '../../../utils/math/math-text';
import type { TypographyCardProps } from './typography-card.types';
import { resolveTypographyCardStyle } from './typography-card-variants';

export function TypographyCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-typography-card',
  onSelect,
  children,
}: TypographyCardProps) {
  const formatted = value === undefined ? '' : validateDate(value);
  const style = resolveTypographyCardStyle(tone, size);
  const ariaLabel = mathText(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-typography-card ui-element"
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

export default TypographyCard;
