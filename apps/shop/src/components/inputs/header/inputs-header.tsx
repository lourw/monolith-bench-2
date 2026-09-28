import { i18nName } from '../../../utils/i18n/i18n-name';
import { NavigationBadge } from '../../navigation/badge/navigation-badge';
import type { InputsHeaderProps } from './inputs-header.types';
import { resolveInputsHeaderStyle } from './inputs-header-variants';

export function InputsHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-inputs-header',
  onSelect,
  children,
}: InputsHeaderProps) {
  const formatted = value === undefined ? '' : i18nName(value);
  const style = resolveInputsHeaderStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-inputs-header ui-element"
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
      <NavigationBadge
        label="Navigation Badge"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default InputsHeader;
