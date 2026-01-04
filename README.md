# True Color Window Inverter

**This is a fork of JackKenney/true-color-window-invert due to 2+ years of inactivity on the project**

GNOME shell extension for inverting window colors in hue preserving manner. Effectively a manual dark theme for GNOME windows.

Available on the GNOME Extensions website here:

https://extensions.gnome.org/extension/5829/true-color-invert/

## Supported Versions

- GNOME 45
- GNOME 46
- GNOME 47
- GNOME 48

Deprecated versions should work, but will not be supported nor will they receive any further updates.

## Installation

### From GNOME Extensions Website
Visit https://extensions.gnome.org/extension/5829/true-color-invert/ and install with one click.

### From Source

1. **Build the extension:**
   ```bash
   ./build.sh
   ```
   This creates `true-color-window-invert@lynet101.zip`

2. **Install the extension:**
   ```bash
   gnome-extensions install true-color-window-invert@lynet101.zip

   # Or to update an existing installation:
   gnome-extensions install --force true-color-window-invert@lynet101.zip
   ```

3. **Restart GNOME Shell:**
   - **Wayland**: Log out and back in
   - **X11**: Press `Alt+F2`, type `r`, press Enter

4. **Enable the extension:**
   ```bash
   gnome-extensions enable true-color-window-invert@lynet101
   ```

5. **Verify installation:**
   ```bash
   gnome-extensions list --enabled | grep true-color
   ```

### Development Installation

For faster iteration during development, symlink the extension:
```bash
mkdir -p ~/.local/share/gnome-shell/extensions
ln -s $(pwd) ~/.local/share/gnome-shell/extensions/true-color-window-invert@lynet101
gnome-extensions enable true-color-window-invert@lynet101
# Restart GNOME Shell as above
```

## Keyboard Shortcut

**Default:** `Super + I`

Press this shortcut while a window is focused to toggle color inversion on that window.

### Customizing the Keybind

You can change the keyboard shortcut using `gsettings`:

```bash
# View current keybind
gsettings get org.gnome.shell.extensions.true-color-window-invert invert-window-shortcut

# Change to a different keybind (examples)
gsettings set org.gnome.shell.extensions.true-color-window-invert invert-window-shortcut "['<Ctrl><Alt>I']"
gsettings set org.gnome.shell.extensions.true-color-window-invert invert-window-shortcut "['<Super><Shift>I']"

# Reset to default
gsettings reset org.gnome.shell.extensions.true-color-window-invert invert-window-shortcut
```

## Debugging

Errors will print out here:
```bash
journalctl -f -o cat /usr/bin/gnome-shell
```

## Contributing

Before submitting pull requests, please run:

```bash
glib-compile-schemas schemas/
```

To recompile the `gschemas`.
This step is not neccesary if the 'build.sh' is used, as it's included in the script

## Building for Release

To make the ZIP for the GNOME Shell Extension website: 

1. `sh build.sh`
2. Tag `main` at that time with a release tag according to the revisions made.
