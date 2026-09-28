import { i18nAddress } from '../../../utils/i18n/i18n-address';
import type { InputsStatProps } from './inputs-stat.types';
import { resolveInputsStatStyle } from './inputs-stat-variants';

export function InputsStat({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-inputs-stat',
  onSelect,
  children,
}: InputsStatProps) {
  const formatted = value === undefined ? '' : i18nAddress(value);
  const style = resolveInputsStatStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-inputs-stat ui-element"
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

export default InputsStat;
