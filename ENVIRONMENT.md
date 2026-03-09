# Environment Variables

## Configuration

Creating a `.env` file in the root of `VotePeace-Frontend` allows you to configure specific behavior.

**Note**: All environment variables in Vite must be prefixed with `VITE_` to be exposed to the browser.

## Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | The base URL for the backend API. | `http://localhost:3000` |
| `VITE_APP_NAME` | The display name of the application. | `VotePeace` |

## Example `.env`

```ini
# API Connecton
VITE_API_BASE_URL=http://localhost:3000

# Application Settings
VITE_APP_NAME=VotePeace
```
