import { validatePhone } from '../../../utils/validate/validate-phone';
import { i18nAddress } from '../../../utils/i18n/i18n-address';
import { asyncName } from '../../../utils/async/async-name';
import type { DataPanelProps } from './data-panel.types';
import { resolveDataPanelStyle } from './data-panel-variants';

export function DataPanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-data-panel',
  onSelect,
  children,
}: DataPanelProps) {
  const formatted = value === undefined ? '' : validatePhone(value);
  const style = resolveDataPanelStyle(tone, size);
  const ariaLabel = asyncName(i18nAddress(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-data-panel ui-element"
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

export default DataPanel;
