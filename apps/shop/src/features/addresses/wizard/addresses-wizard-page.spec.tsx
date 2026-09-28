import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AddressesWizardPage } from './addresses-wizard-page';
import { AddressesWizardSummary } from './addresses-wizard-summary';
import {
  ADDRESSES_WIZARD_FEATURE,
  ADDRESSES_WIZARD_ROUTE,
} from './addresses-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ADDRESSES_WIZARD_ROUTE]}>
      <AddressesWizardPage />
    </MemoryRouter>,
  );
}

describe('AddressesWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ADDRESSES_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ADDRESSES_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ADDRESSES_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(ADDRESSES_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ADDRESSES_WIZARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ADDRESSES_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ADDRESSES_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ADDRESSES_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ADDRESSES_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ADDRESSES_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AddressesWizardSummary', () => {
  it('renders the summary block', () => {
    render(<AddressesWizardSummary />);
    expect(
      screen.getByTestId(`${ADDRESSES_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
