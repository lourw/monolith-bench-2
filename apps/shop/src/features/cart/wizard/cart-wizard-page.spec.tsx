import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartWizardPage } from './cart-wizard-page';
import { CartWizardSummary } from './cart-wizard-summary';
import { CART_WIZARD_FEATURE, CART_WIZARD_ROUTE } from './cart-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CART_WIZARD_ROUTE]}>
      <CartWizardPage />
    </MemoryRouter>,
  );
}

describe('CartWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(CART_WIZARD_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CART_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CART_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(CART_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CART_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CART_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${CART_WIZARD_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${CART_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CART_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CART_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CartWizardSummary', () => {
  it('renders the summary block', () => {
    render(<CartWizardSummary />);
    expect(
      screen.getByTestId(`${CART_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
