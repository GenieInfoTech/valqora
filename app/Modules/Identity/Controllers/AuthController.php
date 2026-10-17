<?php

namespace App\Modules\Identity\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function showLogin(): Response
    {
        return Inertia::render('Auth/Login', [
            'demoAccounts' => [
                ['role' => 'Administrator', 'email' => 'admin@valqora.com', 'password' => 'Valqora2026!'],
                ['role' => 'B2B Dealer', 'email' => 'dealer@tokyomotors.jp', 'password' => 'Valqora2026!'],
                ['role' => 'Private Buyer', 'email' => 'buyer@alrashid-auto.ae', 'password' => 'Valqora2026!'],
                ['role' => 'Consignor / Supplier', 'email' => 'consignor@globalfleet.de', 'password' => 'Valqora2026!'],
            ],
        ]);
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $remember = $request->boolean('remember');

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();

            /** @var User $user */
            $user = Auth::user();

            if ($user->isAdmin()) {
                return redirect()->intended(route('admin.dashboard'));
            }

            return redirect()->intended(route('portal.dashboard'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our international client records.',
        ])->onlyInput('email');
    }

    public function showRegister(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|max:150|unique:users',
            'role' => 'required|string|in:customer,dealer,supplier',
            'company_name' => 'nullable|string|max:120',
            'phone' => 'nullable|string|max:50',
            'country' => 'required|string|max:100',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'company_name' => $validated['company_name'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'country' => $validated['country'],
            'preferred_currency' => 'USD',
            'status' => 'active',
            'password' => Hash::make($validated['password']),
        ]);

        Auth::login($user);

        return redirect()->route('portal.dashboard')
            ->with('success', 'Your client portal account has been activated.');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home')->with('info', 'You have been securely logged out.');
    }
}
