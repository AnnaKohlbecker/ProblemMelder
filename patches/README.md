# 📦 patches

This folder contains patches created using [`patch-package`](https://www.npmjs.com/package/patch-package). These patches are used to modify third-party npm packages without forking them.

**Information about patched packages can be found at the very bottom**

## 🚀 What is `patch-package`?

`patch-package` is a tool that lets you make fixes or changes to npm packages in your `node_modules` and store them as patch files. These patches are automatically applied when you install your dependencies (`npm install` or `yarn install`).

## 📂 Folder Structure

```
project-root/
├── patches/
│
├── package-name+version.patch
│
└── another-package+version.patch
```

Each patch file is named following this pattern:

```
<package-name>+<version>.patch
```

## 📦 How to Apply Patches

Patches are automatically applied after running:

```bash
npm install
# or
yarn install
```

The postinstall script in your `package.json` should include `patch-package`:

```json
"scripts": {
  "postinstall": "patch-package"
}
```

## ✏️ Creating a New Patch

1. Make your changes directly in the `node_modules` folder:

```
code node_modules/<package-name>/<file-you-want-to-change>
```

2. Save your changes and run:

```
npx patch-package <package-name>
```

3. This will create a new patch file in the `patches/` folder.

## 🔍 Best Practices

-   **Keep patches minimal**: Only include changes that are absolutely necessary.
-   **Document your changes**: Consider adding comments inside the patch file or documenting changes in this README.
-   **Update patches on package upgrades**: If you update a package, you may need to update or recreate the patch.

## 🛠️ Troubleshooting

If you encounter issues with patches not applying correctly:

-   Ensure the patch file name matches the `<package-name>+<version>.patch` format.
-   Check if the package version has changed, and regenerate the patch if needed.
-   Run `npx patch-package` again to update the patch after making additional changes.

## 📚 Additional Resources

-   [patch-packages npm docs](https://www.npmjs.com/package/patch-package)
-   [patch-packages github repo](https://github.com/ds300/patch-package)

# Patched packages
