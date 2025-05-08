<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'highlight_link',
        'title',
        'year',
        'duration',
        'aspect_ratio',
        'description',
        'client',
        'agency',
        'id_project_category',
    ];
}
