import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AccountWizardPage } from './account-wizard-page';
import { AccountWizardSummary } from './account-wizard-summary';
import {
  ACCOUNT_WIZARD_FEATURE,
  ACCOUNT_WIZARD_ROUTE,
} from './account-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ACCOUNT_WIZARD_ROUTE]}>
      <AccountWizardPage />
    </MemoryRouter>,
  );
}

describe('AccountWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ACCOUNT_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ACCOUNT_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ACCOUNT_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(ACCOUNT_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ACCOUNT_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ACCOUNT_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ACCOUNT_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ACCOUNT_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ACCOUNT_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ACCOUNT_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AccountWizardSummary', () => {
  it('renders the summary block', () => {
    render(<AccountWizardSummary />);
    expect(
      screen.getByTestId(`${ACCOUNT_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
