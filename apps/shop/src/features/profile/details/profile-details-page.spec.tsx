import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProfileDetailsPage } from './profile-details-page';
import { ProfileDetailsSummary } from './profile-details-summary';
import {
  PROFILE_DETAILS_FEATURE,
  PROFILE_DETAILS_ROUTE,
} from './profile-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROFILE_DETAILS_ROUTE]}>
      <ProfileDetailsPage />
    </MemoryRouter>,
  );
}

describe('ProfileDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROFILE_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROFILE_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROFILE_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(PROFILE_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${PROFILE_DETAILS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROFILE_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROFILE_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROFILE_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROFILE_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROFILE_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ProfileDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<ProfileDetailsSummary />);
    expect(
      screen.getByTestId(`${PROFILE_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
