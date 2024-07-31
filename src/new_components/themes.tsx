// Define the type for the theme data entry
interface ThemeDataEntry {
    0: string;  // The caption/name of the theme
    1?: string; // Optional theme identifier
    2?: 'light' | 'dark'; // Optional theme type (light or dark)
  }
  
  // The raw theme data array with optional fields
  const themeData: ThemeDataEntry[] = [
    ["Chrome"],
    ["Clouds"],
    ["Crimson Editor"],
    ["Dawn"],
    ["Dreamweaver"],
    ["Eclipse"],
    ["GitHub Light Default"],
    ["GitHub (Legacy)", "github", "light"],
    ["IPlastic"],
    ["Solarized Light"],
    ["TextMate"],
    ["Tomorrow"],
    ["XCode"],
    ["Kuroir"],
    ["KatzenMilch"],
    ["SQL Server", "sqlserver", "light"],
    ["CloudEditor", "cloud_editor", "light"],
    ["Ambiance", "ambiance", "dark"],
    ["Chaos", "chaos", "dark"],
    ["Clouds Midnight", "clouds_midnight", "dark"],
    ["Dracula", "", "dark"],
    ["Cobalt", "cobalt", "dark"],
    ["Gruvbox", "gruvbox", "dark"],
    ["Green on Black", "gob", "dark"],
    ["idle Fingers", "idle_fingers", "dark"],
    ["krTheme", "kr_theme", "dark"],
    ["Merbivore", "merbivore", "dark"],
    ["Merbivore Soft", "merbivore_soft", "dark"],
    ["Mono Industrial", "mono_industrial", "dark"],
    ["Monokai", "monokai", "dark"],
    ["Nord Dark", "nord_dark", "dark"],
    ["One Dark", "one_dark", "dark"],
    ["Pastel on dark", "pastel_on_dark", "dark"],
    ["Solarized Dark", "solarized_dark", "dark"],
    ["Terminal", "terminal", "dark"],
    ["Tomorrow Night", "tomorrow_night", "dark"],
    ["Tomorrow Night Blue", "tomorrow_night_blue", "dark"],
    ["Tomorrow Night Bright", "tomorrow_night_bright", "dark"],
    ["Tomorrow Night 80s", "tomorrow_night_eighties", "dark"],
    ["Twilight", "twilight", "dark"],
    ["Vibrant Ink", "vibrant_ink", "dark"],
    ["GitHub Dark", "github_dark", "dark"],
    ["CloudEditor Dark", "cloud_editor_dark", "dark"]
  ];
  
  // Define the type for the processed theme object
  interface Theme {
    caption: string;
    theme: string;
    isDark: boolean;
    name: string;
  }
  
  // An object to map theme names to their details
  const themesByName: { [key: string]: Theme } = {};
  
  // Process the theme data into a usable format
  const themes: Theme[] = themeData.map((data) => {
    const name = data[1] || data[0].replace(/ /g, "_").toLowerCase();
    const theme: Theme = {
      caption: data[0],
      theme: "ace/theme/" + name,
      isDark: data[2] === "dark",
      name: name
    };
    themesByName[name] = theme;
    return theme;
  });
  
  // Export the processed themes and the mapping object
  export { themes, themesByName };
  