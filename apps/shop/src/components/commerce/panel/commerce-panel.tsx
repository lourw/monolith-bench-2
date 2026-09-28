import { validatePercent } from '../../../utils/validate/validate-percent';
import { i18nNumber } from '../../../utils/i18n/i18n-number';
import type { CommercePanelProps } from './commerce-panel.types';
import { resolveCommercePanelStyle } from './commerce-panel-variants';

export function CommercePanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-commerce-panel',
  onSelect,
  children,
}: CommercePanelProps) {
  const formatted = value === undefined ? '' : validatePercent(value);
  const style = resolveCommercePanelStyle(tone, size);
  const ariaLabel = i18nNumber(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-commerce-panel ui-element"
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

export default CommercePanel;
