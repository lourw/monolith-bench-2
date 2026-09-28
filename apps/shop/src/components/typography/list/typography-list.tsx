import { i18nCode } from '../../../utils/i18n/i18n-code';
import { validateCode } from '../../../utils/validate/validate-code';
import { validatePhone } from '../../../utils/validate/validate-phone';
import { CoreToolbar } from '../../core/toolbar/core-toolbar';
import type { TypographyListProps } from './typography-list.types';
import { resolveTypographyListStyle } from './typography-list-variants';

export function TypographyList({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-typography-list',
  onSelect,
  children,
}: TypographyListProps) {
  const formatted = value === undefined ? '' : i18nCode(value);
  const style = resolveTypographyListStyle(tone, size);
  const ariaLabel = validatePhone(validateCode(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-typography-list ui-element"
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
      <CoreToolbar label="Core Toolbar" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default TypographyList;
