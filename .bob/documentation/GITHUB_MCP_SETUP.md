# GitHub MCP Server Setup Guide

This guide documents the legacy GitHub MCP (Model Context Protocol) server
configuration currently included in this project.

> **Maintenance warning:** The configured
> `@modelcontextprotocol/server-github` package is deprecated. It remains
> documented so that the repository matches the current implementation.
> Replace it with the maintained
> [GitHub MCP server](https://github.com/github/github-mcp-server) before
> production use, then update `.bob/mcp.json` and regenerate the
> third-party dependency snapshot.

## Prerequisites

- Node.js and npm installed on your system
- A GitHub account
- IBM Bob installed

## Setup Steps

### 1. Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give your token a descriptive name (e.g., "Bob MCP Server")
4. Set an expiration date (recommended: 90 days or custom)
5. Select the least privilege required for the target repository:
   - `public_repo` - Use this for public repositories only
   - `repo` - Use this when private repository access is required

   Do not add the `workflow` scope for issue creation. That scope permits
   updates to GitHub Actions workflow files and is not required by the
   issue-management workflows documented in this repository.

6. Click "Generate token"
7. **Important**: Copy the token immediately - you won't be able to see it again!

### 2. Configure Environment Variables

1. Create a `.env` file in the project root directory:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your GitHub Personal Access Token:
   ```
   GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_actual_token_here
   ```

3. **Security Note**: The `.env` file is already in `.gitignore` and will not be committed to version control.

### 3. Verify Configuration

The legacy GitHub MCP server has been configured in `.bob/mcp.json` with the following settings:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}"
      }
    }
  }
}
```

### 4. Restart IBM Bob

After setting up the `.env` file, restart IBM Bob so that the environment
variables are loaded and Bob can access the GitHub MCP server.

## Usage

Once configured, you can use Bob to:

- Create GitHub issues in the current repository
- Search and retrieve issue information
- Update issue status and labels
- Add comments to issues
- And more GitHub operations

### Example Commands

You can ask Bob to:
- "Create a GitHub issue for the bug we just found"
- "List all open issues in this repository"
- "Add a comment to issue #123"
- "Update issue #456 with the 'bug' label"

## Troubleshooting

### Token Not Working

- Verify the token has the correct scopes (`repo` or `public_repo`)
- Check that the token hasn't expired
- Ensure the `.env` file is in the project root directory
- Restart VS Code after creating/updating the `.env` file

### MCP Server Not Loading

- Ensure Node.js and npm are installed: `node --version` and `npm --version`
- Check that the `.bob/mcp.json` file is properly formatted
- Look for error messages in the VS Code Output panel (View > Output > Bob)

### Permission Errors

- Verify your GitHub token has access to the repository
- For organization repositories, ensure your token has the necessary organization permissions
- Check if the repository requires additional authentication (e.g., SSO)

## Security Best Practices

1. **Never commit** your `.env` file or expose your GitHub token
2. Use tokens with **minimal required scopes**
3. Set **expiration dates** on tokens
4. **Rotate tokens** regularly (every 90 days recommended)
5. **Revoke tokens** immediately if compromised
6. Use different tokens for different projects/purposes

## Additional Resources

- [Maintained GitHub MCP Server](https://github.com/github/github-mcp-server)
- [Archived MCP GitHub Server Notice](https://github.com/modelcontextprotocol/servers-archived/tree/main/src/github)
- [GitHub Personal Access Tokens Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Model Context Protocol (MCP) Overview](https://modelcontextprotocol.io/)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the VS Code Output panel for error messages
3. Consult the GitHub MCP server documentation
4. Verify your GitHub token permissions and expiration
