import { TypographyBanner } from './typography-banner';
import type {
  TypographyBannerGroupProps,
  TypographyBannerItem,
} from './typography-banner.types';
import { toneFromValue } from './typography-banner-variants';

export function TypographyBannerGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-typography-banner-group',
  onSelect,
}: TypographyBannerGroupProps) {
  const handleSelect = (item: TypographyBannerItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <TypographyBanner
            key={item.id}
            label={item.label}
            value={item.value}
            size={size}
            tone={item.tone ?? toneFromValue(item.value)}
            testId={`${testId}-${item.id}`}
            onSelect={onSelect ? handleSelect(item) : undefined}
          />
        ))}
      </div>
      {items.length === 0 ? (
        <p className="ui-group-empty">Nothing to show</p>
      ) : null}
    </section>
  );
}

export default TypographyBannerGroup;
