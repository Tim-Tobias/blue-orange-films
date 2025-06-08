<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Workflow extends Model
{
    use HasFactory;

    protected $table = 'workflows';
    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'desc',
        'order',
    ];
}
