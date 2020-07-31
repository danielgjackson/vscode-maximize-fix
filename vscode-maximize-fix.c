// Tweaks VS Code window style to fix an issue where the maximized window is larger than the screen.
// Dan Jackson, 2020.

#include <windows.h>
#include <tchar.h>
#include <stdio.h>

// State for finding a window
typedef struct
{
	const TCHAR **suffix;
	int numSuffixes;
	int numMatches;
	int numChanges;
} find_state_t;

static BOOL AdjustWindowStyles(HWND hWnd)
{
	LONG style = GetWindowLong(hWnd, GWL_STYLE);
	
	// Don't adjust windows that have already had their style altered
	if (!(style & WS_CAPTION))
	{
		return FALSE;
	}
	
	// Remove the WS_CAPTION style
	style &= ~WS_CAPTION;
	SetWindowLong(hWnd, GWL_STYLE, style);
	
	// So that new styles take effect?
	ShowWindow(hWnd, SW_HIDE);
	ShowWindow(hWnd, SW_SHOW);
	
	// If already maximized, restore and maximize again
	if (style & WS_MAXIMIZE)
	{
		ShowWindow(hWnd, SW_RESTORE);
		ShowWindow(hWnd, SW_MAXIMIZE);
	}
	
	return TRUE;
}

// Callback helper to match on a window title's suffix
static BOOL CALLBACK enumFuncFindSuffix(HWND hWnd, LPARAM lparam)
{
	find_state_t *findState = (find_state_t *)lparam;
	if (IsWindowVisible(hWnd))
	{
		// Window's title text
		int length = GetWindowTextLength(hWnd);
		TCHAR *windowTitle = (TCHAR *)malloc((length + 1) * sizeof(TCHAR));
		GetWindowText(hWnd, windowTitle, length + 1);
		
		BOOL matched = FALSE;
		for (int i = 0; i < findState->numSuffixes; i++)
		{
			// Find last matching substring
			TCHAR *last = NULL;
			for (TCHAR *match, *search = windowTitle; (match = _tcsstr(search, findState->suffix[i])) != NULL; search++)
			{
				last = match;
			}
			
			// Only matched if it is the title's suffix
			matched = (last != NULL && (last - windowTitle) + _tcslen(findState->suffix[i]) >= _tcslen(windowTitle));
			if (matched) break;
		}
		
		// Adjust matching windows
		if (matched)
		{
			findState->numMatches++;
			if (AdjustWindowStyles(hWnd))
			{
				findState->numChanges++;
				_tprintf(TEXT("FIXED #%d/%d: %s\n"), findState->numChanges, findState->numMatches, windowTitle);
			}
			else
			{
				_tprintf(TEXT("SKIPPED #%d/%d: %s\n"), findState->numMatches - findState->numChanges, findState->numMatches, windowTitle);
			}
		}
		
		free(windowTitle);
	}
	return TRUE;
}

int main(int argc, TCHAR *argv[])
{
	find_state_t findState = {0};
	
	// Default window suffixes
	const TCHAR *defaultSuffixes[] = {
		TEXT("Visual Studio Code"),
		TEXT("Visual Studio Code - Insiders"),
	};
	findState.numSuffixes = sizeof(defaultSuffixes) / sizeof(TCHAR *);
	findState.suffix = defaultSuffixes;
	
	// Overridden by command line options
	if (argc > 1)
	{
		findState.numSuffixes = argc - 1;
		findState.suffix = (const TCHAR **)(argv + 1);
	}
	
	EnumWindows(enumFuncFindSuffix, (LPARAM)&findState);
	if (findState.numMatches == 0)
	{
		_tprintf(TEXT("ERROR: No windows found matching suffix(es): "));
		for (int i = 0; i < findState.numSuffixes; i++)
		{
			_tprintf(TEXT("%s\"%s\""), i > 0 ? TEXT(" | ") : TEXT(""), findState.suffix[i]);
		}
		_tprintf(TEXT("\n"));
		return 1;
	}
	return 0;
}
