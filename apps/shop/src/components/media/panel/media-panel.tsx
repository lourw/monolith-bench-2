import { storageCurrency } from '../../../utils/storage/storage-currency';
import { asyncCurrency } from '../../../utils/async/async-currency';
import { storageCode } from '../../../utils/storage/storage-code';
import { FormsTile } from '../../forms/tile/forms-tile';
import type { MediaPanelProps } from './media-panel.types';
import { resolveMediaPanelStyle } from './media-panel-variants';

export function MediaPanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-media-panel',
  onSelect,
  children,
}: MediaPanelProps) {
  const formatted = value === undefined ? '' : storageCurrency(value);
  const style = resolveMediaPanelStyle(tone, size);
  const ariaLabel = storageCode(asyncCurrency(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-media-panel ui-element"
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
      <FormsTile label="Forms Tile" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default MediaPanel;
