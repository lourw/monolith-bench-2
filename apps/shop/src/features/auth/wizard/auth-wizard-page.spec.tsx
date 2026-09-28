import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthWizardPage } from './auth-wizard-page';
import { AuthWizardSummary } from './auth-wizard-summary';
import { AUTH_WIZARD_FEATURE, AUTH_WIZARD_ROUTE } from './auth-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[AUTH_WIZARD_ROUTE]}>
      <AuthWizardPage />
    </MemoryRouter>,
  );
}

describe('AuthWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(AUTH_WIZARD_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      AUTH_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${AUTH_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(AUTH_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${AUTH_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${AUTH_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${AUTH_WIZARD_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${AUTH_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${AUTH_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${AUTH_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AuthWizardSummary', () => {
  it('renders the summary block', () => {
    render(<AuthWizardSummary />);
    expect(
      screen.getByTestId(`${AUTH_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
