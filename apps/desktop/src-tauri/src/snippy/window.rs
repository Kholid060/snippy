use tauri::{AppHandle, Manager, PhysicalPosition, PhysicalSize, WebviewWindow};
use tauri_plugin_decorum::WebviewWindowExt;

pub const POPUP_WINDOW_SIZE: PhysicalSize<u32> = PhysicalSize {
    width: 320,
    height: 400,
};

pub struct PopupWindow;

impl PopupWindow {
    pub fn hide(app: &AppHandle) {
        if let Some(window) = app.get_webview_window("popup") {
            let _ = window.hide();
        }
    }

    pub fn get_pos_from_cursor(app: &AppHandle) -> Result<PhysicalPosition<u32>, tauri::Error> {
        let cursor_pos = app.cursor_position()?;

        let monitor_size = match app.monitor_from_point(cursor_pos.x, cursor_pos.y)? {
            Some(monitor) => monitor,
            None => return Ok(cursor_pos.cast::<u32>()),
        };
        let monitor_size = monitor_size.size();

        let cursor_pos = cursor_pos.cast::<u32>();

        let pos_x = if cursor_pos.x + POPUP_WINDOW_SIZE.width > monitor_size.width {
            (monitor_size.width - POPUP_WINDOW_SIZE.width) - 5
        } else {
            cursor_pos.x
        };
        let pos_y = if cursor_pos.y + POPUP_WINDOW_SIZE.height > monitor_size.height {
            (monitor_size.height - POPUP_WINDOW_SIZE.height) - 5
        } else {
            cursor_pos.y
        };

        Ok(PhysicalPosition { x: pos_x, y: pos_y })
    }

    pub fn get_or_create(app: &tauri::AppHandle) -> Result<WebviewWindow, tauri::Error> {
        let initial_pos = PopupWindow::get_pos_from_cursor(app)?;
        let popup_window = match app.get_webview_window("popup") {
            Some(window) => window,
            None => tauri::WebviewWindowBuilder::new(
                app,
                "popup",
                tauri::WebviewUrl::App("popup.html".into()),
            )
            .title("Snippy - Quick Access")
            .position(f64::from(initial_pos.x), f64::from(initial_pos.y))
            .decorations(false)
            .skip_taskbar(true)
            .inner_size(
                f64::from(POPUP_WINDOW_SIZE.width),
                f64::from(POPUP_WINDOW_SIZE.height),
            )
            .always_on_top(true)
            .on_navigation(|url| {
                url.host_str().unwrap_or_default().starts_with("tauri")
                    || (cfg!(dev) && url.host_str() == Some("localhost"))
            })
            .resizable(false)
            .build()?,
        };

        #[cfg(debug_assertions)]
        popup_window.open_devtools();

        Ok(popup_window)
    }

    pub fn show_on_cursor(app: &tauri::AppHandle) -> tauri::Result<()> {
        let popup_window = PopupWindow::get_or_create(app)?;
        if !popup_window.is_focused()? {
            let new_position = PopupWindow::get_pos_from_cursor(app)?;

            popup_window.set_position(new_position)?;
            popup_window.show()?;
            popup_window.set_focus()?;
        }

        Ok(())
    }
}

pub struct MainWindow;

impl MainWindow {
    pub fn create(app: &tauri::AppHandle) -> Result<WebviewWindow, tauri::Error> {
        let window = tauri::WebviewWindowBuilder::new(
            app,
            "main",
            tauri::WebviewUrl::App("index.html".into()),
        )
        .title("Snippy")
        .min_inner_size(800.0, 600.0)
        .disable_drag_drop_handler()
        .visible(false)
        .on_navigation(|url| {
            url.host_str().unwrap_or_default().starts_with("tauri")
                || (cfg!(dev) && url.host_str() == Some("localhost"))
        })
        .build()?;
        window.create_overlay_titlebar()?;

        Ok(window)
    }

    pub fn create_or_show(app: &tauri::AppHandle) -> Result<WebviewWindow, tauri::Error> {
        let popup_window = match app.get_webview_window("main") {
            Some(window) => {
                let _ = window.show();
                let _ = window.unminimize();
                let _ = window.set_focus();

                window
            }
            None => {
                let window = MainWindow::create(app)?;
                let _ = window.show();
                
                window
            },
        };

        Ok(popup_window)
    }
}

pub fn init_app_window(app: &tauri::App) -> tauri::Result<()> {
    if !std::env::args().any(|arg| &arg == "--autostart") {
        MainWindow::create_or_show(app.app_handle())?;
    } else {
        MainWindow::create(app.app_handle())?;
    }

    Ok(())
}
