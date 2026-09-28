import { i18nDate } from '../../../utils/i18n/i18n-date';
import { asyncNumber } from '../../../utils/async/async-number';
import { collectionCurrency } from '../../../utils/collection/collection-currency';
import { NavigationCard } from '../../navigation/card/navigation-card';
import type { InputsPanelProps } from './inputs-panel.types';
import { resolveInputsPanelStyle } from './inputs-panel-variants';

export function InputsPanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-inputs-panel',
  onSelect,
  children,
}: InputsPanelProps) {
  const formatted = value === undefined ? '' : i18nDate(value);
  const style = resolveInputsPanelStyle(tone, size);
  const ariaLabel = collectionCurrency(asyncNumber(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-inputs-panel ui-element"
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
      <NavigationCard
        label="Navigation Card"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default InputsPanel;
