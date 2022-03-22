# Updog Contribution Guidelines

Updog is an open-source social media webapp. Currently, contribution is limited to University of Auckland students taking SOFTENG 701.

## Creating Issues

Issues should be discussed in a team meeting or on Discord prior to their creation. When creating an issue, use the appropriate template for a bug report or feature request. Sufficient detail must be provided for a developer not familiar with the issue to fix the bug or implement the feature

If your issue is blocked by or blocks another issue, it should be noted in the description, e.g. “blocked by #57”

Once created, issues should be added to the relevant project board(s), [located here](https://github.com/SE701Team2/Updog/projects)

## Instructions for setting up linting and formatting

Please set this up before making any contributions

1. Install ESLint and Prettier plugins for VS Code

   - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
   - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

2. `npm install` from root (from \Updog)
3. Navigate to `settings.json`
   This can be done by doing Ctrl+Shift+P and typing 'open settings'

     <img width="253" alt="image" src="https://user-images.githubusercontent.com/61653096/157187749-e441e3fc-c4e2-47b2-995d-679c890abb4c.png">

   Open settings.json and add these lines somewhere in the file

```
"editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
```

Your settings.json may look something like this in the end

<img width="389" alt="image" src="https://user-images.githubusercontent.com/61653096/157187944-e5f03443-92c3-446f-a64d-1b4fb14f005b.png">
If it is all working correctly, ESLint analysis should pop up in JS files, and Prettier will format files properly upon saving.

Reach out to devops if anything isn't working

## Creating and completing Pull Requests

To contribute to the project, first pick an open and unclaimed issue and assign it to yourself. Do not assign more than one issue to yourself at the same time.
Fork and clone the project repository, then create a feature branch off master and add your contribution.

Once your code is written and appropriate unit tests have been added, create a Pull Request (PR) with a descriptive title and body, referencing the related issue. The PR title should include the issue number in square brackets, e.g. “[#43] Added share button”. For larger features, it may be desirable to create multiple PRs and use a feature flag. Ensure that all contributors to a PR are mentioned in the description.

Before a PR can be completed, it must pass a code review process, in which a team member who did not write the PR must do the following:

- Check that the code is high-quality and adheres to our [coding style](#coding-style)
- Build and run the branch to ensure that it works as expected
- Ensure that the branch passes all tests in the test suite
- All committed files pass lint checking (ESLint/Prettier)
- Raise any issues with the above steps

Once all raised issues have been resolved and any merge conflicts have been fixed, the commits should be squashed and merged into master by the creator of the PR.

## Adding to the Wiki

Appropriate documentation of features should be added to the [Wiki](https://github.com/SE701Team2/Updog/wiki) when a feature is completed.

## Coding Style

Developers must use the [Airbnb style guide](https://airbnb.io/javascript/react/) when making Javascript contributions. Prettier and ESLint will catch most deviations from these rules, but it is important to be mindful of them.
