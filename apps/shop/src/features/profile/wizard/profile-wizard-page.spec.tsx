import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProfileWizardPage } from './profile-wizard-page';
import { ProfileWizardSummary } from './profile-wizard-summary';
import {
  PROFILE_WIZARD_FEATURE,
  PROFILE_WIZARD_ROUTE,
} from './profile-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROFILE_WIZARD_ROUTE]}>
      <ProfileWizardPage />
    </MemoryRouter>,
  );
}

describe('ProfileWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROFILE_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROFILE_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROFILE_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(PROFILE_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${PROFILE_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROFILE_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROFILE_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROFILE_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROFILE_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROFILE_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ProfileWizardSummary', () => {
  it('renders the summary block', () => {
    render(<ProfileWizardSummary />);
    expect(
      screen.getByTestId(`${PROFILE_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
