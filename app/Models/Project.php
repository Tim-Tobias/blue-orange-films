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

    public function teams()
    {
        return $this->hasMany(ProjectTeam::class, 'id_project');
    }

    public function files()
    {
        return $this->hasMany(ProjectFile::class, 'project_id');
    }

    public function category()
    {
        return $this->belongsTo(ProjectCategory::class, 'id_project_category');
    }
}
