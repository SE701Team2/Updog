# Updog Contribution Guidelines
Updog is an open-source social media webapp. Currently, contribution is limited to University of Auckland students taking SOFTENG 701.

## Creating Issues
When creating an issue, use the appropriate template for a bug report or feature request. Sufficient detail must be provided for a developer not familiar with the issue to fix the bug or implement the feature.
If your issue is blocked by or blocks another issue, it should be noted in the description, e.g. “blocked by #57”

## Creating and completing Pull Requests
To contribute to the project, first pick an open and unclaimed issue and assign it to yourself. Do not assign more than one issue to yourself at the same time. 
Fork and clone the project repository, then create a feature branch off master and add your contribution.

Once your code is written and appropriate unit tests have been added, create a Pull Request (PR) with a descriptive title and body, referencing the related issue. The PR title should include the issue number in square brackets, e.g. “[#43] Added share button”. For larger features, it may be desirable to create multiple PRs and use a feature flag. Ensure that all contributors to a PR are mentioned in the description.

Before a PR can be completed, it must pass a code review process, in which a team member who did not write the PR must do the following:
- Check that the code is high-quality and adheres to our [coding style](#coding-style)
- Build and run the branch to ensure that it works as expected
- Ensure that the branch passes all tests in the test suite
- Raise any issues with the above steps

Once all raised issues have been resolved and any merge conflicts have been fixed, the commits should be squashed and merged into master by the creator of the PR.

## Adding to the Wiki
Appropriate documentation of features should be added to the [Wiki](https://github.com/SE701Team2/Updog/wiki) when a feature is completed.

## Coding Style
This section is a work in progress.
Formatting and style is enforced by ESLint and Prettier.
