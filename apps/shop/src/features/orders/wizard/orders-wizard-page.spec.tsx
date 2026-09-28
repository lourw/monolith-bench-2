import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { OrdersWizardPage } from './orders-wizard-page';
import { OrdersWizardSummary } from './orders-wizard-summary';
import {
  ORDERS_WIZARD_FEATURE,
  ORDERS_WIZARD_ROUTE,
} from './orders-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ORDERS_WIZARD_ROUTE]}>
      <OrdersWizardPage />
    </MemoryRouter>,
  );
}

describe('OrdersWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ORDERS_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ORDERS_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ORDERS_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(ORDERS_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ORDERS_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ORDERS_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ORDERS_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ORDERS_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ORDERS_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ORDERS_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('OrdersWizardSummary', () => {
  it('renders the summary block', () => {
    render(<OrdersWizardSummary />);
    expect(
      screen.getByTestId(`${ORDERS_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
