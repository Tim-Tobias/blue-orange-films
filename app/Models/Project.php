<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{

    use HasFactory;
    
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
        'highlight_image',
    ];

    protected $appends = ['highlight_url', 'highlight_image_url'];

    public function getHighlightUrlAttribute()
    {
        if ($this->highlight_type === 'image') {
            return $this->highlight_link ? Storage::url($this->highlight_link) : null;
        }

        return $this->highlight_link;
    }

    public function getHighlightImageUrlAttribute()
    {
        return Storage::url($this->highlight_image);
    }

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
