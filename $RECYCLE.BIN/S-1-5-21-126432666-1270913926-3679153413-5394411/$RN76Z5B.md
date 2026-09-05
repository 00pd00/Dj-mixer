# Contribution Guide

Welcome to the **TeamcenterX Cookbook** contribution guide! This guide helps you contribute to our documentation in a simple, easy-to-follow way.

## 📋 Table of Contents

1. [Getting Started](#-getting-started)
2. [Quick Demo](#quick-demo)
3. [Which Method Should I Use?](#-which-method-should-i-use)
4. [Quick Edit](#quick-edit-simple-changes)
5. [Web IDE Edit](#web-ide-edit)
6. [Advanced Edit](#advanced-edit-major-changes)
7. [Review Process](#-review-process)
8. [Need Help?](#-need-help)
9. [Best Practices](#-best-practices)
10. [Quick Reference](#-quick-reference)

---

## 🚀 Getting Started

### Do You Have Access?

- You need access to contribute to the documentation.

### 🔑 Request Access via GitLab

1. **Go to the [Cookbook Repository](https://code.siemens.com/ctcx/cookbook).**
2. **Click the three dots ("⋮") next to the Fork button (top right).**
3. **Choose "Request Access" from the dropdown menu.**
4. **Click "Send Request."**
5. **Watch for an approval email—then you’re ready to contribute!**

- **Can't find the Request Access option?**  
  Email your Siemens email address to:
  - **Shantanu Joshi** or **Yuvraj Choudhary**

### Quick Demo
📹 **Watch the contribution process:** [Video Guide](../../../static/vid/cookbook-contribution-process-guide.mp4)

---

## 🤔 Which Method Should I Use?

| **What you want to do** | **Use this method** | **Time needed** |
|-------------------------|-------------------|-----------------|
| Fix typos, update text, add information to existing pages | **📝 Quick Edit** | 5 minutes |
| Add new pages, change navigation, modify website structure | **💻 Advanced Edit** | 10+ minutes |

---

<details open>

<summary><strong>📝 Quick Edit (Simple Changes)</strong></summary>

## Quick Edit (Simple Changes)

**Perfect for:** Fixing typos, updating content, correcting errors  
**Who can use this:** Everyone (no technical knowledge needed)

### Step-by-Step Instructions

#### 1. Find the page to update
- Go to the documentation website
- Navigate to the page that needs updating

#### 2. Click "Edit this page"
- Look for the **"Edit this page"** link (usually at top or bottom)
- Click it to open the editor

#### 3. Make your changes
- Edit the text directly in the simple editor
- Use the **"Preview"** button to see how it looks
- ⚠️ **Avoid special characters** like `<`, `>`, `{`, `}` in regular text
- If you need these characters, put them in code blocks: `` `<example>` ``

#### 4. Save your changes
- Scroll to the bottom of the page
- Write a short description (e.g., "Fixed typo in step 3")
- Click **"Commit changes"**
- Make sure **"Start a new request"** is selected

#### 5. Submit for review
- Fill in what you changed and why
- Click **"Create request"**
- ✅ Done! Your changes will be reviewed and published

</details>

---


<details open>

<summary><strong>🌐 Web IDE Edit</strong></summary>

## Web IDE Edit

**Perfect for:** Editing multiple files, uploading images, or making small structural updates  
**Who can use this:** Anyone comfortable with basic web interfaces (no local setup needed)

### Step-by-Step Instructions

#### Option 1: Start from the Documentation Website

1. **Find the page you want to update**
   - Go to your documentation website hosted on Docusaurus.
   - Navigate to the page that needs changes.

2. **Click "Edit this page"**
   - Click the **"Edit this page"** link (usually at the top or bottom of the page).
   - This will take you to the documentation repository on GitLab.

3. **Select the Edit Option**
   - On the repository page, look for and click the **"Edit"** button.
   - After clicking "Edit", you will see the **"Edit in Web IDE"** option appear.

4. **Open the Web IDE**
   - Click **"Edit in Web IDE"** to open the Web IDE environment.

#### Option 2: Start Directly from GitLab

1. **Go directly to your repository on GitLab**
   - Open [GitLab](https://code.siemens.com/ctcx/cookbook) in your browser.

2. **Choose the Edit Option**
   - On the main repository page, look for the **"Edit"** button.
   - After clicking "Edit", select **"Edit in Web IDE"**.

---

**Continue editing using either method:**

5. **Edit documentation or upload images**
   - In the Web IDE, find the `/docs/` folder or the relevant documentation files.
   - Make edits to Markdown files or drag-and-drop files/images as needed.

6. **Commit your changes**
   - Write a clear, meaningful commit message (e.g., "Updated onboarding guide for new release").
   - Click **Commit**.

7. **Create review request**
   - Go to GitLab → New request
   - Select `main` as target
   - Add appropriate reviewers (see table below)
   - Include preview screenshots if helpful

✅ **That's it!** Your changes will be reviewed and published once approved.
</details>

---

<details open>

<summary><strong>💻 Advanced Edit (Major Changes)</strong></summary>

## Advanced Edit (Major Changes)

**Perfect for:** Adding new pages, changing navigation, multiple changes  
**Who can use this:** Developers and technical users

### What You Need
- Git access to the repository
- Basic Git knowledge
- Text editor or development environment

### Step-by-Step Instructions

#### 1. Add SSH key
- You should have an SSH key. If not, generate one using the following command:
  ```bash
  ssh-keygen -t rsa -b 4096 -C "<YOUR_EMAIL>"
  ```
  
  
  It might ask you for the location of the SSH key, passphrase, etc. You can skip this by hitting enter.
  
- Copy your SSH public key, which is generally present at `~/.ssh/id_rsa.pub`.
- Add it here: https://code.siemens.com/-/user_settings/ssh_keys

:::info Windows Users Only
Follow steps 2 and 3 if you are using Windows Command Prompt or PowerShell. **Linux users can skip these steps.**
:::

#### 2: Run this as administrator
 ```bash
 git config --system core.longpaths true
 ```
 
#### 3: Enable Win32 long paths
 Win + R, type `gpedit.msc`, press Enter
   
 Local Computer Policy > Computer Configuration > Administrative Templates > System > Filesystem
   
 Enable Win32 long paths
   
 Click OK

#### 4. Get the code
```bash
git clone git@code.siemens.com/ctcx/cookbook.git
cd cookbook
git checkout -b your-feature-name
```

#### 5. Make your changes
- Edit markdown files in the `/docs/` folder
- **For new navigation sections:**
  1. Create folder in docs (e.g., `09New-Section`)
  2. Update `sidebars.js`
  3. Update `docusaurus.config.js`

#### 6. Test your changes locally

:::tip Install NodeJs
Make sure you have NodeJs installed before running npm commands. Download it from [nodejs.org](https://nodejs.org/)
:::

```bash
npm install
npm run start
```
- Preview at http://localhost:3000
- Check for errors with: `npm run build`

#### 7. Submit your changes
```bash
git add .
git commit -m "Brief description of changes"
git push origin your-feature-name
```

#### 8. Create review request
- Go to GitLab → New request
- Select `main` as target
- Add appropriate reviewers (see table below)
- Include preview screenshots if helpful

</details>

---

<details open>

<summary><strong>🚦Important Code Snippet Guidelines</strong></summary>

## 🚦Important Code Snippet Guidelines

When adding code snippets, **only include the command itself**.

**Do NOT** add shell prompts or context text like `cmd >`, `$`, `#`, or other prefixes in code blocks.

**Example:**

```bash
git status
```
**Not:**

```bash
cmd > git status
```

</details>
---

<details open>
<summary><strong>👥 Review Process</strong></summary>

## 👥 Review Process

### How Reviews Work
- 📅 **Review meetings:** Once per week
- ✅ **Approval needed:** All reviewers must approve
- 🔄 **Timeline:** Changes published after approval

### Section Reviewers

| **Section** | **Owner Team** | **SME Reviewer** |
|-------------|----------------|------------------|
| AWS XCR Cluster setup | Deployops | Yuvraj Choudhary |
| Azure XCR cluster setup | Azure-Deployops | Tushar Bhasme |
| Pipeline | Deployops | Yuvraj Choudhary |
| Operations | TBD | TBD |
| Handoffs | TBD | TBD |
| Product Onboarding | TBD | TBD |
| Admin Console Cookbook | TBD | TBD |

:::note
This table is updated as team assignments change.
:::

</details>

---

<details open>

<summary><strong>🆘 Need Help?</strong></summary>
## 🆘 Need Help?

### Technical Issues
- **Email:** `deployops.tc.lcs.disw@internal.siemens.com`

### Common Problems & Solutions

| **Problem** | **Solution** |
|-------------|--------------|
| "I can't access the documentation" | Email Shantanu or Yuvraj for access |
| "Special characters broke the page" | Put characters in code blocks: `` `<example>` `` |
| "I made a mistake in my edit" | Contact the reviewers - they can help fix it |
| "My changes aren't showing up" | Changes appear after review approval (weekly) |

</details>

---

<details open>

<summary><strong>✨ Best Practices</strong></summary>

## ✨ Best Practices

### For All Contributors
- ✅ **Be clear:** Write simple, helpful descriptions of your changes
- ✅ **Be specific:** Focus on one topic per contribution
- ✅ **Be patient:** Reviews happen weekly

### For Content Updates
- ✅ **Check spelling** before submitting
- ✅ **Use Preview** to see how changes look
- ✅ **Keep it simple** - avoid complex formatting

### For Technical Changes
- ✅ **Test locally** before submitting
- ✅ **Include screenshots** for UI changes
- ✅ **Update navigation** when adding new sections

</details>

---

## 🎯 Quick Reference

| **I want to...** | **Do this...** |
|------------------|----------------|
| Fix a typo | Use **Quick Edit** → Click "Edit this page" |
| Update information | Use **Quick Edit** → Click "Edit this page" |
| Add a new page | Use **Advanced Edit** → Clone repository |
| Change navigation | Use **Advanced Edit** → Clone repository |
| Get help | Email: `deployops.tc.lcs.disw@internal.siemens.com` |

---

**Ready to contribute?** Pick your method above and start helping improve our documentation! 🚀
