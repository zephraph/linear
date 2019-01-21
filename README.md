# @linear/cli

Command line tool to create Linear issues using your favorite editor.

## Installation

Install from NPM as global command:

```bash
npm install @linear/cli -g

# ...or with yarn:

yarn global add @linear/cli
```

After installation you need to login and provide your developer key which can be create in [settings](https://linear.app/settings):

```bash
linear login
```

If you need to change your settings later, you can use the same command or edit `.linearrc` from your home folder. To use VS Code as editor, you need to set it to wait similar to when using with `git`: `code --wait`

## Usage

### New issue

Create new Linear issue with interactive prompts:

```bash
linear issue
```

If you want to create issue directly without user input:

```bash
linear issue "New issue title" --description "More detailed description" --skipInput
```

### New comment

```bash
linear comment ENG-123
```

TBA

### Change issue status

```bash
linear status ENG-123
```

TBA

## Move issue to in progress

```bash
linear start ENG-123
```

### Mark issue as done

```bash
linear done ENG-123
```

TBA

### Cancel issue

```bash
linear cancel ENG-123
```

TBA

### Assign issue

```bash
linear assign ENG-13
```

TBA

## Development

Install dependencies:

```bash
yarn
```

Link the package locally and start development server:

```bash
yarn link
yarn dev
```

After development server is running, you'll be able to test the CLI by running `linear` like it would be installed globally.

## License

MIT
