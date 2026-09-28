import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShippingWizardPage } from './shipping-wizard-page';
import { ShippingWizardSummary } from './shipping-wizard-summary';
import {
  SHIPPING_WIZARD_FEATURE,
  SHIPPING_WIZARD_ROUTE,
} from './shipping-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SHIPPING_WIZARD_ROUTE]}>
      <ShippingWizardPage />
    </MemoryRouter>,
  );
}

describe('ShippingWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SHIPPING_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SHIPPING_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SHIPPING_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(SHIPPING_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SHIPPING_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SHIPPING_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SHIPPING_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SHIPPING_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SHIPPING_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SHIPPING_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ShippingWizardSummary', () => {
  it('renders the summary block', () => {
    render(<ShippingWizardSummary />);
    expect(
      screen.getByTestId(`${SHIPPING_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
