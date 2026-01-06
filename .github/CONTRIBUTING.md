# Contributing to @ariaskit/astro-i18n

Thank you for your interest in contributing to @ariaskit/astro-i18n! We welcome contributions from the community.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/astro-i18n.git
   cd astro-i18n
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

## Development Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Build the project:
   ```bash
   pnpm run build
   ```

4. Test your changes locally by linking the package:
   ```bash
   pnpm link
   # In your test project:
   pnpm link @ariaskit/astro-i18n
   ```

## Coding Guidelines

- Write clean, readable code
- Follow the existing code style
- Add TypeScript types for all new functionality
- Keep functions focused and single-purpose
- Comment complex logic when necessary

## Submitting Changes

1. Commit your changes with a clear and descriptive commit message:
   ```bash
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve issue with translation interpolation"
   ```

2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Open a Pull Request with a clear description of:
   - What changes you made
   - Why you made them
   - Any breaking changes

## Commit Message Convention

We follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## Reporting Issues

When reporting bugs, please include:
- A clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node.js version, Astro version, etc.)

## Questions?

Feel free to open an issue for any questions or discussions about the project.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
