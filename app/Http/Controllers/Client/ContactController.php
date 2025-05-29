<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\ContactCarousell;
use App\Models\ContactContent;
use App\Models\Social;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contact = Contact::where('is_active', true)->first();
        $socials = Social::all();
        $carousell = ContactCarousell::where('is_active', true)->get();
        $contact_content = ContactContent::where('is_active', true)->first();

        return Inertia::render('client/contact/index', [
            'contact' => $contact,
            'socials' => $socials,
            'carousell' => $carousell,
            'contact_content' => $contact_content,
        ]);
    }
}
