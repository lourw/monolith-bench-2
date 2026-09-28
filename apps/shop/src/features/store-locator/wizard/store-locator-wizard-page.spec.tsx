import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { StoreLocatorWizardPage } from './store-locator-wizard-page';
import { StoreLocatorWizardSummary } from './store-locator-wizard-summary';
import {
  STORE_LOCATOR_WIZARD_FEATURE,
  STORE_LOCATOR_WIZARD_ROUTE,
} from './store-locator-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[STORE_LOCATOR_WIZARD_ROUTE]}>
      <StoreLocatorWizardPage />
    </MemoryRouter>,
  );
}

describe('StoreLocatorWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(STORE_LOCATOR_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      STORE_LOCATOR_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${STORE_LOCATOR_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(STORE_LOCATOR_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${STORE_LOCATOR_WIZARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${STORE_LOCATOR_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${STORE_LOCATOR_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${STORE_LOCATOR_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${STORE_LOCATOR_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${STORE_LOCATOR_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('StoreLocatorWizardSummary', () => {
  it('renders the summary block', () => {
    render(<StoreLocatorWizardSummary />);
    expect(
      screen.getByTestId(`${STORE_LOCATOR_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
