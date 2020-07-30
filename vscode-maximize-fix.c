// Tweaks VS Code window style to fix an issue where the maximized window is larger than the screen.
// Dan Jackson, 2020.

#include <windows.h>
#include <tchar.h>
#include <stdio.h>

// State for finding a window
typedef struct
{
	const TCHAR *suffix;
	int numMatches;
} find_state_t;

static void AdjustWindowStyles(HWND hWnd)
{
	// Remove the WS_CAPTION style (don't do anything if already removed)
	LONG style = GetWindowLong(hWnd, GWL_STYLE);
	if (style & WS_CAPTION)
	{
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
	}
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
		
		// Find last matching substring
		TCHAR *last = NULL;
		for (TCHAR *match, *search = windowTitle; (match = _tcsstr(search, findState->suffix)) != NULL; search++)
		{
			last = match;
		}
		
		// Only matched if it is the title's suffix
		BOOL matched = (last != NULL && (last - windowTitle) + _tcslen(findState->suffix) >= _tcslen(windowTitle));
		
		// Adjust matching windows
		if (matched)
		{
			findState->numMatches++;
			_tprintf(TEXT("FOUND #%d: %s\n"), findState->numMatches, windowTitle);
			AdjustWindowStyles(hWnd);
		}
		
		free(windowTitle);
	}
	return TRUE;
}

int main(int argc, TCHAR *argv[])
{
	find_state_t findState = {0};
	findState.suffix = TEXT("Visual Studio Code");
	if (argc > 1) findState.suffix = argv[1];
	EnumWindows(enumFuncFindSuffix, (LPARAM)&findState);
	if (findState.numMatches == 0)
	{
		_tprintf(TEXT("ERROR: No windows found matching suffix: %s\n"), findState.suffix);
		return 1;
	}
	return 0;
}
