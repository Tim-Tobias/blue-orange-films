<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class WebContent extends Model
{
    use HasFactory;

    protected $table = 'web_contents';
    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'content',
        'image',
        'section',
    ];

    public function getImageAttribute($value)
    {
        return $value ? URL::to(asset('storage/'. $value)) : null;
    }

    public function scopeSection($query, $section)
    {
        return $query->where('section', true);
    }

    public function scopeOrderedCreatedAt($query, $orderType)
    {
        return $query->orderBy('created_at', $orderType);
    }
}
