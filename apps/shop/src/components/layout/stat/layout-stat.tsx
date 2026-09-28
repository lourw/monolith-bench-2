import { storageName } from '../../../utils/storage/storage-name';
import { i18nSlug } from '../../../utils/i18n/i18n-slug';
import type { LayoutStatProps } from './layout-stat.types';
import { resolveLayoutStatStyle } from './layout-stat-variants';

export function LayoutStat({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-layout-stat',
  onSelect,
  children,
}: LayoutStatProps) {
  const formatted = value === undefined ? '' : storageName(value);
  const style = resolveLayoutStatStyle(tone, size);
  const ariaLabel = i18nSlug(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-layout-stat ui-element"
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

export default LayoutStat;
