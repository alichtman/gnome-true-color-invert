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
- GNOME 49

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

The extension includes a graphical preferences dialog:

1. **Open preferences:**
   ```bash
   gnome-extensions prefs true-color-window-invert@lynet101
   ```
   Or right-click the extension in GNOME Extensions app and select "Settings"

2. **Change the keybind:**
   - Click the edit button (pencil icon)
   - Press your desired key combination
   - The new shortcut is saved automatically

3. **Reset to default:**
   - Click the reset button (undo icon) to restore `Super+I`

**Alternative: Command-line configuration**

You can also change the keyboard shortcut using `gsettings`:

```bash
# View current keybind
gsettings get org.gnome.shell.extensions.true-color-window-invert invert-window-shortcut

# Change keybind
gsettings set org.gnome.shell.extensions.true-color-window-invert invert-window-shortcut "['<Ctrl><Alt>I']"

# Reset to default
gsettings reset org.gnome.shell.extensions.true-color-window-invert invert-window-shortcut
```

## Testing

### Complete Test Cycle After Making Changes

1. **Build and reinstall:**
   - Follow steps 1-5 from the "From Source" installation instructions above
   - Use `--force` flag when reinstalling: `gnome-extensions install --force true-color-window-invert@lynet101.zip`

2. **Test core functionality:**
   - Open any application window
   - Press `Super+I` (or your custom keybind)
   - Verify the window colors invert
   - Press the shortcut again to toggle off

3. **Test preferences UI:**
   ```bash
   gnome-extensions prefs true-color-window-invert@lynet101
   ```
   - Verify the preferences window opens
   - Check that the current keybind is displayed correctly
   - Click the edit button and capture a new shortcut
   - Verify the shortcut updates in the UI
   - Test the new shortcut works on a window
   - Click reset and verify it returns to default

4. **Check for errors:**
   ```bash
   journalctl -f -o cat /usr/bin/gnome-shell
   ```
   Watch for any error messages while testing

### Testing in Overview Mode

The extension applies color inversion to window previews in GNOME's overview:

1. Press `Super` to enter overview mode
2. Verify inverted windows maintain their inverted colors in the preview
3. Press `Super` to exit overview
4. Verify the inversion remains on the window

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
