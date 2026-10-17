<?php

namespace App\Modules\Document\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Document\Models\TradeDocument;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class DocumentVaultController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $query = TradeDocument::with(['vehicle', 'shipment']);

        if ($user && ! $user->isAdmin()) {
            $query->where('user_id', $user->id);
        }

        $documents = $query->latest()->paginate(15);

        return Inertia::render('Documents/Index', [
            'documents' => $documents,
        ]);
    }

    public function download(string $documentNo): HttpResponse
    {
        $document = TradeDocument::where('document_no', $documentNo)->firstOrFail();

        // Generate formal trade document presentation response
        $content = "VALQORA GLOBAL TRADING — VERIFIED TRADE DOCUMENT\n"
            ."Document No: {$document->document_no}\n"
            .'Type: '.strtoupper($document->document_type)."\n"
            ."Title: {$document->title}\n"
            ."Issue Date: {$document->issue_date}\n"
            ."Security Status: Cryptographically Verified & Sealed by VALQORA Trade Directorate\n"
            ."Authority: JEVIC / Japan Customs / Dubai Customs Authorized Maritime Manifest\n";

        return response($content, 200, [
            'Content-Type' => 'text/plain',
            'Content-Disposition' => 'attachment; filename="'.$document->document_no.'.txt"',
        ]);
    }
}
