<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactContent extends Model
{
    protected $table = 'contact_contents';
    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'content'
    ];
}
