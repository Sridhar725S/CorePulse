package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {

	app := NewApp()

	err := wails.Run(&options.App{

		Title:  "CorePulse",
		Width:  1450,
		Height: 900,

		MinWidth:  1200,
		MinHeight: 700,

		WindowStartState: options.Maximised,

		DisableResize: false,
		Frameless:     false,
		Fullscreen:    false,

		StartHidden: false,

		BackgroundColour: &options.RGBA{
			R: 5,
			G: 8,
			B: 22,
			A: 1,
		},

		Windows: &windows.Options{

			Theme: windows.Dark,

			WebviewIsTransparent: false,

			WindowIsTranslucent: false,

			DisableWindowIcon: false,

			BackdropType: windows.Mica,
		},

		AssetServer: &assetserver.Options{
			Assets: assets,
		},

		OnStartup: app.startup,

		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
