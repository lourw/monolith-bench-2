import { storageSlug } from '../../../utils/storage/storage-slug';
import { storageText } from '../../../utils/storage/storage-text';
import { formatAddress } from '../../../utils/format/format-address';
import { DataToolbar } from '../../data/toolbar/data-toolbar';
import type { OverlayToolbarProps } from './overlay-toolbar.types';
import { resolveOverlayToolbarStyle } from './overlay-toolbar-variants';

export function OverlayToolbar({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-overlay-toolbar',
  onSelect,
  children,
}: OverlayToolbarProps) {
  const formatted = value === undefined ? '' : storageSlug(value);
  const style = resolveOverlayToolbarStyle(tone, size);
  const ariaLabel = formatAddress(storageText(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-overlay-toolbar ui-element"
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
      <DataToolbar label="Data Toolbar" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default OverlayToolbar;
