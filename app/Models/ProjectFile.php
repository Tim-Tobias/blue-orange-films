<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectFile extends Model
{
    protected $table = 'project_files';

    protected $fillable = [
        'project_id',
        'title',
        'project_link',
        'category',
        'description',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
