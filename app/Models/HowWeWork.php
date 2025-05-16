<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HowWeWork extends Model
{
    use HasFactory;

    protected $table = 'How_We_Works';
    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'content',
    ];
}
