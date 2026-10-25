<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark" data-theme="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Valqora Global Trading') }}</title>
        <meta name="description" content="Valqora Global Trading — Multinational Sourcing, Automotive Exports, and End-to-End Logistics Solutions." />
        <meta name="theme-color" content="#111111" />

        <!-- Prevent Flash of Incorrect Theme -->
        <script>
            (function () {
                try {
                    var saved = localStorage.getItem('valqora_theme');
                    var theme = (saved === 'light' || saved === 'dark') ? saved : 'dark';
                    var root = document.documentElement;
                    root.classList.remove('light-mode', 'dark-mode', 'dark', 'light');
                    if (theme === 'light') {
                        root.classList.add('light-mode', 'light');
                        root.setAttribute('data-theme', 'light');
                    } else {
                        root.classList.add('dark-mode', 'dark');
                        root.setAttribute('data-theme', 'dark');
                    }
                } catch (e) {}
            })();
        </script>

        <!-- Fonts: Inter & IBM Plex Mono (Volume 3 Typography Specification) -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased selection:bg-[#C9A227] selection:text-[#111111]">
        @inertia
    </body>
</html>
