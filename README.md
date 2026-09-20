# TK Shreyas Portfolio

A production-ready single-page portfolio built with plain HTML5, CSS3, and vanilla JavaScript. There is no build step, package manager, or runtime dependency.

## Run locally

1. Open this folder in VS Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Open the local URL shown by VS Code.

You can also open `index.html` directly in a browser. Live Server is recommended while editing because it reloads the page automatically.

## Replace placeholders

- Replace `assets/TK_Shreyas_Resume.pdf` with the final resume PDF, keeping the same filename.
- Replace the `#` links in `index.html` for the GitHub profile and each project’s GitHub and Live Demo URLs. Each placeholder is marked with a nearby `TODO` comment.
- Replace the canonical URL and Open Graph URL in the `<head>` with the deployed site URL.
- The supplied profile photo is stored at `assets/assetstk-shreyas-profile.jpg.png` and is already connected to the first-page hero. Rename it to a simpler filename such as `assets/tk-shreyas-profile.jpg` later if desired, then update the image path in `index.html`.
- Update `https://example.com/` in the JSON-LD and metadata once the site is deployed.

## Deploy

### Netlify

1. Sign in at [netlify.com](https://www.netlify.com/).
2. Choose **Add new site** > **Deploy manually**.
3. Drag the complete project folder into the deploy area, or connect the Git repository.
4. No build command or publish directory is needed. The project root is the publish directory.

### GitHub Pages

1. Create a GitHub repository and upload the project files to its default branch.
2. Open **Settings** > **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch and `/ (root)` folder, then save.
5. Update the canonical and social metadata with the GitHub Pages URL.

## Structure

```text
index.html
css/style.css
js/main.js
assets/favicon.svg
assets/profile-placeholder.svg
assets/TK_Shreyas_Resume.pdf
README.md
```

## Final TODO checklist

- [ ] Replace the placeholder resume PDF.
- [ ] Add the GitHub profile URL.
- [ ] Add GitHub and Live Demo URLs for both projects.
- [ ] Replace `https://example.com/` canonical, Open Graph, and JSON-LD URLs after deployment.
- [ ] Replace the profile placeholder image if desired.
