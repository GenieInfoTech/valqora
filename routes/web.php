<?php

use App\Modules\Admin\Controllers\AdminDashboardController;
use App\Modules\CMS\Controllers\ArticleController;
use App\Modules\Core\Controllers\CorporateController;
use App\Modules\Document\Controllers\DocumentVaultController;
use App\Modules\Identity\Controllers\AuthController;
use App\Modules\Identity\Controllers\PortalController;
use App\Modules\Inquiry\Controllers\InquiryController;
use App\Modules\Logistics\Controllers\TrackingController;
use App\Modules\Quotation\Controllers\QuotationController;
use App\Modules\Quotation\Controllers\SourcingController;
use App\Modules\Vehicle\Controllers\VehicleCatalogController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes - VALQORA Global Trading Platform
|--------------------------------------------------------------------------
*/

// Corporate & Brand
Route::get('/', [CorporateController::class, 'home'])->name('home');
Route::get('/about', [CorporateController::class, 'about'])->name('about');
Route::get('/divisions', [CorporateController::class, 'divisions'])->name('divisions');
Route::get('/services', [CorporateController::class, 'services'])->name('services');
Route::get('/contact', [CorporateController::class, 'contact'])->name('contact');

// Automotive Inventory & Verification
Route::get('/vehicles', [VehicleCatalogController::class, 'index'])->name('vehicles.index');
Route::get('/vehicles/{slug}', [VehicleCatalogController::class, 'show'])->name('vehicles.show');

// Sourcing & Quotations Engine
Route::get('/sourcing', [SourcingController::class, 'create'])->name('sourcing.create');
Route::post('/sourcing', [SourcingController::class, 'store'])->name('sourcing.store');
Route::get('/sourcing/confirmed/{reference}', [SourcingController::class, 'success'])->name('sourcing.success');

Route::post('/quotations/calculate', [QuotationController::class, 'calculate'])->name('quotations.calculate');
Route::post('/quotations', [QuotationController::class, 'store'])->name('quotations.store');
Route::get('/quotations/{quotationNo}', [QuotationController::class, 'show'])->name('quotations.show');

// Logistics & Ocean Milestone Tracking
Route::get('/tracking', [TrackingController::class, 'index'])->name('tracking.index');
Route::get('/tracking/{trackingNumber}', [TrackingController::class, 'show'])->name('tracking.show');

// Lead Capture & CRM Inquiries
Route::post('/inquiries', [InquiryController::class, 'store'])->name('inquiries.store');

// CMS & Market Insights
Route::get('/insights', [ArticleController::class, 'index'])->name('insights.index');
Route::get('/insights/{slug}', [ArticleController::class, 'show'])->name('insights.show');

// Document Vault
Route::get('/documents/download/{documentNo}', [DocumentVaultController::class, 'download'])->name('documents.download');

// Authentication
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Authenticated Client Portal
Route::middleware('auth')->prefix('portal')->name('portal.')->group(function () {
    Route::get('/', [PortalController::class, 'dashboard'])->name('dashboard');
    Route::get('/quotations', [PortalController::class, 'quotations'])->name('quotations');
    Route::get('/shipments', [PortalController::class, 'shipments'])->name('shipments');
    Route::get('/documents', [DocumentVaultController::class, 'index'])->name('documents');
});

// Authenticated Executive Admin Panel
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/vehicles', [AdminDashboardController::class, 'vehicles'])->name('vehicles');
    Route::post('/vehicles/{vehicle}/status', [AdminDashboardController::class, 'toggleVehicleStatus'])->name('vehicles.status');
    Route::get('/inquiries', [AdminDashboardController::class, 'inquiries'])->name('inquiries');
    Route::post('/inquiries/{inquiry}/status', [AdminDashboardController::class, 'updateInquiryStatus'])->name('inquiries.status');
    Route::get('/quotations', [AdminDashboardController::class, 'quotations'])->name('quotations');
    Route::get('/shipments', [AdminDashboardController::class, 'shipments'])->name('shipments');
});
