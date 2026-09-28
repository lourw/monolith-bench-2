import { collectionCode } from '../../../utils/collection/collection-code';
import { mathName } from '../../../utils/math/math-name';
import { i18nDate } from '../../../utils/i18n/i18n-date';
import type { TypographyPanelProps } from './typography-panel.types';
import { resolveTypographyPanelStyle } from './typography-panel-variants';

export function TypographyPanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-typography-panel',
  onSelect,
  children,
}: TypographyPanelProps) {
  const formatted = value === undefined ? '' : collectionCode(value);
  const style = resolveTypographyPanelStyle(tone, size);
  const ariaLabel = i18nDate(mathName(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-typography-panel ui-element"
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

export default TypographyPanel;
