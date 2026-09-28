import { validateSlug } from '../../../utils/validate/validate-slug';
import type { LayoutHeaderProps } from './layout-header.types';
import { resolveLayoutHeaderStyle } from './layout-header-variants';

export function LayoutHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-layout-header',
  onSelect,
  children,
}: LayoutHeaderProps) {
  const formatted = value === undefined ? '' : validateSlug(value);
  const style = resolveLayoutHeaderStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-layout-header ui-element"
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

export default LayoutHeader;
