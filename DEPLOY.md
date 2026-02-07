# Deploying to Railway

You encountered the error: `You must specify a workspaceId to create a project`.
This usually means you are using the Railway CLI (`railway init` or `railway up`) but haven't selected a workspace yet.

## Option 1: Using the Railway Dashboard (Recommended)
Since you already pushed your code to GitHub, this is the easiest way:

1.  Go to [Railway Dashboard](https://railway.app/dashboard).
2.  Click **"New Project"**.
3.  Select **"Deploy from GitHub repo"**.
4.  Select your repository: `valentines`.
5.  Click **"Deploy Now"**.

Railway will automatically detect the `Dockerfile` and build your project.

### Configuration
- Railway should automatically detect that your app listens on port `80` (from the Dockerfile).
- If the deployment succeeds but you see a "Bad Gateway" or "Application Error", go to the service settings in Railway and ensure the **PORT** variable is set to `80`.

## Option 2: Using the CLI
If you prefer the command line:

1.  **Login**:
    ```bash
    railway login
    ```
2.  **Link/Init Project**:
    Run this command and select "Empty Project" or link to an existing one:
    ```bash
    railway init
    ```
3.  **Deploy**:
    ```bash
    railway up
    ```

If `railway init` fails, try passing the workspace ID explicitly (you can find this in the URL of your dashboard):
```bash
railway init --workspace <YOUR_WORKSPACE_ID>
```
