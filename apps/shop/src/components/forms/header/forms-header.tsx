import { asyncText } from '../../../utils/async/async-text';
import { validateText } from '../../../utils/validate/validate-text';
import type { FormsHeaderProps } from './forms-header.types';
import { resolveFormsHeaderStyle } from './forms-header-variants';

export function FormsHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-forms-header',
  onSelect,
  children,
}: FormsHeaderProps) {
  const formatted = value === undefined ? '' : asyncText(value);
  const style = resolveFormsHeaderStyle(tone, size);
  const ariaLabel = validateText(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-forms-header ui-element"
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

export default FormsHeader;
