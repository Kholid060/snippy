pub mod tray;
pub mod window;
pub mod snippet;

pub fn init_app(app: &mut tauri::App) -> Result<(), tauri::Error> {
    tray::init_app_tray(app)?;

    Ok(())
}
