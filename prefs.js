import Gio from 'gi://Gio';
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gdk from 'gi://Gdk';
import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class TrueColorInvertPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        // Create a preferences page
        const page = new Adw.PreferencesPage({
            title: 'General',
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

        // Create a preferences group for keyboard shortcuts
        const group = new Adw.PreferencesGroup({
            title: 'Keyboard Shortcut',
            description: 'Configure the keyboard shortcut to toggle color inversion on the focused window',
        });
        page.add(group);

        // Create a row for the keybinding
        const shortcutRow = new Adw.ActionRow({
            title: 'Toggle Color Inversion',
            subtitle: 'Press this shortcut on a focused window to toggle its color inversion',
        });

        // Get the current keybinding (it's stored as an array of strings)
        const currentBinding = settings.get_strv('invert-window-shortcut')[0] || '';

        // Create a label to display the shortcut
        const shortcutLabel = new Gtk.ShortcutLabel({
            accelerator: currentBinding,
            disabled_text: 'Disabled',
            valign: Gtk.Align.CENTER,
        });

        // Create a button to capture new shortcuts
        const editButton = new Gtk.Button({
            icon_name: 'document-edit-symbolic',
            valign: Gtk.Align.CENTER,
            css_classes: ['flat'],
            tooltip_text: 'Edit shortcut',
        });

        // Create a button to reset to default
        const resetButton = new Gtk.Button({
            icon_name: 'edit-undo-symbolic',
            valign: Gtk.Align.CENTER,
            css_classes: ['flat'],
            tooltip_text: 'Reset to default',
        });

        // Add buttons to a box
        const buttonBox = new Gtk.Box({
            spacing: 6,
            valign: Gtk.Align.CENTER,
        });
        buttonBox.append(shortcutLabel);
        buttonBox.append(editButton);
        buttonBox.append(resetButton);

        shortcutRow.add_suffix(buttonBox);
        group.add(shortcutRow);

        // Handle edit button click
        editButton.connect('clicked', () => {
            const dialog = new Gtk.Window({
                modal: true,
                transient_for: window,
                title: 'Set Keyboard Shortcut',
                default_width: 400,
                default_height: 200,
            });

            const box = new Gtk.Box({
                orientation: Gtk.Orientation.VERTICAL,
                spacing: 12,
                margin_top: 24,
                margin_bottom: 24,
                margin_start: 24,
                margin_end: 24,
            });
            dialog.set_child(box);

            const label = new Gtk.Label({
                label: 'Press the desired keyboard shortcut...',
                wrap: true,
            });
            box.append(label);

            const currentLabel = new Gtk.Label({
                label: `Current: ${currentBinding || 'None'}`,
                css_classes: ['dim-label'],
            });
            box.append(currentLabel);

            const buttonBox = new Gtk.Box({
                orientation: Gtk.Orientation.HORIZONTAL,
                spacing: 6,
                halign: Gtk.Align.END,
                margin_top: 12,
            });

            const cancelButton = new Gtk.Button({
                label: 'Cancel',
            });
            cancelButton.connect('clicked', () => dialog.close());
            buttonBox.append(cancelButton);

            box.append(buttonBox);

            // Capture keyboard input
            const controller = new Gtk.EventControllerKey();
            controller.connect('key-pressed', (controller, keyval, keycode, state) => {
                // Ignore modifier keys by themselves
                const modifierKeys = [
                    Gdk.KEY_Shift_L, Gdk.KEY_Shift_R,
                    Gdk.KEY_Control_L, Gdk.KEY_Control_R,
                    Gdk.KEY_Alt_L, Gdk.KEY_Alt_R,
                    Gdk.KEY_Super_L, Gdk.KEY_Super_R,
                    Gdk.KEY_Meta_L, Gdk.KEY_Meta_R,
                ];

                if (modifierKeys.includes(keyval)) {
                    return Gdk.EVENT_PROPAGATE;
                }

                // Allow Escape to cancel
                if (keyval === Gdk.KEY_Escape) {
                    dialog.close();
                    return Gdk.EVENT_STOP;
                }

                // Build accelerator string
                const mask = state & Gtk.accelerator_get_default_mod_mask();
                const accelerator = Gtk.accelerator_name(keyval, mask);

                if (accelerator) {
                    // Save the new keybinding
                    settings.set_strv('invert-window-shortcut', [accelerator]);
                    shortcutLabel.set_accelerator(accelerator);
                    dialog.close();
                    return Gdk.EVENT_STOP;
                }

                return Gdk.EVENT_STOP;
            });
            dialog.add_controller(controller);

            dialog.present();
        });

        // Handle reset button click
        resetButton.connect('clicked', () => {
            settings.reset('invert-window-shortcut');
            const defaultBinding = settings.get_strv('invert-window-shortcut')[0] || '';
            shortcutLabel.set_accelerator(defaultBinding);
        });

        // Listen for settings changes
        settings.connect('changed::invert-window-shortcut', () => {
            const newBinding = settings.get_strv('invert-window-shortcut')[0] || '';
            shortcutLabel.set_accelerator(newBinding);
        });
    }
}
