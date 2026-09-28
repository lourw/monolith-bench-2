import { validateSlug } from '../../../utils/validate/validate-slug';
import type { DataCardProps } from './data-card.types';
import { resolveDataCardStyle } from './data-card-variants';

export function DataCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-data-card',
  onSelect,
  children,
}: DataCardProps) {
  const formatted = value === undefined ? '' : validateSlug(value);
  const style = resolveDataCardStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-data-card ui-element"
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

export default DataCard;
