<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\ContactCarousell;
use App\Models\Social;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contact = Contact::first();
        $socials = Social::all();
        $carousell = ContactCarousell::all();

        return Inertia::render('client/contact/index', [
            'contact' => $contact,
            'socials' => $socials,
            'carousell' => $carousell
        ]);
    }
}
