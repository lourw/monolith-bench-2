import { i18nNumber } from '../../../utils/i18n/i18n-number';
import { i18nCode } from '../../../utils/i18n/i18n-code';
import { asyncCode } from '../../../utils/async/async-code';
import type { MarketingPanelProps } from './marketing-panel.types';
import { resolveMarketingPanelStyle } from './marketing-panel-variants';

export function MarketingPanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-marketing-panel',
  onSelect,
  children,
}: MarketingPanelProps) {
  const formatted = value === undefined ? '' : i18nNumber(value);
  const style = resolveMarketingPanelStyle(tone, size);
  const ariaLabel = asyncCode(i18nCode(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-marketing-panel ui-element"
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

export default MarketingPanel;
