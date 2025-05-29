<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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

    protected $appends = ['project_url'];

    public function getProjectUrlAttribute()
    {
        if ($this->category === 'image') {
            return $this->project_link ? Storage::url($this->project_link) : null;
        }

        return $this->project_link;
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
