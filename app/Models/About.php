<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    use HasFactory;

    protected $table = 'abouts';
    protected $primaryKey = 'id';

    protected $fillable = [
        'image',
        'content',
        'is_active'
    ];

    protected $hidden = ['image'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    public function scopeOrderedCreatedAt($query, $orderType)
    {
        return $query->orderBy('created_at', $orderType);
    }
}
