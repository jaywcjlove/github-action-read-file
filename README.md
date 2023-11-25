Read File Content
===

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![test](https://github.com/jaywcjlove/github-action-read-file/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/github-action-read-file/actions/workflows/ci.yml)

Read file contents. You can also get the file content in the branch

## Example Usage

```yml
- name: Read README.md
  id: package
  uses: jaywcjlove/github-action-read-file@main
  with:
    path: package.json

- name: Echo package.json
  run: echo "${{ steps.package.outputs.content }}"
```

Specify the **branch** to read the file content

```yml
- name: Read README.md(gh-pages)
  id: ghpages
  uses: jaywcjlove/github-action-read-file@main
  with:
    branch: gh-pages
    path: README.md

- name: Echo README.md(gh-pages)
  run: echo "${{ steps.ghpages.outputs.content }}"
```

## Inputs

- `path` File path. E.g: `src/index.ts`
- `branch` The branch where the file resides. Default: `${{ github.ref_name }}`, E.g: `main`, `gh-pages`
- `localfile` Local File path. E.g: `src/index.ts`

## Outputs

- `content` text file content
- `type` 
- `encoding` 
- `name` 
- `path` 
- `sha` 
- `size` file size
- `url` Format: uri 
- `git_url` Format: uri 
- `html_url` Format: uri 
- `download_url` Format: uri 
- `target` @example "actual/actual.md" 
- `submodule_git_url` @example "git://example.com/defunkt/dotjs.git" 

## See Also

- [Github Release Changelog Generator](https://github.com/jaywcjlove/changelog-generator) A GitHub Action that compares the commit differences between two branches
- [Create Tags From](https://github.com/jaywcjlove/create-tag-action) Auto create tags from commit or package.json.
- [Github Action Contributors](https://github.com/jaywcjlove/github-action-contributors) Github action generates dynamic image URL for contributor list to display it!
- [Generated Badges](https://github.com/jaywcjlove/generated-badges) Create a badge using GitHub Actions and GitHub Workflow CPU time (no 3rd parties servers)
- [Create Coverage Badges](https://github.com/jaywcjlove/coverage-badges-cli) Create coverage badges from coverage reports. (no 3rd parties servers)
- [Github Action package](https://github.com/jaywcjlove/github-action-package) Read and modify the contents of `package.json`.
- [Github Action EJS](https://github.com/jaywcjlove/github-action-package) A github action to render a ejs template using github context.
- [Modify File Content](https://github.com/jaywcjlove/github-action-modify-file-content) Replace text content and submit content.

## License

Licensed under the MIT License.
