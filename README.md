Read File Content
===

Read file contents.

## Inputs

- `path` File path
- `branch` the branch where the file resides. Default: `${{ github.ref_name }}`

## Outputs

- `content` text file content

## Example Usage

```yml
- name: Read README.md
  id: package
  uses: jaywcjlove/github-action-modify-file-content@main
  with:
    path: ./package.json

- name: Echo package.json
  run: echo "${{ steps.package.outputs.content }}"
```



## See Also

- [Github Release Changelog Generator](https://github.com/jaywcjlove/changelog-generator) A GitHub Action that compares the commit differences between two branches
- [Create Tags From](https://github.com/jaywcjlove/create-tag-action) Auto create tags from commit or package.json.
- [Github Action Contributors](https://github.com/jaywcjlove/github-action-contributors) Github action generates dynamic image URL for contributor list to display it!
- [Generated Badges](https://github.com/jaywcjlove/generated-badges) Create a badge using GitHub Actions and GitHub Workflow CPU time (no 3rd parties servers)
- [Create Coverage Badges](https://github.com/jaywcjlove/coverage-badges-cli) Create coverage badges from coverage reports. (no 3rd parties servers)
- [Github Action package](https://github.com/jaywcjlove/github-action-package) Read and modify the contents of `package.json`.
- [Github Action EJS](https://github.com/jaywcjlove/github-action-package) A github action to render a ejs template using github context.

## License

Licensed under the MIT License.
