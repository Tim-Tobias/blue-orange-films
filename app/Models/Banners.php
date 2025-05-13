<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Banners extends Model
{
    use HasFactory;

    protected $table = 'banners';
    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'image',
        'section',
    ];

    protected $hidden = ['image'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    public function scopeSection($query, $section)
    {
        return $query->where('section', $section);
    }

    public function scopeOrderedCreatedAt($query, $orderType)
    {
        return $query->orderBy('created_at', $orderType);
    }
}
